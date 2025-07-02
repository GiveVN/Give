/**
 * comment controller
 */

import { factories } from "@strapi/strapi"

import { commentReplyTemplate } from "../../../extensions/email/templates/comment-reply.js"

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }) => ({
    async create(ctx) {
      // Call the default create method
      const response = await super.create(ctx)

      // Check if this is a reply (has Parent)
      const commentData = ctx.request.body.data
      if (commentData.Parent) {
        try {
          // Fetch the parent comment with author details
          const parentComment = await strapi
            .documents("api::comment.comment")
            .findOne({
              documentId: commentData.Parent,
              populate: ["Author", "Project"],
            })

          // Check if parent comment has an author with email and email notifications enabled
          if (
            parentComment &&
            parentComment.Author &&
            parentComment.Author.email
          ) {
            // Check if the author has email notifications enabled (default is true)
            // Cast to any to avoid TypeScript error since emailNotifications is a custom field
            const author = parentComment.Author as any
            const emailNotificationsEnabled =
              author.emailNotifications !== false

            if (emailNotificationsEnabled) {
              // Fetch the project details
              const project = await strapi
                .documents("api::project.project")
                .findOne({
                  documentId: parentComment.Project.documentId,
                })

              // Prepare email data
              const emailData = {
                to: parentComment.Author.email,
                subject: commentReplyTemplate.subject,
                text: commentReplyTemplate.text,
                html: commentReplyTemplate.html,
              }

              // Template variables
              const templateData = {
                parentComment: parentComment,
                reply: response.data,
                replyAuthor: response.data.Author
                  ? response.data.Author.username
                  : "Anonymous",
                project: project,
                URL: process.env.APP_PUBLIC_URL || "http://localhost:3003",
                APP_NAME: process.env.APP_NAME || "Give",
              }

              // Send email notification
              await strapi.plugins["email"].services.email.sendTemplatedEmail(
                emailData,
                undefined,
                templateData
              )

              console.log(
                `Reply notification email sent to ${parentComment.Author.email}`
              )
            } else {
              console.log(
                `User ${parentComment.Author.email} has disabled email notifications`
              )
            }
          }
        } catch (error) {
          console.error("Error sending reply notification email:", error)
          // Don't throw error to not break the comment creation
        }
      }

      return response
    },
  })
)
