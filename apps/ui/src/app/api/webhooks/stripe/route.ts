import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

import { sendDonationReceipt } from "@/lib/email/donation-receipt"
import {
  sendFundingGoalReachedEmail,
  sendMilestoneReachedEmail,
} from "@/lib/email/milestone-notifications"
import { PrivateStrapiClient } from "@/lib/strapi-api"
import { stripe } from "@/lib/stripe"

// Stripe webhook secret (set in environment variables)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    console.log(`Webhook received: ${event.type}`)

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        )
        break

      case "payment_intent.succeeded":
        await handlePaymentSuccess(event.data.object)
        break

      case "payment_intent.payment_failed":
        await handlePaymentFailure(event.data.object)
        break

      case "charge.refunded":
        await handleRefund(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    )
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    console.log(`Processing checkout session: ${session.id}`)

    // Find donation by session ID
    const donations = await PrivateStrapiClient.find("donations", {
      filters: {
        PaymentId: { $eq: session.id },
      },
      populate: ["Project"],
    })

    if (!donations.data || donations.data.length === 0) {
      console.error("No donation found for session:", session.id)
      return
    }

    const donation = donations.data[0]

    // Update donation status to completed
    await PrivateStrapiClient.update("donations", donation.id, {
      data: {
        PaymentStatus: "completed",
        TransactionDate: new Date().toISOString(),
      },
    })

    // Update project funding
    const project = donation.Project
    if (project) {
      const currentFunding = project.CurrentFunding || 0
      const backersCount = project.BackersCount || 0

      const updateResponse = await PrivateStrapiClient.update(
        "projects",
        project.id,
        {
          data: {
            CurrentFunding: currentFunding + donation.Amount,
            BackersCount: backersCount + 1,
          },
        }
      )

      console.log("Project funding updated:", {
        projectId: project.id,
        newFunding: currentFunding + donation.Amount,
        newBackersCount: backersCount + 1,
      })

      // Get full project data with Creator relation
      const fullProject = await PrivateStrapiClient.findOne(
        "projects",
        project.id,
        {
          populate: ["Creator", "GoalMilestones"],
        }
      )

      if (!fullProject?.data) {
        console.error("Could not fetch full project data")
        return
      }

      // Check if any milestones were reached
      if (
        fullProject.data.GoalMilestones &&
        fullProject.data.GoalMilestones.length > 0
      ) {
        for (const milestone of fullProject.data.GoalMilestones) {
          if (
            !milestone.IsReached &&
            currentFunding + donation.Amount >= milestone.TargetAmount
          ) {
            // Mark milestone as reached
            const updatedMilestones = fullProject.data.GoalMilestones.map(
              (m) =>
                m.id === milestone.id
                  ? {
                      ...m,
                      IsReached: true,
                      ReachedAt: new Date().toISOString(),
                    }
                  : m
            )

            await PrivateStrapiClient.update("projects", project.id, {
              data: {
                GoalMilestones: updatedMilestones,
              },
            })

            // Send milestone reached email
            if (fullProject.data.Creator?.email) {
              await sendMilestoneReachedEmail({
                projectTitle: fullProject.data.Title,
                projectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${fullProject.data.Slug}`,
                milestoneTitle: milestone.Title,
                milestoneDescription: milestone.Description,
                targetAmount: milestone.TargetAmount,
                currentAmount: currentFunding + donation.Amount,
                currency: fullProject.data.Currency || "USD",
                creatorName: fullProject.data.Creator.username || "Creator",
                creatorEmail: fullProject.data.Creator.email,
                backersCount: backersCount + 1,
                percentageComplete: Math.round(
                  ((currentFunding + donation.Amount) /
                    (fullProject.data.FundingGoal || 1)) *
                    100
                ),
              })
            }
          }
        }
      }

      // Check if funding goal was reached
      if (
        fullProject.data.FundingGoal &&
        currentFunding < fullProject.data.FundingGoal &&
        currentFunding + donation.Amount >= fullProject.data.FundingGoal
      ) {
        // Send funding goal reached email
        if (fullProject.data.Creator?.email) {
          const startDate = new Date(
            fullProject.data.StartDate || fullProject.data.createdAt
          )
          const daysToComplete = Math.ceil(
            (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          )

          await sendFundingGoalReachedEmail({
            projectTitle: fullProject.data.Title,
            projectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${fullProject.data.Slug}`,
            fundingGoal: fullProject.data.FundingGoal,
            currentFunding: currentFunding + donation.Amount,
            currency: fullProject.data.Currency || "USD",
            creatorName: fullProject.data.Creator.username || "Creator",
            creatorEmail: fullProject.data.Creator.email,
            backersCount: backersCount + 1,
            daysToComplete,
            nextSteps: fullProject.data.EnableStretchGoals
              ? "Consider adding stretch goals to keep the momentum going!"
              : undefined,
          })
        }
      }
    }

    // Send receipt email
    const email =
      session.customer_email || session.metadata?.email || donation.Email
    if (email) {
      await sendDonationReceipt(email, {
        ...donation,
        Project: project || donation.Project,
      })
    }

    console.log(`Checkout session completed for donation ${donation.id}`)
  } catch (error) {
    console.error("Error handling checkout session:", error)
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  try {
    // Extract donation ID from metadata
    const donationId = paymentIntent.metadata?.donationId
    if (!donationId) {
      console.error("No donation ID in payment metadata")
      return
    }

    // Update donation status
    const donation = await PrivateStrapiClient.update("donations", donationId, {
      data: {
        PaymentStatus: "completed",
        PaymentId: paymentIntent.id,
      },
    })

    if (!donation?.data) {
      console.error("Donation not found:", donationId)
      return
    }

    // Get full donation data with relations
    const fullDonation = await PrivateStrapiClient.findOne(
      "donations",
      donationId,
      {
        populate: ["Project", "Giver"],
      }
    )

    // Update project funding
    const project = fullDonation.data.Project
    if (project) {
      const currentFunding = project.CurrentFunding || 0
      const backersCount = project.BackersCount || 0

      const updateResponse = await PrivateStrapiClient.update(
        "projects",
        project.id,
        {
          data: {
            CurrentFunding: currentFunding + fullDonation.data.Amount,
            BackersCount: backersCount + 1,
          },
        }
      )

      console.log("Project funding updated:", {
        projectId: project.id,
        newFunding: currentFunding + fullDonation.data.Amount,
        newBackersCount: backersCount + 1,
      })

      // Get full project data with Creator relation
      const fullProject = await PrivateStrapiClient.findOne(
        "projects",
        project.id,
        {
          populate: ["Creator", "GoalMilestones"],
        }
      )

      if (!fullProject?.data) {
        console.error("Could not fetch full project data")
        return
      }

      // Check if any milestones were reached
      if (
        fullProject.data.GoalMilestones &&
        fullProject.data.GoalMilestones.length > 0
      ) {
        for (const milestone of fullProject.data.GoalMilestones) {
          if (
            !milestone.IsReached &&
            currentFunding + fullDonation.data.Amount >= milestone.TargetAmount
          ) {
            // Mark milestone as reached
            const updatedMilestones = fullProject.data.GoalMilestones.map(
              (m: any) =>
                m.id === milestone.id
                  ? {
                      ...m,
                      IsReached: true,
                      ReachedAt: new Date().toISOString(),
                    }
                  : m
            )

            await PrivateStrapiClient.update("projects", project.id, {
              data: {
                GoalMilestones: updatedMilestones,
              },
            })

            // Send milestone reached email
            if (fullProject.data.Creator?.email) {
              await sendMilestoneReachedEmail({
                projectTitle: fullProject.data.Title,
                projectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${fullProject.data.Slug}`,
                milestoneTitle: milestone.Title,
                milestoneDescription: milestone.Description,
                targetAmount: milestone.TargetAmount,
                currentAmount: currentFunding + fullDonation.data.Amount,
                currency: fullProject.data.Currency || "USD",
                creatorName: fullProject.data.Creator.username || "Creator",
                creatorEmail: fullProject.data.Creator.email,
                backersCount: backersCount + 1,
                percentageComplete: Math.round(
                  ((currentFunding + fullDonation.data.Amount) /
                    (fullProject.data.FundingGoal || 1)) *
                    100
                ),
              })
            }
          }
        }
      }

      // Check if funding goal was reached
      if (
        fullProject.data.FundingGoal &&
        currentFunding < fullProject.data.FundingGoal &&
        currentFunding + fullDonation.data.Amount >=
          fullProject.data.FundingGoal
      ) {
        // Send funding goal reached email
        if (fullProject.data.Creator?.email) {
          const startDate = new Date(
            fullProject.data.StartDate || fullProject.data.createdAt
          )
          const daysToComplete = Math.ceil(
            (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          )

          await sendFundingGoalReachedEmail({
            projectTitle: fullProject.data.Title,
            projectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${fullProject.data.Slug}`,
            fundingGoal: fullProject.data.FundingGoal,
            currentFunding: currentFunding + fullDonation.data.Amount,
            currency: fullProject.data.Currency || "USD",
            creatorName: fullProject.data.Creator.username || "Creator",
            creatorEmail: fullProject.data.Creator.email,
            backersCount: backersCount + 1,
            daysToComplete,
            nextSteps: fullProject.data.EnableStretchGoals
              ? "Consider adding stretch goals to keep the momentum going!"
              : undefined,
          })
        }
      }
    }

    // Send email receipt
    const email =
      paymentIntent.metadata?.email || fullDonation.data.Giver?.email
    if (email) {
      await sendDonationReceipt(email, fullDonation.data)
    }

    console.log(`Payment successful for donation ${donationId}`)
  } catch (error) {
    console.error("Error handling payment success:", error)
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  try {
    const donationId = paymentIntent.metadata?.donationId
    if (!donationId) return

    // Update donation status to failed
    await PrivateStrapiClient.update("donations", donationId, {
      data: {
        PaymentStatus: "failed",
      },
    })

    console.log(`Payment failed for donation ${donationId}`)
  } catch (error) {
    console.error("Error handling payment failure:", error)
  }
}

async function handleRefund(charge: any) {
  try {
    // Find donation by payment ID
    const donations = await PrivateStrapiClient.find("donations", {
      filters: {
        PaymentId: { $eq: charge.payment_intent },
      },
      populate: ["Project", "Giver"],
    })

    if (!donations.data || donations.data.length === 0) {
      console.error("No donation found for payment:", charge.payment_intent)
      return
    }

    const donation = donations.data[0]

    // Update donation status
    await PrivateStrapiClient.update("donations", donation.id, {
      data: {
        PaymentStatus: "refunded",
      },
    })

    // Update project funding (subtract refunded amount)
    const project = donation.Project
    if (project) {
      const currentFunding = project.CurrentFunding || 0
      const backersCount = project.BackersCount || 0

      const updateResponse = await PrivateStrapiClient.update(
        "projects",
        project.id,
        {
          data: {
            CurrentFunding: Math.max(0, currentFunding - donation.Amount),
            BackersCount: Math.max(0, backersCount - 1),
          },
        }
      )

      console.log("Project funding updated after refund:", {
        projectId: project.id,
        newFunding: Math.max(0, currentFunding - donation.Amount),
        newBackersCount: Math.max(0, backersCount - 1),
      })
    }

    // Send refund notification
    const email = donation.Giver?.email || charge.metadata?.email
    if (email) {
      const { sendRefundNotification } = await import(
        "@/lib/email/donation-receipt"
      )
      await sendRefundNotification(
        email,
        donation,
        "Refund processed successfully"
      )
    }

    console.log(`Refund processed for donation ${donation.id}`)
  } catch (error) {
    console.error("Error handling refund:", error)
  }
}
