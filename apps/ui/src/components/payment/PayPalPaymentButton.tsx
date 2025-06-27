"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { PAYPAL_CLIENT_ID, createPayPalOrder, capturePayPalOrder } from "@/lib/payment/paypal"

interface PayPalPaymentButtonProps {
  amount: number
  currency: string
  donationId: string
  projectId: string
  projectTitle: string
  onSuccess: (orderId: string) => void
  onError: (error: string) => void
}

declare global {
  interface Window {
    paypal?: any
  }
}

export default function PayPalPaymentButton({
  amount,
  currency,
  donationId,
  projectId,
  projectTitle,
  onSuccess,
  onError,
}: PayPalPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (window.paypal && !isLoading) {
      renderPayPalButtons()
    }
  }, [isLoading])

  const renderPayPalButtons = () => {
    window.paypal
      .Buttons({
        createOrder: async () => {
          try {
            const order = await createPayPalOrder(amount, currency, {
              donationId,
              projectId,
              projectTitle,
            })
            return order.id
          } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to create order"
            setError(message)
            onError(message)
            throw err
          }
        },
        onApprove: async (data: any) => {
          try {
            const result = await capturePayPalOrder(data.orderID)
            if (result.status === "COMPLETED") {
              onSuccess(data.orderID)
            } else {
              throw new Error("Payment not completed")
            }
          } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to capture payment"
            setError(message)
            onError(message)
            throw err
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err)
          const message = "PayPal payment failed"
          setError(message)
          onError(message)
        },
        onCancel: () => {
          setError("Payment cancelled")
        },
      })
      .render("#paypal-button-container")
  }

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currency}`}
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setError("Failed to load PayPal")
          onError("Failed to load PayPal")
        }}
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading PayPal...</span>
        </div>
      ) : (
        <div id="paypal-button-container" />
      )}
    </>
  )
} 