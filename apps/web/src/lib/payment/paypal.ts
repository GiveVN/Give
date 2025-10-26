// PayPal SDK configuration
export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!

// PayPal order creation
export async function createPayPalOrder(
  amount: number,
  currency: string,
  metadata: {
    donationId: string
    projectId: string
    projectTitle: string
  }
) {
  try {
    const response = await fetch("/api/payments/paypal/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        metadata,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create PayPal order")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating PayPal order:", error)
    throw error
  }
}

// PayPal order capture
export async function capturePayPalOrder(orderId: string) {
  try {
    const response = await fetch("/api/payments/paypal/capture-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to capture PayPal order")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error capturing PayPal order:", error)
    throw error
  }
}

// PayPal webhook event types
export const PAYPAL_WEBHOOK_EVENTS = {
  PAYMENT_CAPTURE_COMPLETED: "PAYMENT.CAPTURE.COMPLETED",
  PAYMENT_CAPTURE_DENIED: "PAYMENT.CAPTURE.DENIED",
  PAYMENT_CAPTURE_REFUNDED: "PAYMENT.CAPTURE.REFUNDED",
} as const
