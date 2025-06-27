import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { PrivateStrapiClient } from "@/lib/strapi-api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      amount,
      currency,
      projectId,
      projectTitle,
      name,
      email,
      message,
      isAnonymous
    } = body

    // Validate required fields
    if (!amount || !currency || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Donation to: ${projectTitle}`,
              description: message || `Supporting ${projectTitle} project`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.APP_PUBLIC_URL || 'http://localhost:3003'}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_PUBLIC_URL || 'http://localhost:3003'}/projects/${projectId}`,
      metadata: {
        projectId: projectId.toString(),
        projectTitle,
        donorName: isAnonymous ? 'Anonymous' : name || 'Anonymous',
        donorEmail: email || '',
        message: message || '',
        isAnonymous: isAnonymous ? 'true' : 'false',
      },
    })

    // Create pending donation record in Strapi
    try {
      await PrivateStrapiClient.create("donations", {
        data: {
          Project: projectId,
          Amount: amount,
          Currency: currency,
          PaymentMethod: "stripe",
          PaymentId: session.id,
          PaymentStatus: "pending",
          IsAnonymous: isAnonymous,
          GiverName: name || "Anonymous",
          Email: email,
          Message: message,
          TransactionDate: new Date().toISOString(),
        }
      })
    } catch (strapiError) {
      console.error("Failed to create donation record:", strapiError)
      // Continue anyway - webhook will handle it
    }

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.url,
      success: true
    })

  } catch (error: any) {
    console.error("Payment intent creation failed:", error)
    return NextResponse.json(
      { 
        error: error.message || "Failed to create payment session",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 