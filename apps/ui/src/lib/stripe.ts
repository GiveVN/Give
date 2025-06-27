import Stripe from 'stripe'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Latest API version
  typescript: true,
})

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  currency: 'usd' as const,
  paymentMethods: {
    card: true,
    // Add more payment methods as needed
  },
}

// Helper to format amount for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number, currency: string = 'usd'): number => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

// Helper to format amount from Stripe (convert from cents)
export const formatAmountFromStripe = (amount: number, currency: string = 'usd'): number => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  
  return zeroDecimalCurrency ? amount : amount / 100
} 