// Payment Security & Compliance Utilities

// PCI DSS Compliance - Never store sensitive card data
export const sanitizePaymentData = (data: any) => {
  const sanitized = { ...data }
  
  // Remove sensitive fields
  delete sanitized.cardNumber
  delete sanitized.cvv
  delete sanitized.cardholderName
  
  // Mask any remaining sensitive data
  if (sanitized.last4) {
    sanitized.maskedCard = `****-****-****-${sanitized.last4}`
  }
  
  return sanitized
}

// Input validation for payment amounts
export const validatePaymentAmount = (amount: number, currency: string) => {
  // Check if amount is positive
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0")
  }
  
  // Check minimum amounts by currency
  const minimums: Record<string, number> = {
    USD: 1.00,
    EUR: 1.00,
    VND: 10000,
    ETH: 0.001,
    BTC: 0.00001
  }
  
  const minimum = minimums[currency] || 1
  if (amount < minimum) {
    throw new Error(`Minimum amount for ${currency} is ${minimum}`)
  }
  
  // Check maximum amounts (anti-fraud)
  const maximums: Record<string, number> = {
    USD: 10000,
    EUR: 10000,
    VND: 100000000,
    ETH: 10,
    BTC: 0.1
  }
  
  const maximum = maximums[currency] || 10000
  if (amount > maximum) {
    throw new Error(`Maximum amount for ${currency} is ${maximum}`)
  }
  
  return true
}

// Rate limiting for payment attempts
const attemptCounts = new Map<string, { count: number; resetAt: number }>()

export const checkRateLimit = (identifier: string, maxAttempts = 5, windowMs = 900000) => {
  const now = Date.now()
  const attempts = attemptCounts.get(identifier)
  
  if (!attempts || attempts.resetAt < now) {
    attemptCounts.set(identifier, { count: 1, resetAt: now + windowMs })
    return true
  }
  
  if (attempts.count >= maxAttempts) {
    const remainingMs = attempts.resetAt - now
    const remainingMin = Math.ceil(remainingMs / 60000)
    throw new Error(`Too many attempts. Please try again in ${remainingMin} minutes.`)
  }
  
  attempts.count++
  return true
}

// Fraud detection signals
export const getFraudSignals = (request: Request) => {
  const headers = request.headers
  
  return {
    ip: headers.get('x-forwarded-for') || headers.get('x-real-ip'),
    userAgent: headers.get('user-agent'),
    referer: headers.get('referer'),
    acceptLanguage: headers.get('accept-language'),
    timestamp: new Date().toISOString()
  }
}

// Data encryption for storage
export const encryptSensitiveData = async (data: string): Promise<string> => {
  // In production, use proper encryption library like crypto-js
  // For MVP, return base64 encoded
  return Buffer.from(data).toString('base64')
}

export const decryptSensitiveData = async (encrypted: string): Promise<string> => {
  // In production, use proper decryption
  // For MVP, decode base64
  return Buffer.from(encrypted, 'base64').toString()
}

// Compliance checks
export const performComplianceChecks = async (donation: any) => {
  const checks = []
  
  // KYC threshold check (example: $1000 USD)
  if (donation.Currency === 'USD' && donation.Amount >= 1000) {
    checks.push({
      type: 'KYC_REQUIRED',
      message: 'Know Your Customer verification required for large donations'
    })
  }
  
  // Sanctions screening (in production, integrate with screening API)
  if (donation.GiverName) {
    // Mock check - in production use real sanctions API
    const sanctionedNames = ['test_sanctioned_user']
    if (sanctionedNames.includes(donation.GiverName.toLowerCase())) {
      checks.push({
        type: 'SANCTIONS_HIT',
        message: 'Transaction blocked due to compliance requirements'
      })
    }
  }
  
  // Geographic restrictions
  const restrictedCountries = ['XX', 'YY'] // ISO country codes
  if (donation.Country && restrictedCountries.includes(donation.Country)) {
    checks.push({
      type: 'GEOGRAPHIC_RESTRICTION',
      message: 'Donations not available in your region'
    })
  }
  
  return checks
}

// Audit logging
export const logPaymentActivity = (activity: {
  type: string
  donationId?: string
  userId?: string
  amount?: number
  currency?: string
  status: string
  metadata?: any
}) => {
  // In production, send to secure logging service
  console.log('[PAYMENT_AUDIT]', {
    ...activity,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
}

// GDPR compliance - data retention
export const shouldDeleteOldData = (createdAt: string): boolean => {
  const created = new Date(createdAt)
  const now = new Date()
  const daysSinceCreation = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  
  // Keep financial records for 7 years for tax purposes
  return daysSinceCreation > 2555 // ~7 years
}

// Export compliance report
export const generateComplianceReport = async (startDate: Date, endDate: Date) => {
  // In production, query database for all transactions in date range
  return {
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    summary: {
      totalTransactions: 0,
      totalAmount: 0,
      flaggedTransactions: 0,
      refundedTransactions: 0
    },
    compliance: {
      kycRequired: 0,
      sanctionsScreened: 0,
      geographicRestrictions: 0
    },
    recommendations: [
      'Implement automated KYC for high-value transactions',
      'Integrate real-time sanctions screening',
      'Add transaction monitoring for suspicious patterns'
    ]
  }
} 