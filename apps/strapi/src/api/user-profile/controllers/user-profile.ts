import { Core } from "@strapi/strapi"
import { errors } from "@strapi/utils"

const { RateLimitError } = errors

// Rate limiting storage (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Rate limiting function
 * @param identifier Unique identifier for rate limiting
 * @param maxRequests Maximum requests allowed
 * @param windowMs Time window in milliseconds
 */
const checkRateLimit = (
  identifier: string,
  maxRequests: number,
  windowMs: number
) => {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || record.resetAt < now) {
    // Create new record
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { allowed: true }
  } else {
    // Update existing record
    record.count++

    if (record.count > maxRequests) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000)
      return { allowed: false, retryAfter }
    }

    return { allowed: true }
  }
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Get current user's profile
   */
  async me(ctx: any) {
    const userId = ctx.state.user?.id

    if (!userId) {
      return ctx.unauthorized("You must be logged in to view your profile")
    }

    const profile = await strapi
      .service("api::user-profile.user-profile")
      .findOneOptimized(userId, true)

    if (!profile) {
      return ctx.notFound("Profile not found")
    }

    ctx.body = { data: profile }
  },

  /**
   * Get user profile by ID or vanity URL
   */
  async findOne(ctx: any) {
    const { id } = ctx.params
    const currentUserId = ctx.state.user?.id

    // Check if it's a vanity URL or numeric ID
    const isVanityUrl = isNaN(parseInt(id))

    let user
    if (isVanityUrl) {
      user = await strapi.db.query("plugin::users-permissions.user").findOne({
        where: { vanityUrl: id },
        select: ["id"],
      })
    } else {
      user = { id }
    }

    if (!user) {
      return ctx.notFound("User not found")
    }

    const includePrivate = currentUserId === user.id
    const profile = await strapi
      .service("api::user-profile.user-profile")
      .findOneOptimized(user.id, includePrivate)

    if (!profile) {
      return ctx.notFound("Profile not found")
    }

    // Check if profile is public
    if (!profile.isPublic && currentUserId !== user.id) {
      return ctx.forbidden("This profile is private")
    }

    ctx.body = { data: profile }
  },

  /**
   * Update current user's profile
   * Rate limited to 10 updates per hour
   */
  async update(ctx: any) {
    const userId = ctx.state.user?.id
    const { data } = ctx.request.body

    if (!userId) {
      return ctx.unauthorized("You must be logged in to update your profile")
    }

    // Check rate limit
    const identifier = `${userId}-profile-update`
    const { allowed, retryAfter } = checkRateLimit(
      identifier,
      10,
      60 * 60 * 1000
    )

    if (!allowed) {
      ctx.set("Retry-After", retryAfter!.toString())
      throw new RateLimitError("Too many requests, please try again later.")
    }

    // Sanitize input - only allow specific fields
    const allowedFields = [
      "firstName",
      "lastName",
      "displayName",
      "bio",
      "location",
      "website",
      "vanityUrl",
      "privacySettings",
      "notificationSettings",
      "socialLinks",
    ]

    const sanitizedData: any = {}
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        sanitizedData[field] = data[field]
      }
    }

    try {
      const updatedUser = await strapi
        .documents("plugin::users-permissions.user")
        .update({
          documentId: ctx.state.user.documentId,
          data: sanitizedData,
        })

      // Update reputation after profile update
      await strapi
        .service("api::user-profile.user-profile")
        .updateReputation(userId)

      const profile = await strapi
        .service("api::user-profile.user-profile")
        .findOneOptimized(userId, true)

      ctx.body = {
        data: profile,
        meta: {
          message: "Profile updated successfully",
        },
      }
    } catch (error: any) {
      if (error.message.includes("vanity URL")) {
        return ctx.badRequest(error.message)
      }
      if (error.message.includes("Too many profile updates")) {
        throw new RateLimitError(error.message)
      }
      throw error
    }
  },

  /**
   * Upload avatar
   * Rate limited to 5 uploads per day
   */
  async uploadAvatar(ctx: any) {
    const userId = ctx.state.user?.id

    if (!userId) {
      return ctx.unauthorized("You must be logged in to upload an avatar")
    }

    // Check rate limit
    const identifier = `${userId}-avatar-upload`
    const { allowed, retryAfter } = checkRateLimit(
      identifier,
      5,
      24 * 60 * 60 * 1000
    )

    if (!allowed) {
      ctx.set("Retry-After", retryAfter!.toString())
      throw new RateLimitError("Too many requests, please try again later.")
    }

    const { files } = ctx.request

    if (!files || !files.avatar) {
      return ctx.badRequest("No avatar file provided")
    }

    const avatarFile = Array.isArray(files.avatar)
      ? files.avatar[0]
      : files.avatar

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(avatarFile.mimetype)) {
      return ctx.badRequest(
        "Invalid file type. Only JPEG, PNG, and WebP are allowed."
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (avatarFile.size > maxSize) {
      return ctx.badRequest("File size too large. Maximum size is 5MB.")
    }

    try {
      // Upload file using Strapi's upload service
      const uploadedFiles = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {
            refId: userId,
            ref: "plugin::users-permissions.user",
            field: "avatar",
          },
          files: avatarFile,
        })

      // Update user avatar
      await strapi.documents("plugin::users-permissions.user").update({
        documentId: ctx.state.user.documentId,
        data: {
          avatar: uploadedFiles[0].id,
        },
      })

      ctx.body = {
        data: uploadedFiles[0],
        meta: {
          message: "Avatar uploaded successfully",
        },
      }
    } catch (error) {
      console.error("Avatar upload error:", error)
      return ctx.internalServerError("Failed to upload avatar")
    }
  },

  /**
   * Search users
   */
  async search(ctx: any) {
    const { q, limit = 10 } = ctx.query

    if (!q) {
      return ctx.badRequest("Search query is required")
    }

    const results = await strapi
      .service("api::user-profile.user-profile")
      .search(q, Math.min(parseInt(limit), 50))

    ctx.body = { data: results }
  },

  /**
   * Get user's activity feed
   */
  async activityFeed(ctx: any) {
    const { id } = ctx.params
    const { page = 1, pageSize = 20 } = ctx.query

    const activities = await strapi
      .service("api::user-profile.user-profile")
      .getActivityFeed(id, parseInt(page), parseInt(pageSize))

    ctx.body = activities
  },
})
