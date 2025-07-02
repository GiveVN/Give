import { NextRequest, NextResponse } from "next/server"

import {
  getDonationConfirmationEmail,
  getNewDonationNotificationEmail,
  getRefundNotificationEmail,
} from "@/lib/email/templates"
import { PrivateStrapiClient } from "@/lib/strapi-api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    let emailTemplate
    let recipientEmail

    switch (type) {
      case "donation_confirmation":
        emailTemplate = getDonationConfirmationEmail(data)
        recipientEmail = data.donorEmail
        break

      case "new_donation_notification":
        emailTemplate = getNewDonationNotificationEmail(data)
        recipientEmail = data.creatorEmail
        break

      case "refund_notification":
        emailTemplate = getRefundNotificationEmail(data)
        recipientEmail = data.donorEmail
        break

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        )
    }

    // Send email via Strapi email plugin
    const response = await PrivateStrapiClient.fetchAPI("/email", {
      method: "POST",
      body: {
        to: recipientEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
