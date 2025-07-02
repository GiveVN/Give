"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Building2,
  CreditCard,
  Heart,
  Mail,
  MessageSquare,
  User,
  Wallet,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { PrivateStrapiClient } from "@/lib/strapi-api"
import { formatCurrency } from "@/lib/utils"
import StripePayment from "@/components/payment/StripePayment"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Donation form schema
const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  currency: z.enum(["USD", "EUR", "VND"]),
  paymentMethod: z.enum(["stripe", "paypal", "crypto"]),
  isAnonymous: z.boolean().default(false),
  giverName: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  message: z.string().max(500).optional(),
})

type DonationFormData = z.infer<typeof donationSchema>

interface DonationFormProps {
  projectId: number
  projectTitle: string
  projectType?: "give" | "back"
  currentFunding?: number
  fundingGoal?: number
  currency?: string
  rewardId?: number
  rewardAmount?: number
  onSuccess?: () => void
  onCancel?: () => void
}

export default function DonationForm({
  projectId,
  projectTitle,
  projectType = "give",
  currentFunding = 0,
  fundingGoal = 0,
  currency = "USD",
  rewardId,
  rewardAmount = 0,
  onSuccess,
  onCancel,
}: DonationFormProps) {
  const router = useRouter()
  const [step, setStep] = useState<"amount" | "payment" | "info">("amount")
  const [isProcessing, setIsProcessing] = useState(false)
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null
  )
  const [showStripeModal, setShowStripeModal] = useState(false)

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: rewardAmount || 10,
      currency: "USD",
      paymentMethod: "stripe",
      isAnonymous: false,
      giverName: "",
      email: "",
      message: "",
    },
  })

  const predefinedAmounts = [10, 25, 50, 100, 250, 500]

  const handleAmountSelect = (amount: number) => {
    form.setValue("amount", amount)
  }

  const handleNextStep = () => {
    if (step === "amount") {
      const amount = form.getValues("amount")
      if (amount < 1) {
        form.setError("amount", { message: "Amount must be at least $1" })
        return
      }
      setStep("payment")
    } else if (step === "payment") {
      setStep("info")
    }
  }

  const handlePreviousStep = () => {
    if (step === "payment") {
      setStep("amount")
    } else if (step === "info") {
      setStep("payment")
    }
  }

  const onSubmit = async (data: DonationFormData) => {
    setIsProcessing(true)

    // Check for required fields
    if (!projectId || !projectTitle) {
      console.error("Missing required fields:", { projectId, projectTitle })
      toast({
        title: "Error",
        description: "Missing required fields",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    try {
      // Simulate payment processing
      toast({
        title:
          projectType === "give"
            ? "Processing donation..."
            : "Processing backing...",
        description: "Please wait while we process your payment",
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate fake transaction ID
      const transactionId = `FAKE-${Date.now()}-${Math.random().toString(36).substring(7)}`

      // Prepare donation data for Strapi
      const donationData = {
        Amount: data.amount,
        Currency: data.currency,
        PaymentMethod: data.paymentMethod,
        PaymentId: transactionId,
        PaymentStatus: "completed",
        IsAnonymous: data.isAnonymous || false,
        GiverName: data.isAnonymous ? null : data.giverName || null,
        Message: data.message || null,
        Project: projectId,
        // Note: Giver field would be set if user is logged in
      }

      // Save to Strapi
      try {
        const response = await fetch("/api/donations/simple", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationData),
        })

        if (!response.ok) {
          throw new Error("Failed to save donation")
        }

        const savedDonation = await response.json()
        console.log("Donation saved to Strapi:", savedDonation)
      } catch (error) {
        console.error("Error saving donation to Strapi:", error)
        // Continue anyway for MVP - donation is processed
      }

      // Calculate new funding amount
      const newFunding = currentFunding + data.amount
      const newPercentage =
        fundingGoal > 0 ? Math.round((newFunding / fundingGoal) * 100) : 0

      // Log fake payment details
      console.log("Fake payment processed:", {
        transactionId,
        amount: data.amount,
        currency: data.currency,
        paymentMethod: data.paymentMethod,
        projectId,
        projectTitle,
        currentFunding,
        newFunding,
        fundingPercentage: newPercentage,
        donorName: data.isAnonymous ? "Anonymous" : data.giverName,
        message: data.message,
      })

      toast({
        title: "Success! 🎉",
        description: `Your ${projectType === "give" ? "donation" : "backing"} of ${formatCurrency(data.amount, data.currency)} has been processed. Transaction ID: ${transactionId}`,
      })

      // Close modal and refresh page after a delay
      setTimeout(() => {
        onSuccess?.()
        router.refresh()
      }, 2000)
    } catch (error) {
      console.error("Payment processing error:", error)
      toast({
        title: "Payment failed",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = (transactionId: string) => {
    const newFunding = currentFunding + form.getValues("amount")
    const percentComplete = Math.round((newFunding / fundingGoal) * 100)

    toast({
      title:
        projectType === "give"
          ? "Thank you for your donation! ❤️"
          : "Thank you for backing this project! 🚀",
      description: (
        <div className="space-y-2">
          <p>Your support means a lot to {projectTitle}</p>
          <p className="text-muted-foreground text-sm">
            Transaction ID: {transactionId}
          </p>
          <p className="text-sm font-medium">
            Project is now {percentComplete}% funded!
          </p>
        </div>
      ),
    })

    // Success callback after showing toast
    setTimeout(() => {
      onSuccess?.()
      router.refresh()
    }, 1000)

    setIsProcessing(false)
  }

  const handleStripeSuccess = () => {
    setShowStripeModal(false)
    handlePaymentSuccess(
      stripeClientSecret?.split("_secret")[0] || "STRIPE-SUCCESS"
    )
  }

  const handleStripeError = (error: string) => {
    setShowStripeModal(false)
    setIsProcessing(false)
    toast({
      title: "Payment failed",
      description: error,
      variant: "destructive",
    })
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {projectType === "give" ? "❤️ Support" : "🚀 Back"} {projectTitle}
        </CardTitle>
        <CardDescription>
          {projectType === "give"
            ? rewardId
              ? "Complete your donation"
              : "Make a donation to this cause"
            : rewardId
              ? "Complete your pledge"
              : "Back this creative project"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Amount */}
          {step === "amount" && (
            <div className="space-y-4">
              <div>
                <Label>Select or enter an amount</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={
                        form.watch("amount") === amount ? "default" : "outline"
                      }
                      onClick={() => handleAmountSelect(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="customAmount">Custom amount</Label>
                <div className="relative mt-1">
                  <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    className="pl-8"
                    {...form.register("amount", { valueAsNumber: true })}
                    min={rewardAmount || 1}
                  />
                </div>
                {rewardAmount > 0 && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    Minimum amount for this reward: ${rewardAmount}
                  </p>
                )}
                {form.formState.errors.amount && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.amount.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Currency</Label>
                <RadioGroup
                  value={form.watch("currency")}
                  onValueChange={(value) =>
                    form.setValue("currency", value as any)
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="USD" id="usd" />
                    <Label htmlFor="usd" className="font-normal">
                      USD - US Dollar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="EUR" id="eur" />
                    <Label htmlFor="eur" className="font-normal">
                      EUR - Euro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="VND" id="vnd" />
                    <Label htmlFor="vnd" className="font-normal">
                      VND - Vietnamese Dong
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === "payment" && (
            <div className="space-y-4">
              <div>
                <Label>Choose payment method</Label>
                <RadioGroup
                  value={form.watch("paymentMethod")}
                  onValueChange={(value) =>
                    form.setValue("paymentMethod", value as any)
                  }
                  className="mt-2 space-y-3"
                >
                  <div className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1">
                      <Label
                        htmlFor="stripe"
                        className="cursor-pointer font-normal"
                      >
                        Credit/Debit Card
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Secure payment via Stripe
                      </p>
                    </div>
                  </div>

                  <div className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Building2 className="h-5 w-5" />
                    <div className="flex-1">
                      <Label
                        htmlFor="paypal"
                        className="cursor-pointer font-normal"
                      >
                        PayPal
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Pay with your PayPal account
                      </p>
                    </div>
                  </div>

                  <div className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Wallet className="h-5 w-5" />
                    <div className="flex-1">
                      <Label
                        htmlFor="crypto"
                        className="cursor-pointer font-normal"
                      >
                        Cryptocurrency
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Pay with Bitcoin, Ethereum, or other crypto
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium">Donation Summary</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(form.watch("amount"), form.watch("currency"))}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Donor Information */}
          {step === "info" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={form.watch("isAnonymous")}
                  onCheckedChange={(checked) =>
                    form.setValue("isAnonymous", checked as boolean)
                  }
                />
                <Label htmlFor="anonymous" className="font-normal">
                  Make this donation anonymous
                </Label>
              </div>

              {!form.watch("isAnonymous") && (
                <>
                  <div>
                    <Label htmlFor="giverName">
                      <User className="mr-1 inline h-4 w-4" />
                      Your name (optional)
                    </Label>
                    <Input
                      id="giverName"
                      placeholder="John Doe"
                      {...form.register("giverName")}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      <Mail className="mr-1 inline h-4 w-4" />
                      Email (optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...form.register("email")}
                      className="mt-1"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="message">
                  <MessageSquare className="mr-1 inline h-4 w-4" />
                  Leave a message (optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Words of encouragement..."
                  {...form.register("message")}
                  className="mt-1"
                  rows={3}
                />
                <p className="text-muted-foreground mt-1 text-sm">
                  {form.watch("message")?.length || 0}/500 characters
                </p>
              </div>

              <div className="bg-muted space-y-2 rounded-lg p-4">
                <p className="text-sm font-medium">Donation Summary</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Amount</span>
                  <span className="font-medium">
                    {formatCurrency(
                      form.watch("amount"),
                      form.watch("currency")
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Payment method
                  </span>
                  <span className="font-medium capitalize">
                    {form.watch("paymentMethod")}
                  </span>
                </div>
                {form.watch("isAnonymous") && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Donor</span>
                    <span className="font-medium">Anonymous</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            {step !== "amount" ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
              >
                Previous
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}

            {step !== "info" ? (
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isProcessing}>
                {isProcessing
                  ? "Processing..."
                  : projectType === "give"
                    ? "Complete Donation"
                    : "Complete Backing"}
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
