import { NextRequest, NextResponse } from "next/server"

import { PrivateStrapiClient } from "@/lib/strapi-api"
import { stripe } from "@/lib/stripe"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      )
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "line_items"],
    })

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      )
    }

    // Find donation record by payment ID
    const donations = await PrivateStrapiClient.find("donations", {
      filters: {
        PaymentId: { $eq: sessionId },
      },
      populate: ["Project"],
    })

    if (!donations?.data || donations.data.length === 0) {
      // If donation not found, it might not have been created yet
      // This can happen if webhook hasn't processed yet
      return NextResponse.json({
        success: true,
        message: "Payment verified, donation record will be created shortly",
        session: {
          id: session.id,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_email,
          metadata: session.metadata,
        },
      })
    }

    const donation = donations.data[0]

    return NextResponse.json({
      success: true,
      donation: donation,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
      },
    })
  } catch (error: any) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      {
        error: "Failed to verify payment",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}
