import type { Core } from "@strapi/strapi"

import { registerAdminUserSubscriber } from "./lifeCycles/adminUser"
import { registerPopulateDeepSubscriber } from "./lifeCycles/populateDeep"
import { registerUserSubscriber } from "./lifeCycles/user"

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    registerAdminUserSubscriber({ strapi })
    registerUserSubscriber({ strapi })
    registerPopulateDeepSubscriber({ strapi })

    // Override email service với Brevo API
    strapi.plugin("email").service("email").send = async (options) => {
      try {
        console.log("🚀 Sending email via Brevo API:", options)

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: "Give Platform",
              email: process.env.EMAIL_DEFAULT_FROM || "admin@give.local",
            },
            to: [
              {
                email: options.to,
                name: options.to,
              },
            ],
            subject: options.subject,
            htmlContent: options.html || options.text,
          }),
        })

        if (!response.ok) {
          const errorData = await response.text()
          console.error("❌ Brevo API error:", response.status, errorData)
          throw new Error(`Brevo API error: ${response.status} - ${errorData}`)
        }

        const result = await response.json()
        console.log("✅ Email sent successfully via Brevo:", result)
        return result
      } catch (error) {
        console.error("❌ Email sending failed:", error)
        throw error
      }
    }
  },
}
