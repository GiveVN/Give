interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface ProjectUpdateEmailData {
  projectTitle: string
  projectSlug: string
  updateTitle: string
  updateExcerpt: string
  projectOwner: string
  updateUrl: string
  donorName?: string
}

export function getProjectUpdateNotificationEmail(
  data: ProjectUpdateEmailData
): EmailTemplate {
  const {
    projectTitle,
    updateTitle,
    updateExcerpt,
    projectOwner,
    updateUrl,
    donorName,
  } = data

  return {
    subject: `📢 New Update: ${updateTitle} - ${projectTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Project Update</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 32px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 32px;
              padding-bottom: 24px;
              border-bottom: 2px solid #e5e7eb;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #059669;
              margin-bottom: 8px;
            }
            .subtitle {
              color: #6b7280;
              font-size: 16px;
            }
            .update-badge {
              display: inline-block;
              background: linear-gradient(135deg, #059669 0%, #047857 100%);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 24px;
            }
            .project-title {
              font-size: 24px;
              font-weight: bold;
              color: #111827;
              margin-bottom: 8px;
            }
            .update-title {
              font-size: 20px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 16px;
            }
            .update-excerpt {
              background: #f3f4f6;
              padding: 20px;
              border-radius: 8px;
              font-size: 16px;
              line-height: 1.7;
              margin-bottom: 24px;
              border-left: 4px solid #059669;
            }
            .author {
              display: flex;
              align-items: center;
              margin-bottom: 24px;
              padding: 16px;
              background: #f9fafb;
              border-radius: 8px;
            }
            .author-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: #059669;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              margin-right: 12px;
            }
            .author-info {
              flex: 1;
            }
            .author-name {
              font-weight: 600;
              color: #111827;
              margin-bottom: 2px;
            }
            .author-label {
              color: #6b7280;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #059669 0%, #047857 100%);
              color: white !important;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              text-align: center;
              box-shadow: 0 4px 14px 0 rgba(5, 150, 105, 0.39);
              transition: all 0.3s ease;
            }
            .cta-button:hover {
              background: linear-gradient(135deg, #047857 0%, #065f46 100%);
              transform: translateY(-1px);
            }
            .footer {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
            .footer a {
              color: #059669;
              text-decoration: none;
            }
            .greeting {
              font-size: 18px;
              margin-bottom: 20px;
              color: #374151;
            }
            .divider {
              height: 1px;
              background: linear-gradient(to right, transparent, #e5e7eb, transparent);
              margin: 24px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Give</div>
              <div class="subtitle">Empowering Communities Through Giving</div>
            </div>

            <div class="greeting">
              ${donorName ? `Hi ${donorName}!` : "Hello!"}
            </div>

            <div class="update-badge">
              📢 Project Update
            </div>

            <div class="project-title">${projectTitle}</div>
            
            <div class="update-title">${updateTitle}</div>

            <div class="update-excerpt">
              ${updateExcerpt}
            </div>

            <div class="author">
              <div class="author-avatar">
                ${projectOwner.charAt(0).toUpperCase()}
              </div>
              <div class="author-info">
                <div class="author-name">${projectOwner}</div>
                <div class="author-label">Project Creator</div>
              </div>
            </div>

            <div class="divider"></div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${updateUrl}" class="cta-button">
                📖 Read Full Update
              </a>
            </div>

            <div class="footer">
              <p>
                Thank you for supporting this project! Your contribution is making a real difference.
              </p>
              <p>
                <a href="${updateUrl}">View all project updates</a> | 
                <a href="mailto:support@give.local">Contact Support</a>
              </p>
              <p style="margin-top: 16px; color: #9ca3af;">
                You're receiving this email because you've donated to this project and have email notifications enabled.
                <br>
                <a href="#" style="color: #9ca3af;">Unsubscribe from project updates</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Project Update: ${updateTitle}

Project: ${projectTitle}
By: ${projectOwner}

${updateExcerpt}

Read the full update: ${updateUrl}

Thank you for supporting this project! Your contribution is making a real difference.

---
Give Platform - Empowering Communities Through Giving
    `.trim(),
  }
}

// Helper function to generate update notification for multiple recipients
export function generateUpdateNotificationData(
  projectData: any,
  updateData: any,
  donorEmail: string,
  donorName?: string
): ProjectUpdateEmailData {
  return {
    projectTitle: projectData.Title || projectData.title,
    projectSlug: projectData.Slug || projectData.slug,
    updateTitle: updateData.Title || updateData.title,
    updateExcerpt:
      updateData.Excerpt ||
      updateData.excerpt ||
      updateData.Content?.substring(0, 300) + "...",
    projectOwner:
      projectData.Owner?.username ||
      projectData.Owner?.email ||
      "Project Creator",
    updateUrl: `${process.env.FRONTEND_URL || "http://localhost:3003"}/projects/${projectData.Slug || projectData.slug}#updates`,
    donorName: donorName,
  }
}

// Helper to get update statistics
export function getUpdateStats(updateData: any) {
  return {
    wordCount: updateData.Content?.split(" ").length || 0,
    readingTime: Math.ceil((updateData.Content?.split(" ").length || 0) / 200), // ~200 words per minute
    hasImages: updateData.Images && updateData.Images.length > 0,
    imageCount: updateData.Images?.length || 0,
    isPinned: updateData.IsPinned || false,
    isPublic: updateData.IsPublic !== false,
  }
}
