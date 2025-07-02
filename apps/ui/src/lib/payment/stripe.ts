import { loadStripe, Stripe } from "@stripe/stripe-js"

// Initialize Stripe
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Stripe payment intent creation
export async function createPaymentIntent(
  amount: number,
  currency: string,
  metadata: {
    donationId: string
    projectId: string
    projectTitle: string
    donorEmail?: string
  }
) {
  try {
    const response = await fetch("/api/payments/stripe/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: currency.toLowerCase(),
        metadata,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create payment intent")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating payment intent:", error)
    throw error
  }
}

// Process Stripe payment
export async function processStripePayment(
  paymentIntentId: string,
  paymentMethodId: string
) {
  try {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error("Stripe not initialized")
    }

    const result = await stripe.confirmCardPayment(paymentIntentId, {
      payment_method: paymentMethodId,
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return result.paymentIntent
  } catch (error) {
    console.error("Error processing payment:", error)
    throw error
  }
}

// Stripe webhook event types
export const STRIPE_WEBHOOK_EVENTS = {
  PAYMENT_INTENT_SUCCEEDED: "payment_intent.succeeded",
  PAYMENT_INTENT_FAILED: "payment_intent.payment_failed",
  CHARGE_REFUNDED: "charge.refunded",
} as const
