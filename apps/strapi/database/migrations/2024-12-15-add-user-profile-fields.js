"use strict"

module.exports = {
  async up(knex) {
    // Add new fields to up_users table
    await knex.schema.alterTable("up_users", (table) => {
      // Basic profile fields
      table.string("display_name", 100)
      table.string("vanity_url", 50).unique()
      table.boolean("is_verified").defaultTo(false)
      table.boolean("is_public").defaultTo(true)
      table.integer("reputation").defaultTo(0)
      table.timestamp("last_active_at").defaultTo(knex.fn.now())

      // JSON fields for complex data
      table.jsonb("privacy_settings").defaultTo(
        JSON.stringify({
          showEmail: false,
          showLocation: true,
          showBackedProjects: true,
          showCreatedProjects: true,
          allowMessages: "all",
          showActivityFeed: true,
          showDonationHistory: false,
          profileVisibility: "public",
        })
      )

      table.jsonb("notification_settings").defaultTo(
        JSON.stringify({
          emailNotifications: true,
          projectUpdates: true,
          newFollowers: true,
          messages: true,
          marketingEmails: false,
          weeklyDigest: true,
        })
      )

      // Add indexes for performance
      table.index("vanity_url")
      table.index("reputation")
      table.index("last_active_at")
      table.index("is_public")
    })

    // Create social_links table
    await knex.schema.createTable("social_links", (table) => {
      table.increments("id").primary()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("up_users")
        .onDelete("CASCADE")
      table.string("platform", 50).notNullable()
      table.string("url", 500).notNullable()
      table.boolean("is_verified").defaultTo(false)
      table.boolean("is_public").defaultTo(true)
      table.timestamps(true, true)

      // Indexes
      table.index("user_id")
      table.index(["user_id", "platform"])
    })

    // Create user_activities table for activity feed
    await knex.schema.createTable("user_activities", (table) => {
      table.increments("id").primary()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("up_users")
        .onDelete("CASCADE")
      table.string("activity_type", 50).notNullable()
      table.string("entity_type", 50)
      table.integer("entity_id").unsigned()
      table.jsonb("metadata")
      table.timestamp("created_at").defaultTo(knex.fn.now())

      // Indexes
      table.index("user_id")
      table.index("activity_type")
      table.index("created_at")
      table.index(["user_id", "created_at"])
    })

    // Create achievements table
    await knex.schema.createTable("achievements", (table) => {
      table.increments("id").primary()
      table.string("name", 100).notNullable()
      table.text("description")
      table.string("icon", 255)
      table.jsonb("criteria")
      table.integer("points").defaultTo(0)
      table.boolean("is_active").defaultTo(true)
      table.timestamps(true, true)

      // Indexes
      table.index("is_active")
    })

    // Create user_achievements table
    await knex.schema.createTable("user_achievements", (table) => {
      table.increments("id").primary()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("up_users")
        .onDelete("CASCADE")
      table
        .integer("achievement_id")
        .unsigned()
        .references("id")
        .inTable("achievements")
        .onDelete("CASCADE")
      table.timestamp("earned_at").defaultTo(knex.fn.now())

      // Unique constraint
      table.unique(["user_id", "achievement_id"])

      // Indexes
      table.index("user_id")
      table.index("achievement_id")
    })

    // Insert default achievements
    await knex("achievements").insert([
      {
        name: "First Project",
        description: "Created your first crowdfunding project",
        icon: "🚀",
        criteria: JSON.stringify({ type: "project_created", count: 1 }),
        points: 10,
      },
      {
        name: "Supporter",
        description: "Made your first donation",
        icon: "❤️",
        criteria: JSON.stringify({ type: "donation_made", count: 1 }),
        points: 5,
      },
      {
        name: "Community Builder",
        description: "Posted 10 comments",
        icon: "💬",
        criteria: JSON.stringify({ type: "comment_posted", count: 10 }),
        points: 15,
      },
      {
        name: "Fundraising Hero",
        description: "Successfully funded a project",
        icon: "🏆",
        criteria: JSON.stringify({ type: "project_funded", count: 1 }),
        points: 50,
      },
      {
        name: "Generous Backer",
        description: "Donated to 10 different projects",
        icon: "🎁",
        criteria: JSON.stringify({ type: "unique_donations", count: 10 }),
        points: 25,
      },
    ])
  },

  async down(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists("user_achievements")
    await knex.schema.dropTableIfExists("achievements")
    await knex.schema.dropTableIfExists("user_activities")
    await knex.schema.dropTableIfExists("social_links")

    // Remove fields from up_users table
    await knex.schema.alterTable("up_users", (table) => {
      table.dropColumn("display_name")
      table.dropColumn("vanity_url")
      table.dropColumn("is_verified")
      table.dropColumn("is_public")
      table.dropColumn("reputation")
      table.dropColumn("last_active_at")
      table.dropColumn("privacy_settings")
      table.dropColumn("notification_settings")
    })
  },
}
