"use client"

import { useState } from "react"
import { Bookmark, Calendar, Heart, Share2, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface ProjectDetailSidebarProps {
  project: {
    id: string
    Title: string
    FundingGoal?: number
    CurrentFunding?: number
    BackersCount?: number
    DaysLeft?: number
    CreatedBy?: string
    Rewards?: Array<{
      id: number
      Title: string
      Description: string
      Amount: number
      Currency: string
      EstimatedDelivery?: string
      LimitedQuantity?: number
      ClaimedQuantity: number
      IsActive: boolean
      Image?: {
        url: string
        alternativeText?: string
      }
    }>
  }
}

export function ProjectDetailSidebar({ project }: ProjectDetailSidebarProps) {
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [customAmount, setCustomAmount] = useState<string>("")

  // Use real rewards from Strapi or fallback to mock data
  const rewardTiers =
    project.Rewards && project.Rewards.length > 0
      ? project.Rewards.filter((reward) => reward.IsActive).map((reward) => ({
          id: reward.id.toString(),
          amount: reward.Amount,
          title: reward.Title,
          description: reward.Description,
          deliveryDate: reward.EstimatedDelivery
            ? new Date(reward.EstimatedDelivery).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "March 2025",
          backers: reward.ClaimedQuantity || 0,
          available:
            !reward.LimitedQuantity ||
            reward.ClaimedQuantity < reward.LimitedQuantity,
          estimated: "Estimated delivery",
          includes: [], // TODO: Add includes field to Strapi rewards schema
          currency: reward.Currency || "USD",
        }))
      : [
          // Fallback mock data when no Strapi rewards
          {
            id: "1",
            amount: 25,
            title: "Early Bird Special",
            description:
              "Get the project at a discounted price. Includes digital thank you and updates.",
            deliveryDate: "March 2025",
            backers: 127,
            available: true,
            estimated: "Estimated delivery",
            includes: ["Digital thank you", "Project updates", "Early access"],
            currency: "USD",
          },
          {
            id: "2",
            amount: 50,
            title: "Standard Package",
            description:
              "Full project package with all basic features and benefits.",
            deliveryDate: "March 2025",
            backers: 89,
            available: true,
            estimated: "Estimated delivery",
            includes: [
              "Complete project",
              "Digital materials",
              "Community access",
            ],
            currency: "USD",
          },
          {
            id: "3",
            amount: 100,
            title: "Premium Package",
            description:
              "Premium package with exclusive content and priority support.",
            deliveryDate: "February 2025",
            backers: 42,
            available: true,
            estimated: "Estimated delivery",
            includes: [
              "Everything in Standard",
              "Premium features",
              "Priority support",
              "Exclusive content",
            ],
            currency: "USD",
          },
          {
            id: "4",
            amount: 200,
            title: "Deluxe Package",
            description:
              "Deluxe package with all premium features plus exclusive merchandise and physical rewards.",
            deliveryDate: "January 2025",
            backers: 23,
            available: true,
            estimated: "Estimated delivery",
            includes: [
              "Everything in Premium",
              "Physical merchandise",
              "Exclusive t-shirt",
              "Signed certificate",
              "VIP support",
            ],
            currency: "USD",
          },
          {
            id: "5",
            amount: 500,
            title: "Ultimate Supporter",
            description:
              "Ultimate supporter package with lifetime access and special recognition.",
            deliveryDate: "December 2024",
            backers: 8,
            available: true,
            estimated: "Estimated delivery",
            includes: [
              "Everything in Deluxe",
              "Lifetime access",
              "Special recognition",
              "Private Discord channel",
              "1-on-1 consultation",
              "Custom feature request",
            ],
            currency: "USD",
          },
          {
            id: "6",
            amount: 1000,
            title: "Corporate Sponsor",
            description:
              "Corporate sponsorship tier with company logo placement and custom integration options.",
            deliveryDate: "November 2024",
            backers: 2,
            available: true,
            estimated: "Estimated delivery",
            includes: [
              "Everything in Ultimate",
              "Company logo placement",
              "Custom integration",
              "Dedicated support team",
              "Priority feature development",
              "Annual partnership review",
            ],
            currency: "USD",
          },
        ]

  const handleBack = (amount: number) => {
    // In real app, this would handle the backing process
    console.log(`Backing project with $${amount}`)
  }

  const handleCustomPledge = () => {
    const amount = parseFloat(customAmount)
    if (amount && amount > 0) {
      handleBack(amount)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.Title,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="sticky top-6 h-fit max-h-[calc(100vh-3rem)] overflow-hidden">
      {/* Single Scrollable Container for Everything */}
      <div className="scrollbar-thin flex max-h-[calc(100vh-6rem)] flex-col space-y-4 overflow-y-auto pr-2">
        {/* Support this project header */}
        <div className="flex-shrink-0">
          <h3 className="mb-3 text-lg font-semibold">Support this project</h3>
        </div>

        {/* Custom Pledge - Top Priority (Kickstarter Style) */}
        <div className="flex-shrink-0">
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="mb-3">
                <h4 className="font-semibold text-blue-900">
                  Make a pledge without a reward
                </h4>
                <p className="text-sm text-blue-700">
                  Back it because you believe in it.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    min="1"
                  />
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                  onClick={handleCustomPledge}
                  disabled={!customAmount || parseFloat(customAmount) <= 0}
                >
                  <Heart className="mr-1 h-3 w-3" />
                  Pledge
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Header */}
        <div className="flex-shrink-0">
          <h4 className="text-base font-medium text-gray-700">
            Or choose a reward
          </h4>
        </div>

        {/* Rewards List */}
        <div className="flex-shrink-0 space-y-4">
          {rewardTiers.map((reward) => (
            <Card
              key={reward.id}
              className={`cursor-pointer transition-all ${
                selectedReward === reward.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedReward(reward.id)}
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold">
                      {reward.currency === "USD"
                        ? "$"
                        : reward.currency === "EUR"
                          ? "€"
                          : reward.currency === "GBP"
                            ? "£"
                            : "$"}
                      {reward.amount}
                    </div>
                    <div className="text-sm font-medium">{reward.title}</div>
                  </div>
                  {reward.available && (
                    <Badge
                      variant="outline"
                      className="border-green-200 text-green-600"
                    >
                      Available
                    </Badge>
                  )}
                </div>

                <p
                  className="mb-3 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: reward.description.replace(/\n/g, "<br />"),
                  }}
                />

                {/* Includes */}
                <div className="mb-3 space-y-1">
                  {reward.includes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Delivery & Backers */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {reward.estimated} {reward.deliveryDate}
                  </div>
                  <div>{reward.backers} backers</div>
                </div>

                {/* Pledge Button */}
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBack(reward.amount)
                    }}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Pledge{" "}
                    {reward.currency === "USD"
                      ? "US$"
                      : reward.currency === "EUR"
                        ? "€"
                        : reward.currency === "GBP"
                          ? "£"
                          : "US$"}{" "}
                    {reward.amount.toLocaleString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
