import { NextRequest, NextResponse } from "next/server"

import { sendRefundNotification } from "@/lib/email/donation-receipt"
import { PrivateStrapiClient } from "@/lib/strapi-api"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const donationId = params.id
    const body = await request.json()
    const { reason, email } = body

    // Get donation details
    const donation = await PrivateStrapiClient.findOne(
      "donations",
      donationId,
      {
        populate: ["Project", "Giver"],
      }
    )

    if (!donation?.data) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    // Check if already refunded
    if (donation.data.PaymentStatus === "refunded") {
      return NextResponse.json(
        { error: "Donation already refunded" },
        { status: 400 }
      )
    }

    // Check if can be refunded (only completed donations)
    if (donation.data.PaymentStatus !== "completed") {
      return NextResponse.json(
        { error: "Only completed donations can be refunded" },
        { status: 400 }
      )
    }

    // In production, process refund with payment provider
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const refund = await stripe.refunds.create({
    //   payment_intent: donation.data.PaymentId,
    //   reason: 'requested_by_customer'
    // })

    // For MVP, simulate refund
    const refundId = `REFUND-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Update donation status
    await PrivateStrapiClient.update("donations", donationId, {
      data: {
        PaymentStatus: "refunded",
      },
    })

    // Update project funding
    const project = donation.data.Project
    if (project) {
      const newFunding = Math.max(
        0,
        (project.CurrentFunding || 0) - donation.data.Amount
      )
      const newBackersCount = Math.max(0, (project.BackersCount || 0) - 1)

      await PrivateStrapiClient.update("projects", project.id, {
        data: {
          CurrentFunding: newFunding,
          BackersCount: newBackersCount,
        },
      })
    }

    // Send refund notification email
    const recipientEmail = email || donation.data.Giver?.email
    if (recipientEmail) {
      await sendRefundNotification(recipientEmail, donation.data, reason)
    }

    // Log refund activity
    console.log(`Refund processed: ${refundId} for donation ${donationId}`)

    return NextResponse.json({
      success: true,
      refundId,
      message: "Refund processed successfully",
      donation: {
        id: donation.data.id,
        amount: donation.data.Amount,
        currency: donation.data.Currency,
        status: "refunded",
      },
    })
  } catch (error) {
    console.error("Refund error:", error)
    return NextResponse.json(
      { error: "Failed to process refund" },
      { status: 500 }
    )
  }
}
