"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { 
  TrendingUp, Users, DollarSign, Calendar, Award, 
  Activity, Target, Clock
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface DonationByDay {
  [date: string]: {
    count: number
    total: number
  }
}

interface TopBacker {
  username: string
  amount: string
  date: string
}

interface ProjectStatistics {
  projectId: number
  statistics: {
    totalRaised: number
    totalBackers: number
    averageDonation: number
    donationsByDay: DonationByDay
    topBackers: TopBacker[]
    fundingProgress: {
      percentage: number
      remaining: number
    }
  }
}

interface ProjectStatisticsProps {
  projectId: string | number
  currency?: string
  refreshInterval?: number
}

const CHART_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

export function ProjectStatistics({
  projectId,
  currency = "USD",
  refreshInterval = 60
}: ProjectStatisticsProps) {
  const [statistics, setStatistics] = useState<ProjectStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/api/public-proxy/api/projects/${projectId}/statistics`)
      if (!response.ok) throw new Error('Failed to fetch statistics')
      const data = await response.json()
      setStatistics(data)
      setError(null)
    } catch (err) {
      setError('Failed to load statistics')
      console.error('Error fetching statistics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatistics()

    if (refreshInterval > 0) {
      const interval = setInterval(fetchStatistics, refreshInterval * 1000)
      return () => clearInterval(interval)
    }
  }, [projectId, refreshInterval])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !statistics) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          {error || "No statistics available"}
        </CardContent>
      </Card>
    )
  }

  const { statistics: stats } = statistics

  // Prepare chart data
  const dailyData = Object.entries(stats.donationsByDay)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-30) // Last 30 days
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      donations: data.count,
      amount: data.total
    }))

  // Donation size distribution
  const donationSizes = [
    { name: "< $10", value: 0 },
    { name: "$10-50", value: 0 },
    { name: "$50-100", value: 0 },
    { name: "$100-500", value: 0 },
    { name: "> $500", value: 0 }
  ]

  // This would need actual donation data to calculate properly
  // For now, using mock distribution
  const mockDistribution = [30, 40, 20, 8, 2]
  donationSizes.forEach((size, index) => {
    size.value = mockDistribution[index]
  })

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Raised</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(stats.totalRaised, currency)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Backers</p>
                <p className="text-2xl font-bold">{stats.totalBackers}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Donation</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(stats.averageDonation, currency)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">
                  {stats.fundingProgress.percentage.toFixed(1)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="backers">Top Backers</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Donation Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === "amount") {
                          return formatCurrency(Number(value), currency)
                        }
                        return value
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="donations" 
                      stroke="#8b5cf6" 
                      name="Number of Donations"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#10b981" 
                      name="Total Amount"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Donation Size Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donationSizes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {donationSizes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Top Backers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topBackers.map((backer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{backer.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(backer.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      {formatCurrency(parseFloat(backer.amount), currency)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 