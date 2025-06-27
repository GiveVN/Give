// Email template types
export interface EmailTemplate {
  subject: string
  html: string
  text?: string
}

// Donation confirmation email for donor
export function getDonationConfirmationEmail(data: {
  donorName: string
  projectTitle: string
  amount: number
  currency: string
  donationId: string
  projectUrl: string
}): EmailTemplate {
  const { donorName, projectTitle, amount, currency, donationId, projectUrl } = data
  
  return {
    subject: `Thank you for supporting ${projectTitle}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Donation Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .amount { font-size: 32px; font-weight: bold; color: #3b82f6; margin: 20px 0; }
            .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Support!</h1>
            </div>
            <div class="content">
              <p>Dear ${donorName},</p>
              
              <p>Thank you for your generous donation to <strong>${projectTitle}</strong>!</p>
              
              <div class="amount">
                ${currency} ${amount.toLocaleString()}
              </div>
              
              <p>Your donation makes a real difference and helps bring this project to life. We're grateful for your support and belief in our mission.</p>
              
              <p><strong>Donation Details:</strong></p>
              <ul>
                <li>Donation ID: ${donationId}</li>
                <li>Project: ${projectTitle}</li>
                <li>Amount: ${currency} ${amount.toLocaleString()}</li>
                <li>Date: ${new Date().toLocaleDateString()}</li>
              </ul>
              
              <a href="${projectUrl}" class="button">View Project Updates</a>
              
              <p style="margin-top: 30px;">We'll keep you updated on the project's progress. Thank you again for being part of this journey!</p>
              
              <p>Best regards,<br>The Give Platform Team</p>
            </div>
            <div class="footer">
              <p>This is a confirmation email for your donation. Please keep it for your records.</p>
              <p>If you have any questions, please contact support@give.platform</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Thank you for supporting ${projectTitle}!

Dear ${donorName},

Thank you for your generous donation of ${currency} ${amount.toLocaleString()} to ${projectTitle}!

Donation Details:
- Donation ID: ${donationId}
- Project: ${projectTitle}
- Amount: ${currency} ${amount.toLocaleString()}
- Date: ${new Date().toLocaleDateString()}

Your donation makes a real difference and helps bring this project to life. We're grateful for your support and belief in our mission.

View project updates: ${projectUrl}

Best regards,
The Give Platform Team

This is a confirmation email for your donation. Please keep it for your records.
    `.trim()
  }
}

// New donation notification for project creator
export function getNewDonationNotificationEmail(data: {
  creatorName: string
  projectTitle: string
  donorName: string
  amount: number
  currency: string
  message?: string
  projectUrl: string
}): EmailTemplate {
  const { creatorName, projectTitle, donorName, amount, currency, message, projectUrl } = data
  
  return {
    subject: `New donation for ${projectTitle}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Donation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10b981; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .amount { font-size: 32px; font-weight: bold; color: #10b981; margin: 20px 0; }
            .message { background-color: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; }
            .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>You've Received a New Donation!</h1>
            </div>
            <div class="content">
              <p>Hi ${creatorName},</p>
              
              <p>Great news! <strong>${donorName}</strong> just donated to your project <strong>${projectTitle}</strong>!</p>
              
              <div class="amount">
                ${currency} ${amount.toLocaleString()}
              </div>
              
              ${message ? `
                <div class="message">
                  <p><strong>Message from ${donorName}:</strong></p>
                  <p>"${message}"</p>
                </div>
              ` : ''}
              
              <p>This brings you one step closer to your funding goal. Keep up the great work!</p>
              
              <a href="${projectUrl}" class="button">View Your Project</a>
              
              <p style="margin-top: 30px;">Remember to thank your backers and keep them updated on your progress!</p>
              
              <p>Best regards,<br>The Give Platform Team</p>
            </div>
            <div class="footer">
              <p>You're receiving this because you're the creator of ${projectTitle}.</p>
              <p>Manage your email preferences in your account settings.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
You've Received a New Donation!

Hi ${creatorName},

Great news! ${donorName} just donated ${currency} ${amount.toLocaleString()} to your project ${projectTitle}!

${message ? `Message from ${donorName}: "${message}"` : ''}

This brings you one step closer to your funding goal. Keep up the great work!

View your project: ${projectUrl}

Remember to thank your backers and keep them updated on your progress!

Best regards,
The Give Platform Team
    `.trim()
  }
}

// Refund notification email
export function getRefundNotificationEmail(data: {
  donorName: string
  projectTitle: string
  amount: number
  currency: string
  refundReason?: string
}): EmailTemplate {
  const { donorName, projectTitle, amount, currency, refundReason } = data
  
  return {
    subject: `Refund processed for ${projectTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Refund Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .amount { font-size: 32px; font-weight: bold; color: #ef4444; margin: 20px 0; }
            .info { background-color: #fee2e2; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Refund Processed</h1>
            </div>
            <div class="content">
              <p>Dear ${donorName},</p>
              
              <p>We've processed a refund for your donation to <strong>${projectTitle}</strong>.</p>
              
              <div class="amount">
                ${currency} ${amount.toLocaleString()}
              </div>
              
              <div class="info">
                <p><strong>Refund Details:</strong></p>
                <ul>
                  <li>Project: ${projectTitle}</li>
                  <li>Refund Amount: ${currency} ${amount.toLocaleString()}</li>
                  ${refundReason ? `<li>Reason: ${refundReason}</li>` : ''}
                  <li>Processing Time: 5-10 business days</li>
                </ul>
              </div>
              
              <p>The refund will be credited to your original payment method within 5-10 business days, depending on your bank or payment provider.</p>
              
              <p>We're sorry to see this project didn't work out as planned. We hope you'll find other projects on our platform that inspire you!</p>
              
              <p>If you have any questions about this refund, please don't hesitate to contact our support team.</p>
              
              <p>Best regards,<br>The Give Platform Team</p>
            </div>
            <div class="footer">
              <p>This email confirms that your refund has been processed.</p>
              <p>For support, contact: support@give.platform</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Refund Processed

Dear ${donorName},

We've processed a refund of ${currency} ${amount.toLocaleString()} for your donation to ${projectTitle}.

Refund Details:
- Project: ${projectTitle}
- Refund Amount: ${currency} ${amount.toLocaleString()}
${refundReason ? `- Reason: ${refundReason}` : ''}
- Processing Time: 5-10 business days

The refund will be credited to your original payment method within 5-10 business days.

If you have any questions, please contact our support team.

Best regards,
The Give Platform Team
    `.trim()
  }
} 