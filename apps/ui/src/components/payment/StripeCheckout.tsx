"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Initialize Stripe (should be from env variable)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  amount: number
  currency: string
  projectId: number
  projectTitle: string
  donorInfo: {
    name?: string
    email?: string
    message?: string
    isAnonymous?: boolean
  }
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
  onCancel: () => void
}

export default function StripeCheckout({
  amount,
  currency,
  projectId,
  projectTitle,
  donorInfo,
  onSuccess,
  onError,
  onCancel
}: StripeCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    try {
      setIsProcessing(true)
      setError(null)

      // Create payment intent on backend
      const response = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          projectId,
          projectTitle,
          ...donorInfo
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent")
      }

      // Get Stripe instance
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

    } catch (err: any) {
      console.error("Checkout error:", err)
      setError(err.message || "Something went wrong")
      onError(err.message || "Payment failed")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Complete Your Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Project:</span>
            <span className="font-medium">{projectTitle}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{formatCurrency(amount, currency)}</span>
          </div>
          {donorInfo.name && !donorInfo.isAnonymous && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Donor:</span>
              <span className="font-medium">{donorInfo.name}</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Stripe
              </>
            )}
          </Button>
        </div>

        {/* Stripe Badge */}
        <div className="text-center text-xs text-gray-500">
          Powered by{" "}
          <span className="font-semibold text-[#635BFF]">Stripe</span>
          {" "}• Secure Payment
        </div>
      </CardContent>
    </Card>
  )
} 