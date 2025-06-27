"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"
import { PublicStrapiClient } from "@/lib/strapi-api"

interface DonationSummaryProps {
  projectId: string
  fundingGoal?: number
  currency?: string
}

interface DonationStats {
  totalAmount: number
  totalDonations: number
  averageDonation: number
  largestDonation: number
  recentDonations: number
}

export default function DonationSummary({ 
  projectId, 
  fundingGoal = 10000,
  currency = "USD" 
}: DonationSummaryProps) {
  const [stats, setStats] = useState<DonationStats>({
    totalAmount: 0,
    totalDonations: 0,
    averageDonation: 0,
    largestDonation: 0,
    recentDonations: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDonationStats()
  }, [projectId])

  const fetchDonationStats = async () => {
    try {
      setIsLoading(true)
      
      // Fetch all completed donations for this project
      const response = await PublicStrapiClient.fetchAPI(
        `/donations?filters[Project][id][$eq]=${projectId}&filters[PaymentStatus][$eq]=completed&fields[0]=Amount&fields[1]=createdAt`
      )
      
      if (response.data) {
        const donations = response.data
        const now = new Date()
        const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        
        // Calculate stats
        const totalAmount = donations.reduce((sum: number, d: any) => 
          sum + parseFloat(d.attributes.Amount), 0
        )
        const totalDonations = donations.length
        const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0
        const largestDonation = Math.max(...donations.map((d: any) => 
          parseFloat(d.attributes.Amount)
        ), 0)
        const recentDonations = donations.filter((d: any) => 
          new Date(d.attributes.createdAt) > dayAgo
        ).length
        
        setStats({
          totalAmount,
          totalDonations,
          averageDonation,
          largestDonation,
          recentDonations,
        })
      }
    } catch (err) {
      console.error("Failed to fetch donation stats:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fundingPercentage = (stats.totalAmount / fundingGoal) * 100

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Funding Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(stats.totalAmount, currency)} raised</span>
              <span>{formatCurrency(fundingGoal, currency)} goal</span>
            </div>
            <Progress value={Math.min(fundingPercentage, 100)} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {fundingPercentage.toFixed(1)}% funded
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalAmount, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {fundingPercentage > 100 ? "+" : ""}{(fundingPercentage - 100).toFixed(1)}% of goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Backers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDonations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.recentDonations} in last 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.averageDonation, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              per backer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Donation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.largestDonation, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              highest contribution
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 