import { PrivateStrapiClient } from "@/lib/strapi-api"
import { sendEmail } from "./send-email"

interface MilestoneEmailData {
  projectTitle: string
  projectUrl: string
  milestoneTitle: string
  milestoneDescription?: string
  targetAmount: number
  currentAmount: number
  currency: string
  creatorName: string
  creatorEmail: string
  backersCount: number
  percentageComplete: number
}

interface FundingGoalEmailData {
  projectTitle: string
  projectUrl: string
  fundingGoal: number
  currentFunding: number
  currency: string
  creatorName: string
  creatorEmail: string
  backersCount: number
  daysToComplete: number
  nextSteps?: string
}

// Email template for milestone reached
export function getMilestoneReachedTemplate(data: MilestoneEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Milestone Reached - ${data.projectTitle}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .milestone-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat { text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #4F46E5; }
        .stat-label { color: #666; font-size: 14px; }
        .button { display: inline-block; padding: 12px 30px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .celebration { text-align: center; font-size: 48px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Milestone Reached!</h1>
          <p style="font-size: 20px; margin: 0;">${data.projectTitle}</p>
        </div>
        
        <div class="content">
          <div class="celebration">🎯✨🎊</div>
          
          <p>Dear ${data.creatorName},</p>
          
          <p><strong>Congratulations!</strong> Your project has just reached an important milestone:</p>
          
          <div class="milestone-box">
            <h2 style="margin: 0 0 10px 0; color: #10b981;">${data.milestoneTitle}</h2>
            ${data.milestoneDescription ? `<p style="margin: 0;">${data.milestoneDescription}</p>` : ''}
            <p style="font-size: 18px; margin: 15px 0 0 0;">
              <strong>Target:</strong> ${formatCurrency(data.targetAmount, data.currency)} ✓
            </p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${formatCurrency(data.currentAmount, data.currency)}</div>
              <div class="stat-label">Total Raised</div>
            </div>
            <div class="stat">
              <div class="stat-value">${data.percentageComplete}%</div>
              <div class="stat-label">Complete</div>
            </div>
            <div class="stat">
              <div class="stat-value">${data.backersCount}</div>
              <div class="stat-label">Backers</div>
            </div>
          </div>
          
          <p>This is a significant achievement! Your backers are excited about your progress, and reaching this milestone shows the strong support for your project.</p>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Share this achievement with your backers through a project update</li>
            <li>Thank your supporters for helping you reach this milestone</li>
            <li>Keep the momentum going towards your next goal</li>
          </ul>
          
          <center>
            <a href="${data.projectUrl}" class="button">View Your Project</a>
          </center>
          
          <p>Keep up the amazing work!</p>
          
          <p>Best regards,<br>The Give Team</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Email template for funding goal reached
export function getFundingGoalReachedTemplate(data: FundingGoalEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Funding Goal Reached - ${data.projectTitle}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .success-box { background: #10b981; color: white; padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .stats { display: flex; justify-content: space-around; margin: 30px 0; background: white; padding: 20px; border-radius: 8px; }
        .stat { text-align: center; }
        .stat-value { font-size: 28px; font-weight: bold; color: #4F46E5; }
        .stat-label { color: #666; font-size: 14px; }
        .button { display: inline-block; padding: 14px 40px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .celebration { font-size: 64px; margin: 20px 0; }
        .timeline { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="celebration">🎉🎊🏆</div>
          <h1 style="margin: 10px 0; font-size: 36px;">CONGRATULATIONS!</h1>
          <p style="font-size: 24px; margin: 0;">Your project is fully funded!</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.creatorName},</p>
          
          <div class="success-box">
            <h2 style="margin: 0 0 10px 0; font-size: 28px;">${data.projectTitle}</h2>
            <p style="font-size: 20px; margin: 10px 0;">
              has reached its funding goal of
            </p>
            <p style="font-size: 36px; margin: 10px 0; font-weight: bold;">
              ${formatCurrency(data.fundingGoal, data.currency)}
            </p>
          </div>
          
          <p style="font-size: 18px; text-align: center;">
            <strong>You did it!</strong> Your project is now fully funded thanks to the incredible support of your backers.
          </p>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${formatCurrency(data.currentFunding, data.currency)}</div>
              <div class="stat-label">Total Raised</div>
            </div>
            <div class="stat">
              <div class="stat-value">${data.backersCount}</div>
              <div class="stat-label">Amazing Backers</div>
            </div>
            <div class="stat">
              <div class="stat-value">${data.daysToComplete}</div>
              <div class="stat-label">Days to Success</div>
            </div>
          </div>
          
          <div class="timeline">
            <h3 style="margin-top: 0;">What Happens Next?</h3>
            <ol>
              <li><strong>Thank your backers</strong> - Post an update to celebrate with your community</li>
              <li><strong>Keep the momentum</strong> - Consider stretch goals if you want to expand</li>
              <li><strong>Prepare for fulfillment</strong> - Start planning to deliver on your promises</li>
              <li><strong>Stay connected</strong> - Keep your backers updated on progress</li>
            </ol>
            ${data.nextSteps ? `<p><strong>Your notes:</strong> ${data.nextSteps}</p>` : ''}
          </div>
          
          <center>
            <a href="${data.projectUrl}" class="button">Go to Your Project</a>
          </center>
          
          <p>This is just the beginning of your journey. Your backers believe in your vision, and now it's time to bring it to life!</p>
          
          <p>We're here to support you every step of the way.</p>
          
          <p>Congratulations again!<br>The Give Team</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Daily progress summary email template
export function getDailyProgressTemplate(data: {
  projectTitle: string
  projectUrl: string
  todayDonations: number
  todayAmount: number
  totalAmount: number
  fundingGoal: number
  percentageComplete: number
  currency: string
  daysRemaining: number
  newBackers: string[]
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Daily Progress - ${data.projectTitle}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f3f4f6; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
        .progress-bar { background: #e5e7eb; height: 30px; border-radius: 15px; overflow: hidden; margin: 20px 0; }
        .progress-fill { background: #4F46E5; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .stat-box { background: #f9fafb; padding: 15px; border-radius: 8px; text-align: center; }
        .button { display: inline-block; padding: 10px 25px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">Daily Progress Report</h2>
          <p style="margin: 5px 0; color: #666;">${data.projectTitle}</p>
        </div>
        
        <div class="content">
          <h3>Today's Activity</h3>
          
          <div class="stats-grid">
            <div class="stat-box">
              <div style="font-size: 24px; font-weight: bold; color: #10b981;">
                ${data.todayDonations}
              </div>
              <div style="font-size: 14px; color: #666;">New Donations</div>
            </div>
            <div class="stat-box">
              <div style="font-size: 24px; font-weight: bold; color: #10b981;">
                ${formatCurrency(data.todayAmount, data.currency)}
              </div>
              <div style="font-size: 14px; color: #666;">Raised Today</div>
            </div>
          </div>
          
          <h3>Overall Progress</h3>
          
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${Math.min(data.percentageComplete, 100)}%;">
              ${data.percentageComplete}%
            </div>
          </div>
          
          <p style="text-align: center; margin: 10px 0;">
            <strong>${formatCurrency(data.totalAmount, data.currency)}</strong> of 
            ${formatCurrency(data.fundingGoal, data.currency)} goal
            • ${data.daysRemaining} days remaining
          </p>
          
          ${data.newBackers.length > 0 ? `
            <h3>New Backers Today</h3>
            <ul>
              ${data.newBackers.slice(0, 5).map(name => `<li>${name}</li>`).join('')}
              ${data.newBackers.length > 5 ? `<li>...and ${data.newBackers.length - 5} more!</li>` : ''}
            </ul>
          ` : ''}
          
          <center style="margin: 30px 0;">
            <a href="${data.projectUrl}" class="button">View Full Details</a>
          </center>
        </div>
      </div>
    </body>
    </html>
  `
}

// Helper function to format currency
function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Send milestone reached notification
export async function sendMilestoneReachedEmail(data: MilestoneEmailData) {
  const html = getMilestoneReachedTemplate(data)
  
  try {
    await sendEmail({
      to: data.creatorEmail,
      subject: `🎉 Milestone Reached: ${data.milestoneTitle} - ${data.projectTitle}`,
      html,
      text: `Congratulations! Your project "${data.projectTitle}" has reached the milestone: ${data.milestoneTitle}. Target amount of ${formatCurrency(data.targetAmount, data.currency)} has been achieved!`
    })
    
    console.log(`Milestone notification sent to ${data.creatorEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send milestone email:', error)
    return { success: false, error }
  }
}

// Send funding goal reached notification
export async function sendFundingGoalReachedEmail(data: FundingGoalEmailData) {
  const html = getFundingGoalReachedTemplate(data)
  
  try {
    await sendEmail({
      to: data.creatorEmail,
      subject: `🎊 Congratulations! ${data.projectTitle} is Fully Funded!`,
      html,
      text: `Amazing news! Your project "${data.projectTitle}" has reached its funding goal of ${formatCurrency(data.fundingGoal, data.currency)}! You now have ${data.backersCount} backers supporting your vision.`
    })
    
    console.log(`Funding goal notification sent to ${data.creatorEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send funding goal email:', error)
    return { success: false, error }
  }
}

// Send daily progress summary
export async function sendDailyProgressEmail(projectId: string) {
  try {
    // Get project data
    const project = await PrivateStrapiClient.findOne("projects", projectId, {
      populate: ["Creator", "Donations"]
    })
    
    if (!project.data || !project.data.Creator?.email) {
      console.error('Project or creator email not found')
      return { success: false, error: 'Invalid project data' }
    }
    
    // Calculate today's donations
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayDonations = project.data.Donations?.filter(d => {
      const donationDate = new Date(d.createdAt)
      return donationDate >= today && d.PaymentStatus === 'completed'
    }) || []
    
    const todayAmount = todayDonations.reduce((sum, d) => sum + (d.Amount || 0), 0)
    const newBackers = todayDonations
      .filter(d => !d.IsAnonymous)
      .map(d => d.Name || 'Anonymous')
    
    // Calculate days remaining
    const endDate = new Date(project.data.EndDate)
    const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    
    const emailData = {
      projectTitle: project.data.Title,
      projectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project.data.Slug}`,
      todayDonations: todayDonations.length,
      todayAmount,
      totalAmount: project.data.CurrentFunding || 0,
      fundingGoal: project.data.FundingGoal || 0,
      percentageComplete: Math.round(((project.data.CurrentFunding || 0) / (project.data.FundingGoal || 1)) * 100),
      currency: project.data.Currency || 'USD',
      daysRemaining,
      newBackers
    }
    
    const html = getDailyProgressTemplate(emailData)
    
    await sendEmail({
      to: project.data.Creator.email,
      subject: `Daily Progress Report: ${project.data.Title}`,
      html,
      text: `Today's progress for ${project.data.Title}: ${todayDonations.length} new donations totaling ${formatCurrency(todayAmount, project.data.Currency)}. Total raised: ${formatCurrency(project.data.CurrentFunding, project.data.Currency)} (${emailData.percentageComplete}% of goal).`
    })
    
    console.log(`Daily progress email sent for project ${projectId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send daily progress email:', error)
    return { success: false, error }
  }
} 