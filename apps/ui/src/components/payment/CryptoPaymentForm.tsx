"use client"

import { useState, useEffect } from "react"
import { QrCode, Wallet, Copy, CheckCircle2 } from "lucide-react"
import QRCode from "qrcode"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

import {
  SUPPORTED_CRYPTO,
  PLATFORM_WALLETS,
  isWeb3Available,
  connectWeb3Wallet,
  sendETHTransaction,
  sendERC20Transaction,
  generateCryptoQRData,
} from "@/lib/payment/crypto"

interface CryptoPaymentFormProps {
  amount: number
  donationId: string
  projectId: string
  projectTitle: string
  onSuccess: (txHash: string) => void
  onError: (error: string) => void
}

export default function CryptoPaymentForm({
  amount,
  donationId,
  projectId,
  projectTitle,
  onSuccess,
  onError,
}: CryptoPaymentFormProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<keyof typeof SUPPORTED_CRYPTO>("ETH")
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "qr">("wallet")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    generateQRCode()
  }, [selectedCrypto, amount])

  const generateQRCode = async () => {
    const address = PLATFORM_WALLETS[selectedCrypto]
    const qrData = generateCryptoQRData(selectedCrypto, address, amount.toString())
    
    try {
      const url = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrCodeUrl(url)
    } catch (err) {
      console.error("Failed to generate QR code:", err)
    }
  }

  const handleConnectWallet = async () => {
    try {
      const address = await connectWeb3Wallet()
      setWalletAddress(address)
      toast({
        title: "Wallet connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to connect wallet"
      toast({
        title: "Connection failed",
        description: message,
        variant: "destructive",
      })
      onError(message)
    }
  }

  const handleWalletPayment = async () => {
    if (!walletAddress) {
      await handleConnectWallet()
      return
    }

    setIsProcessing(true)
    
    try {
      let txResult
      const metadata = { donationId, projectId, projectTitle }

      if (selectedCrypto === "ETH") {
        txResult = await sendETHTransaction(
          PLATFORM_WALLETS.ETH,
          amount.toString(),
          metadata
        )
      } else if (selectedCrypto === "USDT") {
        txResult = await sendERC20Transaction(
          SUPPORTED_CRYPTO.USDT.contractAddress!,
          PLATFORM_WALLETS.USDT,
          amount.toString(),
          SUPPORTED_CRYPTO.USDT.decimals,
          metadata
        )
      } else {
        throw new Error("Unsupported cryptocurrency for wallet payment")
      }

      if (txResult.status === "success") {
        toast({
          title: "Payment successful",
          description: `Transaction hash: ${txResult.hash}`,
        })
        onSuccess(txResult.hash)
      } else {
        throw new Error("Transaction failed")
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Payment failed"
      toast({
        title: "Payment failed",
        description: message,
        variant: "destructive",
      })
      onError(message)
    } finally {
      setIsProcessing(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(PLATFORM_WALLETS[selectedCrypto])
    setCopied(true)
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Crypto Selection */}
      <div>
        <Label>Select cryptocurrency</Label>
        <RadioGroup
          value={selectedCrypto}
          onValueChange={(value) => setSelectedCrypto(value as keyof typeof SUPPORTED_CRYPTO)}
          className="mt-2"
        >
          {Object.entries(SUPPORTED_CRYPTO).map(([key, crypto]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={key} />
              <Label htmlFor={key} className="font-normal cursor-pointer">
                {crypto.name} ({crypto.symbol})
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Payment Method Selection */}
      <div>
        <Label>Payment method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as "wallet" | "qr")}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wallet" id="wallet" />
            <Label htmlFor="wallet" className="font-normal cursor-pointer">
              <Wallet className="inline h-4 w-4 mr-1" />
              Connect Web3 Wallet
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="qr" id="qr" />
            <Label htmlFor="qr" className="font-normal cursor-pointer">
              <QrCode className="inline h-4 w-4 mr-1" />
              QR Code / Manual Transfer
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Payment Interface */}
      {paymentMethod === "wallet" ? (
        <Card>
          <CardHeader>
            <CardTitle>Web3 Wallet Payment</CardTitle>
            <CardDescription>
              Connect your wallet to send {amount} {selectedCrypto}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isWeb3Available() ? (
              <Alert>
                <AlertDescription>
                  No Web3 wallet detected. Please install MetaMask or another Web3 wallet.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {walletAddress && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                      Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  onClick={walletAddress ? handleWalletPayment : handleConnectWallet}
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : walletAddress ? (
                    `Send ${amount} ${selectedCrypto}`
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Manual Transfer</CardTitle>
            <CardDescription>
              Scan QR code or copy address to send {amount} {selectedCrypto}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* QR Code */}
            <div className="flex justify-center">
              <img src={qrCodeUrl} alt="Payment QR Code" className="w-64 h-64" />
            </div>

            {/* Wallet Address */}
            <div className="space-y-2">
              <Label>Send to this address:</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                  {PLATFORM_WALLETS[selectedCrypto]}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyAddress}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Amount */}
            <Alert>
              <AlertDescription>
                <strong>Amount:</strong> {amount} {selectedCrypto}
              </AlertDescription>
            </Alert>

            {/* Instructions */}
            <Alert>
              <AlertDescription>
                After sending the transaction, please save the transaction hash and contact support
                to verify your donation.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 