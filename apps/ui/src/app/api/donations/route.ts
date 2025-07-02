import { NextRequest, NextResponse } from "next/server"

import {
  checkRateLimit,
  getFraudSignals,
  logPaymentActivity,
  performComplianceChecks,
  validatePaymentAmount,
} from "@/lib/payment/security-compliance"
import { PrivateStrapiClient } from "@/lib/strapi-api"
import { formatAmountForStripe, stripe } from "@/lib/stripe"

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1338"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      amount,
      currency,
      paymentMethod,
      projectId,
      isAnonymous,
      giverName,
      email,
      message,
      rewardId,
    } = body

    // Validate required fields
    if (!amount || !currency || !paymentMethod || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Security checks
    try {
      // Validate amount
      validatePaymentAmount(amount, currency)

      // Rate limiting
      const clientIp = request.headers.get("x-forwarded-for") || "unknown"
      checkRateLimit(clientIp)

      // Get fraud signals
      const fraudSignals = getFraudSignals(request)

      // Compliance checks
      const complianceIssues = await performComplianceChecks({
        Amount: amount,
        Currency: currency,
        GiverName: giverName,
      })

      if (complianceIssues.length > 0) {
        logPaymentActivity({
          type: "DONATION_BLOCKED",
          amount,
          currency,
          status: "blocked",
          metadata: { complianceIssues, fraudSignals },
        })

        return NextResponse.json(
          { error: complianceIssues[0].message },
          { status: 403 }
        )
      }
    } catch (securityError: any) {
      return NextResponse.json(
        { error: securityError.message },
        { status: 400 }
      )
    }

    // Get project details for payment
    const project = await PrivateStrapiClient.findOne("projects", projectId)
    const projectTitle = project?.data?.Title || "Project"

    // Create payment based on method
    let paymentId
    let sessionUrl

    try {
      if (paymentMethod === "stripe") {
        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                  name: `Donation to: ${projectTitle}`,
                  description: message || `Supporting ${projectTitle}`,
                },
                unit_amount: formatAmountForStripe(amount, currency),
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${projectId}`,
          metadata: {
            projectId: projectId.toString(),
            donorName: giverName || "Anonymous",
            isAnonymous: isAnonymous.toString(),
            rewardId: rewardId?.toString() || "",
            email: email || "",
            message: message || "",
          },
        })

        paymentId = session.id
        sessionUrl = session.url
      } else {
        // For other payment methods (PayPal, Crypto), use fake ID for now
        paymentId = `${paymentMethod.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

        // Simulate processing time for non-Stripe payments
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    } catch (stripeError: any) {
      console.error("Payment processing error:", stripeError)
      return NextResponse.json(
        { error: "Payment processing failed", details: stripeError.message },
        { status: 500 }
      )
    }

    // Create donation record in Strapi
    const donationData = {
      Amount: amount,
      Currency: currency,
      PaymentMethod: paymentMethod,
      PaymentId: paymentId,
      PaymentStatus: paymentMethod === "stripe" ? "pending" : "completed", // Stripe starts as pending until confirmed
      IsAnonymous: isAnonymous,
      GiverName: isAnonymous ? null : giverName,
      Message: message,
      Project: projectId,
      // Giver: userId, // TODO: Get from session when auth is implemented
    }

    try {
      const response = await fetch(`${STRAPI_URL}/api/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(STRAPI_API_TOKEN && {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          }),
        },
        body: JSON.stringify(donationData),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("Strapi error:", error)
        return NextResponse.json(
          { error: "Failed to save donation to Strapi" },
          { status: response.status }
        )
      }

      const result = await response.json()

      // Update project funding amount
      try {
        // Get current project data
        const projectResponse = await fetch(
          `${STRAPI_URL}/api/projects/${projectId}`,
          {
            headers: {
              ...(STRAPI_API_TOKEN && {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
              }),
            },
          }
        )

        if (projectResponse.ok) {
          const projectData = await projectResponse.json()
          const currentFunding = projectData.data?.CurrentFunding || 0
          const backersCount = projectData.data?.BackersCount || 0

          // Update project with new funding amount
          await fetch(`${STRAPI_URL}/api/projects/${projectId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(STRAPI_API_TOKEN && {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
              }),
            },
            body: JSON.stringify({
              data: {
                CurrentFunding: currentFunding + amount,
                BackersCount: backersCount + 1,
              },
            }),
          })
        }
      } catch (error) {
        console.error("Error updating project funding:", error)
        // Continue anyway - donation is saved
      }

      // Send email receipt if email provided
      if (email) {
        try {
          const { sendDonationReceipt } = await import(
            "@/lib/email/donation-receipt"
          )
          await sendDonationReceipt(email, {
            ...result.data,
            Project: project?.data || { Title: "Unknown Project" },
          })
        } catch (emailError) {
          console.error("Email send failed:", emailError)
          // Don't fail the donation if email fails
        }
      }

      return NextResponse.json({
        success: true,
        data: result.data,
        transactionId: paymentId,
        sessionUrl: sessionUrl, // For Stripe checkout redirect
        message:
          paymentMethod === "stripe"
            ? "Redirecting to payment..."
            : "Donation processed successfully",
      })
    } catch (strapiError) {
      console.error("Strapi error:", strapiError)
      return NextResponse.json(
        { error: "Failed to save donation" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Donation API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")
    const userId = searchParams.get("userId")

    let filters: any = {}

    if (projectId) {
      filters.Project = { id: { $eq: projectId } }
    }

    if (userId) {
      filters.Giver = { id: { $eq: userId } }
    }

    const donations = await PrivateStrapiClient.find("donations", {
      filters,
      populate: ["Project", "Giver"],
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
        pageSize: 100,
      },
    })

    return NextResponse.json({
      success: true,
      donations: donations.data,
      meta: donations.meta,
    })
  } catch (error) {
    console.error("Get donations error:", error)
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    )
  }
}
