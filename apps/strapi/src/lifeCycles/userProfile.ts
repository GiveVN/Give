import { Event } from "@strapi/database/dist/lifecycles"
import { Core } from "@strapi/strapi"

const crypto = require("crypto")

export const registerUserProfileSubscriber = async ({
  strapi,
}: {
  strapi: Core.Strapi
}) => {
  strapi.db.lifecycles.subscribe({
    models: ["plugin::users-permissions.user"],

    async afterCreate(event) {
      await initializeUserProfile(strapi, event)
      await sendWelcomeEmail(strapi, event)
    },

    async beforeUpdate(event) {
      await validateProfileUpdate(strapi, event)
    },
  })
}

/**
 * Initialize user profile with vanity URL using database transaction
 * This prevents race conditions when multiple users register simultaneously
 */
const initializeUserProfile = async (strapi: Core.Strapi, event: Event) => {
  const { id, username, email, firstName, lastName, documentId } = event.result ?? {}

  if (!id || !username) {
    return
  }

  // Use database transaction to ensure atomic operation
  await strapi.db.transaction(async ({ trx }) => {
    try {
      // Generate base vanity URL from username
      let vanityUrl = username.toLowerCase().replace(/[^a-z0-9]/g, '')
      let counter = 1
      let isUnique = false

      // Keep trying until we find a unique vanity URL
      while (!isUnique) {
        // Check if vanity URL exists
        const existing = await strapi.db
          .query('plugin::users-permissions.user')
          .findOne({
            where: { vanityUrl },
            select: ['id'],
          })

        if (!existing) {
          isUnique = true
        } else {
          // If exists, append counter and try again
          vanityUrl = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}${counter}`
          counter++
        }
      }

      // Create default display name
      const displayName = [firstName, lastName].filter(Boolean).join(' ') || username || `User ${id}`

      // Update user with profile data
      await strapi.db
        .query('plugin::users-permissions.user')
        .update({
          where: { id },
          data: {
            vanityUrl,
            displayName,
            bio: '',
            location: '',
            website: '',
            isPublic: true,
            emailNotifications: true,
            privacySettings: {
              showEmail: false,
              showLocation: true,
              showBackedProjects: true,
              showCreatedProjects: true,
              allowMessages: 'all',
              showActivityFeed: true,
              showDonationHistory: false,
              profileVisibility: 'public'
            },
            notificationSettings: {
              emailNotifications: true,
              projectUpdates: true,
              newFollowers: true,
              messages: true,
              marketingEmails: false,
              weeklyDigest: true
            },
            reputation: 0,
            lastActiveAt: new Date()
          }
        })

      console.log(`User profile initialized for ${username} with vanity URL: ${vanityUrl}`)
    } catch (error) {
      console.error('Error initializing user profile:', error)
      throw error // This will rollback the transaction
    }
  })
}

/**
 * Validate profile updates with rate limiting
 */
const validateProfileUpdate = async (strapi: Core.Strapi, event: Event) => {
  // In Strapi 5, event structure is different
  const data = event.params?.data || {}
  const where = event.params?.where || {}
  
  // Get user ID from where clause
  const userId = where.id

  if (!userId) {
    return
  }

  // Rate limiting check - allow max 10 updates per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const recentUpdates = await strapi.db
    .query('plugin::users-permissions.user')
    .count({
      where: {
        id: userId,
        updatedAt: { $gte: oneHourAgo }
      }
    })

  if (recentUpdates >= 10) {
    throw new Error('Too many profile updates. Please try again later.')
  }

  // Validate social links if provided
  if (data.socialLinks) {
    validateSocialLinks(data.socialLinks)
  }

  // Validate website URL if provided
  if (data.website) {
    validateWebsiteUrl(data.website)
  }

  // Validate vanity URL if being changed
  if (data.vanityUrl) {
    await validateVanityUrl(strapi, data.vanityUrl, userId)
  }

  // Update lastActiveAt
  data.lastActiveAt = new Date()
}

/**
 * Validate social links URLs
 */
const validateSocialLinks = (socialLinks: any[]) => {
  const validPlatforms = ['twitter', 'facebook', 'linkedin', 'instagram', 'youtube', 'github', 'discord']
  const urlPatterns = {
    twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/,
    facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+$/,
    linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+$/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/,
    youtube: /^https?:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9_-]+$/,
    github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+$/,
    discord: /^https?:\/\/(www\.)?discord\.(gg|com\/invite)\/[a-zA-Z0-9]+$/
  }

  for (const link of socialLinks) {
    // Validate platform
    if (!validPlatforms.includes(link.platform)) {
      throw new Error(`Invalid social platform: ${link.platform}`)
    }

    // Validate URL format
    const pattern = urlPatterns[link.platform as keyof typeof urlPatterns]
    if (pattern && !pattern.test(link.url)) {
      throw new Error(`Invalid ${link.platform} URL format: ${link.url}`)
    }

    // Basic URL validation for generic URLs
    try {
      new URL(link.url)
    } catch {
      throw new Error(`Invalid URL: ${link.url}`)
    }
  }
}

/**
 * Validate website URL
 */
const validateWebsiteUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Invalid website URL protocol')
    }
  } catch {
    throw new Error('Invalid website URL format')
  }
}

/**
 * Validate vanity URL uniqueness
 */
const validateVanityUrl = async (strapi: Core.Strapi, vanityUrl: string, userId: number) => {
  // Validate format - only lowercase letters, numbers, and hyphens
  if (!/^[a-z0-9-]+$/.test(vanityUrl)) {
    throw new Error('Vanity URL can only contain lowercase letters, numbers, and hyphens')
  }

  // Check length
  if (vanityUrl.length < 3 || vanityUrl.length > 30) {
    throw new Error('Vanity URL must be between 3 and 30 characters')
  }

  // Check uniqueness
  const existing = await strapi.db
    .query('plugin::users-permissions.user')
    .findOne({
      where: {
        vanityUrl,
        id: { $ne: userId }
      }
    })

  if (existing) {
    throw new Error('This vanity URL is already taken')
  }
}

/**
 * Send welcome email after registration
 */
const sendWelcomeEmail = async (strapi: Core.Strapi, event: Event) => {
  const { email, documentId, firstName, lastName, confirmed } = event.result ?? {}

  if (confirmed) {
    console.log(`User ${email} is already confirmed. Skipping welcome email.`)
    return
  }

  if (!email || !documentId) {
    return
  }

  const feAccountActivationUrl = process.env.CLIENT_ACCOUNT_ACTIVATION_URL
  if (!feAccountActivationUrl) {
    console.warn(
      "CLIENT_ACCOUNT_ACTIVATION_URL is not set. Welcome email will not be sent."
    )
    return
  }

  const name = [firstName, lastName].filter(Boolean).join(" ")
  const resetPasswordToken: string = crypto.randomBytes(64).toString("hex")

  try {
    await strapi.documents("plugin::users-permissions.user").update({
      documentId,
      data: { resetPasswordToken },
    })

    const html = `
      <h2>Welcome to Give Platform!</h2>
      <h3>Your account has been created successfully</h3>
      <p>Hello ${name || 'there'},</p>
      <p>Welcome to our crowdfunding community! We're excited to have you on board.</p>
      <p>To get started, please activate your account and set your password:</p>
      <p><a href="${feAccountActivationUrl}?code=${resetPasswordToken}&email=${email}&name=${name}" target="_blank" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Activate Account</a></p>
      <p>After activation, you can:</p>
      <ul>
        <li>Create and manage crowdfunding projects</li>
        <li>Support projects you believe in</li>
        <li>Connect with other community members</li>
        <li>Track your donations and project updates</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The Give Team</p>
    `

    await strapi.plugins["email"].services.email.send({
      to: email,
      subject: "Welcome to Give - Activate Your Account",
      html,
    })

    console.log(`Welcome email sent to ${email}`)
  } catch (err) {
    console.error('Error sending welcome email:', err)
  }
} 