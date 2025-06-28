import { NextRequest, NextResponse } from "next/server"
import { PrivateStrapiClient } from "@/lib/strapi-api"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'
    const projectId = params.id

    // Get project with donations
    const project = await PrivateStrapiClient.findOne("projects", projectId, {
      populate: ["Donations", "Creator", "GoalMilestones"]
    })

    if (!project?.data) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (range) {
      case '24h':
        startDate.setHours(now.getHours() - 24)
        break
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case 'all':
        startDate = new Date(project.data.createdAt)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Filter donations by date range and completed status
    const donations = (project.data.Donations || []).filter(d => {
      const donationDate = new Date(d.createdAt)
      return donationDate >= startDate && d.PaymentStatus === 'completed'
    })

    // Calculate overview metrics
    const totalRaised = donations.reduce((sum, d) => sum + (d.Amount || 0), 0)
    const totalBackers = donations.length
    const averageDonation = totalBackers > 0 ? totalRaised / totalBackers : 0
    const fundingGoal = project.data.FundingGoal || 1
    const fundingProgress = totalRaised / fundingGoal
    
    const projectStartDate = new Date(project.data.createdAt)
    const daysActive = Math.max(1, Math.ceil((now.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24)))
    const dailyAverage = totalRaised / daysActive
    
    // Simple projection based on current rate
    const projectedTotal = dailyAverage * daysActive * 1.5 // Assume 50% growth

    // Group donations by date for trends
    const donationsByDate = new Map()
    donations.forEach(d => {
      const date = new Date(d.createdAt).toISOString().split('T')[0]
      if (!donationsByDate.has(date)) {
        donationsByDate.set(date, { amount: 0, count: 0 })
      }
      const existing = donationsByDate.get(date)
      existing.amount += d.Amount || 0
      existing.count += 1
    })

    // Create timeline data
    const timelineData = []
    let cumulative = 0
    const sortedDates = Array.from(donationsByDate.keys()).sort()
    
    for (const date of sortedDates) {
      const data = donationsByDate.get(date)
      cumulative += data.amount
      timelineData.push({
        date,
        amount: data.amount,
        count: data.count,
        cumulative
      })
    }

    // Group by hour of day
    const hourlyData = new Array(24).fill(0).map((_, hour) => ({ hour, amount: 0, count: 0 }))
    donations.forEach(d => {
      const hour = new Date(d.createdAt).getHours()
      hourlyData[hour].amount += d.Amount || 0
      hourlyData[hour].count += 1
    })

    // Group by day of week
    const weeklyData = [
      { day: 'Mon', amount: 0, count: 0 },
      { day: 'Tue', amount: 0, count: 0 },
      { day: 'Wed', amount: 0, count: 0 },
      { day: 'Thu', amount: 0, count: 0 },
      { day: 'Fri', amount: 0, count: 0 },
      { day: 'Sat', amount: 0, count: 0 },
      { day: 'Sun', amount: 0, count: 0 }
    ]
    
    donations.forEach(d => {
      const dayIndex = (new Date(d.createdAt).getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
      weeklyData[dayIndex].amount += d.Amount || 0
      weeklyData[dayIndex].count += 1
    })

    // Donation size distribution
    const sizeRanges = [
      { range: '$1-$25', min: 1, max: 25, count: 0, total: 0 },
      { range: '$26-$100', min: 26, max: 100, count: 0, total: 0 },
      { range: '$101-$500', min: 101, max: 500, count: 0, total: 0 },
      { range: '$501-$1000', min: 501, max: 1000, count: 0, total: 0 },
      { range: '$1000+', min: 1001, max: Infinity, count: 0, total: 0 }
    ]

    donations.forEach(d => {
      const amount = d.Amount || 0
      const range = sizeRanges.find(r => amount >= r.min && amount <= r.max)
      if (range) {
        range.count += 1
        range.total += amount
      }
    })

    // Calculate percentages
    sizeRanges.forEach(range => {
      range.percentage = totalBackers > 0 ? Math.round((range.count / totalBackers) * 100) : 0
    })

    // Mock geographic and device data (you can enhance this with real data)
    const geographic = [
      { country: 'United States', count: Math.floor(totalBackers * 0.4), amount: Math.floor(totalRaised * 0.4) },
      { country: 'Canada', count: Math.floor(totalBackers * 0.2), amount: Math.floor(totalRaised * 0.2) },
      { country: 'United Kingdom', count: Math.floor(totalBackers * 0.15), amount: Math.floor(totalRaised * 0.15) },
      { country: 'Germany', count: Math.floor(totalBackers * 0.1), amount: Math.floor(totalRaised * 0.1) },
      { country: 'Australia', count: Math.floor(totalBackers * 0.08), amount: Math.floor(totalRaised * 0.08) },
      { country: 'France', count: Math.floor(totalBackers * 0.07), amount: Math.floor(totalRaised * 0.07) }
    ]

    const devices = [
      { type: 'Desktop', count: Math.floor(totalBackers * 0.6), percentage: 60 },
      { type: 'Mobile', count: Math.floor(totalBackers * 0.35), percentage: 35 },
      { type: 'Tablet', count: Math.floor(totalBackers * 0.05), percentage: 5 }
    ]

    // Process milestones
    const milestones = (project.data.GoalMilestones || []).map(m => ({
      title: m.Title,
      target: m.TargetAmount,
      reached: m.IsReached,
      date: m.ReachedAt,
      daysToReach: m.ReachedAt ? Math.ceil((new Date(m.ReachedAt).getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24)) : undefined
    }))

    // Mock traffic sources and top backers
    const sources = [
      { source: 'Direct', visits: Math.floor(totalBackers * 2.5), conversions: Math.floor(totalBackers * 0.4), amount: Math.floor(totalRaised * 0.4) },
      { source: 'Social Media', visits: Math.floor(totalBackers * 3), conversions: Math.floor(totalBackers * 0.3), amount: Math.floor(totalRaised * 0.3) },
      { source: 'Search', visits: Math.floor(totalBackers * 2), conversions: Math.floor(totalBackers * 0.2), amount: Math.floor(totalRaised * 0.2) },
      { source: 'Email', visits: Math.floor(totalBackers * 1.5), conversions: Math.floor(totalBackers * 0.1), amount: Math.floor(totalRaised * 0.1) }
    ]

    const topBackers = donations
      .sort((a, b) => (b.Amount || 0) - (a.Amount || 0))
      .slice(0, 10)
      .map(d => ({
        name: d.IsAnonymous ? 'Anonymous' : (d.Name || 'Anonymous'),
        amount: d.Amount || 0,
        date: d.createdAt
      }))

    const analyticsData = {
      overview: {
        totalRaised,
        totalBackers,
        averageDonation,
        conversionRate: 0.15, // Mock conversion rate
        fundingProgress,
        daysActive,
        dailyAverage,
        projectedTotal
      },
      trends: {
        donations: timelineData,
        hourly: hourlyData,
        weekly: weeklyData
      },
      demographics: {
        donationSizes: sizeRanges,
        geographic,
        devices
      },
      performance: {
        milestones,
        sources,
        topBackers
      }
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
} 