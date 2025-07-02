import { Core } from "@strapi/strapi"

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Get user profile with optimized queries
   * Uses select and populate to minimize data transfer
   */
  async findOneOptimized(userId: string, includePrivate = false) {
    const query = strapi.db.query("plugin::users-permissions.user")

    // Base fields to select
    const selectFields = [
      "id",
      "username",
      "email",
      "firstName",
      "lastName",
      "displayName",
      "bio",
      "location",
      "website",
      "vanityUrl",
      "isVerified",
      "isPublic",
      "reputation",
      "createdAt",
      "updatedAt",
      "lastActiveAt",
    ]

    // Add private fields if requested
    if (includePrivate) {
      selectFields.push(
        "privacySettings",
        "notificationSettings",
        "emailNotifications"
      )
    }

    const user = await query.findOne({
      where: { id: userId },
      select: selectFields,
      populate: {
        avatar: {
          select: ["url", "alternativeText", "width", "height"],
        },
        coverImage: {
          select: ["url", "alternativeText", "width", "height"],
        },
        socialLinks: {
          select: ["platform", "url", "isVerified", "isPublic"],
          where: includePrivate ? {} : { isPublic: true },
        },
      },
    })

    if (!user) {
      return null
    }

    // Get aggregated stats in parallel for performance
    const [projectStats, donationStats] = await Promise.all([
      this.getProjectStats(userId),
      this.getDonationStats(userId),
    ])

    return {
      ...user,
      ...projectStats,
      ...donationStats,
    }
  },

  /**
   * Get project statistics for a user
   */
  async getProjectStats(userId: string) {
    const [projectCount, totalRaised] = await Promise.all([
      // Count user's projects
      strapi.db.query("api::project.project").count({
        where: { Creator: userId },
      }),

      // Sum total raised from all projects
      strapi.db.connection.raw(
        `
        SELECT COALESCE(SUM(p."FundingGoal"), 0) as total_raised
        FROM projects p
        WHERE p."Creator" = ?
        AND p."Status" = 'funded'
      `,
        [userId]
      ),
    ])

    return {
      projectCount,
      totalRaised: totalRaised.rows[0]?.total_raised || 0,
    }
  },

  /**
   * Get donation statistics for a user
   */
  async getDonationStats(userId: string) {
    const result = await strapi.db.connection.raw(
      `
      SELECT 
        COUNT(*) as donation_count,
        COALESCE(SUM(d."Amount"), 0) as total_donated
      FROM donations d
      WHERE d."Giver" = ?
      AND d."Status" = 'completed'
    `,
      [userId]
    )

    return {
      donationCount: parseInt(result.rows[0]?.donation_count || "0"),
      totalDonated: parseFloat(result.rows[0]?.total_donated || "0"),
    }
  },

  /**
   * Get user profiles with pagination and filtering
   */
  async findMany({
    page = 1,
    pageSize = 20,
    sort = "reputation:desc",
    filters = {},
  }) {
    const offset = (page - 1) * pageSize

    // Build where clause
    const where: any = {
      isPublic: true,
      ...filters,
    }

    // Parse sort parameter
    const [sortField, sortOrder] = sort.split(":")
    const orderBy = { [sortField]: sortOrder || "asc" }

    // Get users with minimal fields for listing
    const users = await strapi.db
      .query("plugin::users-permissions.user")
      .findMany({
        where,
        select: [
          "id",
          "username",
          "displayName",
          "bio",
          "location",
          "vanityUrl",
          "isVerified",
          "reputation",
          "lastActiveAt",
        ],
        populate: {
          avatar: {
            select: ["url", "alternativeText"],
          },
        },
        orderBy,
        offset,
        limit: pageSize,
      })

    // Get total count for pagination
    const total = await strapi.db
      .query("plugin::users-permissions.user")
      .count({ where })

    return {
      data: users,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      },
    }
  },

  /**
   * Search users by name or username
   */
  async search(query: string, limit = 10) {
    if (!query || query.length < 2) {
      return []
    }

    const searchQuery = `%${query.toLowerCase()}%`

    const results = await strapi.db.connection.raw(
      `
      SELECT 
        id,
        username,
        "displayName",
        "vanityUrl",
        "isVerified",
        reputation
      FROM public.up_users
      WHERE 
        "isPublic" = true
        AND (
          LOWER(username) LIKE ?
          OR LOWER("displayName") LIKE ?
          OR LOWER("vanityUrl") LIKE ?
        )
      ORDER BY 
        CASE 
          WHEN LOWER(username) = ? THEN 1
          WHEN LOWER("vanityUrl") = ? THEN 2
          WHEN LOWER(username) LIKE ? THEN 3
          WHEN LOWER("vanityUrl") LIKE ? THEN 4
          ELSE 5
        END,
        reputation DESC
      LIMIT ?
    `,
      [
        searchQuery,
        searchQuery,
        searchQuery,
        query.toLowerCase(),
        query.toLowerCase(),
        `${query.toLowerCase()}%`,
        `${query.toLowerCase()}%`,
        limit,
      ]
    )

    return results.rows
  },

  /**
   * Get user activity feed
   */
  async getActivityFeed(userId: string, page = 1, pageSize = 20) {
    const offset = (page - 1) * pageSize

    // Get user's privacy settings
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: userId },
        select: ["privacySettings"],
      })

    if (!user?.privacySettings?.showActivityFeed) {
      return {
        data: [],
        meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } },
      }
    }

    // Get activities from multiple sources
    const activities = await strapi.db.connection.raw(
      `
      (
        SELECT 
          'project_created' as type,
          p.id as entity_id,
          p."Title" as title,
          p."createdAt" as created_at
        FROM projects p
        WHERE p."Creator" = ?
        ${user.privacySettings.showCreatedProjects ? "" : "AND 1=0"}
      )
      UNION ALL
      (
        SELECT 
          'donation_made' as type,
          d.id as entity_id,
          p."Title" as title,
          d."createdAt" as created_at
        FROM donations d
        JOIN projects p ON d."Project" = p.id
        WHERE d."Giver" = ?
        AND d."Status" = 'completed'
        ${user.privacySettings.showDonationHistory ? "" : "AND 1=0"}
      )
      UNION ALL
      (
        SELECT 
          'comment_posted' as type,
          c.id as entity_id,
          p."Title" as title,
          c."createdAt" as created_at
        FROM comments c
        JOIN projects p ON c."Project" = p.id
        WHERE c."Author" = ?
      )
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `,
      [userId, userId, userId, pageSize, offset]
    )

    // Get total count
    const totalResult = await strapi.db.connection.raw(
      `
      SELECT COUNT(*) as total FROM (
        SELECT 1 FROM projects WHERE "Creator" = ?
        ${user.privacySettings.showCreatedProjects ? "" : "AND 1=0"}
        UNION ALL
        SELECT 1 FROM donations WHERE "Giver" = ? AND "Status" = 'completed'
        ${user.privacySettings.showDonationHistory ? "" : "AND 1=0"}
        UNION ALL
        SELECT 1 FROM comments WHERE "Author" = ?
      ) as activities
    `,
      [userId, userId, userId]
    )

    const total = parseInt(totalResult.rows[0]?.total || "0")

    return {
      data: activities.rows,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      },
    }
  },

  /**
   * Update user reputation based on activities
   */
  async updateReputation(userId: string) {
    // Calculate reputation based on various factors
    const factors = await strapi.db.connection.raw(
      `
      SELECT 
        (SELECT COUNT(*) * 10 FROM projects WHERE "Creator" = ? AND "Status" = 'funded') as funded_projects,
        (SELECT COUNT(*) * 5 FROM projects WHERE "Creator" = ?) as total_projects,
        (SELECT COUNT(*) * 2 FROM donations WHERE "Giver" = ? AND "Status" = 'completed') as donations_made,
        (SELECT COUNT(*) FROM comments WHERE "Author" = ?) as comments_posted,
        (SELECT COUNT(*) * 3 FROM project_updates WHERE "Author" = ?) as updates_posted
    `,
      [userId, userId, userId, userId, userId]
    )

    const {
      funded_projects,
      total_projects,
      donations_made,
      comments_posted,
      updates_posted,
    } = factors.rows[0]

    const reputation =
      parseInt(funded_projects || 0) +
      parseInt(total_projects || 0) +
      parseInt(donations_made || 0) +
      parseInt(comments_posted || 0) +
      parseInt(updates_posted || 0)

    // Update user reputation
    await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: userId },
      data: { reputation },
    })

    return reputation
  },
})
