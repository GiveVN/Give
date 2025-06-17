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
      title: string
      description: string
      amount: number
      currency: string
      estimatedDelivery?: string
      limitedQuantity?: number
      claimedQuantity: number
      isActive: boolean
      image?: {
        url: string
        alternativeText?: string
      }
    }>
  }
}

export function ProjectDetailSidebar({ project }: ProjectDetailSidebarProps) {
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Use real rewards from Strapi or fallback to mock data
  const rewardTiers = project.Rewards && project.Rewards.length > 0 
    ? project.Rewards.filter(reward => reward.isActive).map(reward => ({
        id: reward.id.toString(),
        amount: reward.amount,
        title: reward.title,
        description: reward.description,
        deliveryDate: reward.estimatedDelivery ? new Date(reward.estimatedDelivery).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "March 2025",
        backers: reward.claimedQuantity || 0,
        available: !reward.limitedQuantity || reward.claimedQuantity < reward.limitedQuantity,
        estimated: "Estimated delivery",
        includes: [], // TODO: Add includes field to Strapi rewards schema
        currency: reward.currency || 'USD'
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
          currency: "USD"
        },
        {
          id: "2", 
          amount: 50,
          title: "Standard Package",
          description: "Full project package with all basic features and benefits.",
          deliveryDate: "March 2025",
          backers: 89,
          available: true,
          estimated: "Estimated delivery",
          includes: ["Complete project", "Digital materials", "Community access"],
          currency: "USD"
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
          currency: "USD"
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
          currency: "USD"
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
          currency: "USD"
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
          currency: "USD"
        },
      ]

  const handleBack = (amount: number) => {
    // In real app, this would handle the backing process
    console.log(`Backing project with $${amount}`)
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
      {/* Scrollable Rewards Section */}
      <div className="flex flex-col overflow-hidden">
        {/* Reward Tiers Header */}
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold">Choose your reward</h3>
        </div>

        {/* Scrollable Rewards Container */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px] scrollbar-thin">
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
                      {reward.currency === 'USD' ? '$' : reward.currency === 'EUR' ? '€' : reward.currency === 'GBP' ? '£' : '$'}{reward.amount}
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
                    __html: reward.description.replace(/\n/g, '<br />') 
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fixed Bottom Actions */}
        <div className="mt-4 flex-shrink-0 space-y-4">
          {/* Back Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              const reward = rewardTiers.find((r) => r.id === selectedReward)
              if (reward) {
                handleBack(reward.amount)
              }
            }}
            disabled={!selectedReward}
          >
            {selectedReward ? (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Back this project
              </>
            ) : (
              "Select a reward"
            )}
          </Button>

          {/* Custom Amount */}
          <div className="border-t pt-4">
            <div className="mb-2 text-sm text-gray-600">
              Or make a custom pledge
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                min="1"
              />
              <Button variant="outline" size="sm">
                Pledge
              </Button>
            </div>
          </div>

          {/* Project Stats */}
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Backers</span>
                <span className="font-medium">{project.BackersCount || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Days Remaining</span>
                <span className="font-medium">{project.DaysLeft || 30}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Funding</span>
                <span className="font-medium">
                  ${(project.CurrentFunding || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Funding Goal</span>
                <span className="font-medium">
                  ${(project.FundingGoal || 0).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
