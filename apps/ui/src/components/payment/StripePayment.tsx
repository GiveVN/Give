"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { 
  Elements,
  PaymentElement,
  useStripe,
  useElements 
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, AlertCircle } from "lucide-react"
import { STRIPE_CONFIG } from "@/lib/stripe"

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey)

interface StripePaymentProps {
  clientSecret: string
  amount: number
  currency: string
  onSuccess: () => void
  onError: (error: string) => void
}

function CheckoutForm({ amount, currency, onSuccess, onError }: Omit<StripePaymentProps, 'clientSecret'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL after payment completion
        return_url: `${window.location.origin}/donation-success`,
      },
      redirect: "if_required", // Only redirect if necessary (3D Secure, etc.)
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message || "Payment failed")
      } else {
        setErrorMessage("An unexpected error occurred.")
      }
      onError(error.message || "Payment failed")
    } else {
      // Payment succeeded
      onSuccess()
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold">Payment Details</h3>
          </div>
          
          <PaymentElement 
            options={{
              layout: "tabs",
              defaultValues: {
                billingDetails: {
                  email: "",
                }
              }
            }}
          />
        </div>
      </Card>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay ${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
          }).format(amount)}`
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        Your payment information is secure and encrypted.
      </p>
    </form>
  )
}

export default function StripePayment({ 
  clientSecret, 
  amount, 
  currency,
  onSuccess,
  onError 
}: StripePaymentProps) {
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0070f3',
      colorBackground: '#ffffff',
      colorText: '#1a1a1a',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      borderRadius: '8px',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm 
        amount={amount} 
        currency={currency} 
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  )
} 