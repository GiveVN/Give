"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

function DonationSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [donationData, setDonationData] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      setError("No session ID provided")
      return
    }

    // Verify the payment with backend
    fetch(`/api/payments/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success")
          setDonationData(data.donation)
        } else {
          setStatus("error")
          setError(data.error || "Payment verification failed")
        }
      })
      .catch((err) => {
        setStatus("error")
        setError("Failed to verify payment")
        console.error(err)
      })
  }, [sessionId])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (status === "error") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="h-8 w-8 text-destructive" />
            <CardTitle>Payment Error</CardTitle>
          </div>
          <CardDescription>
            There was an issue processing your donation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/projects">Browse Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <CardTitle>Thank You for Your Donation!</CardTitle>
        </div>
        <CardDescription>
          Your payment has been successfully processed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <p className="font-mono text-sm">{sessionId}</p>
          </div>

          {donationData && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-semibold">
                    ${donationData.amount} {donationData.currency?.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-lg">
                    {new Date(donationData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {donationData.projectTitle && (
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="text-lg">{donationData.projectTitle}</p>
                </div>
              )}

              <Alert>
                <AlertDescription>
                  A receipt has been sent to your email address. You can also download
                  it from your account dashboard.
                </AlertDescription>
              </Alert>
            </>
          )}

          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/projects">Donate to Another Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account/donations">View My Donations</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DonationSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <DonationSuccessContent />
      </Suspense>
    </div>
  )
} 