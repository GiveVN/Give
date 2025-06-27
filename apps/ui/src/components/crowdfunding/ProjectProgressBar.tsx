"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock, Target, Trophy } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Milestone {
  id: number
  Title: string
  Description?: string
  TargetAmount: number
  IsReached: boolean
  ReachedAt?: string
  UnlockReward?: string
}

interface ProjectProgressData {
  projectId: number
  title: string
  fundingGoal: number
  currentFunding: number
  currency: string
  progressPercentage: number
  backersCount: number
  daysRemaining: number
  isActive: boolean
  isFunded: boolean
  milestones: Milestone[]
  recentDonations: {
    count: number
    total: number
  }
  showProgressBar: boolean
  showBackersCount: boolean
  showTimeRemaining: boolean
  stretchGoal?: number
  minimumDonation: number
}

interface ProjectProgressBarProps {
  projectId: string | number
  initialData?: ProjectProgressData
  showDetails?: boolean
  showMilestones?: boolean
  refreshInterval?: number // in seconds
}

export function ProjectProgressBar({
  projectId,
  initialData,
  showDetails = true,
  showMilestones = true,
  refreshInterval = 30
}: ProjectProgressBarProps) {
  const [progressData, setProgressData] = useState<ProjectProgressData | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)

  // Fetch progress data
  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/public-proxy/api/projects/${projectId}/progress`)
      if (!response.ok) throw new Error('Failed to fetch progress')
      const data = await response.json()
      setProgressData(data)
      setError(null)
    } catch (err) {
      setError('Failed to load progress data')
      console.error('Error fetching progress:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialData) {
      fetchProgress()
    }

    // Set up auto-refresh if enabled
    if (refreshInterval > 0) {
      const interval = setInterval(fetchProgress, refreshInterval * 1000)
      return () => clearInterval(interval)
    }
  }, [projectId, refreshInterval])

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    )
  }

  if (error || !progressData) {
    return null
  }

  const {
    fundingGoal,
    currentFunding,
    currency,
    progressPercentage,
    backersCount,
    daysRemaining,
    isActive,
    isFunded,
    milestones,
    recentDonations,
    showProgressBar,
    showBackersCount,
    showTimeRemaining,
    stretchGoal
  } = progressData

  // Calculate stretch goal progress if enabled
  const stretchProgress = stretchGoal && currentFunding > fundingGoal
    ? ((currentFunding - fundingGoal) / (stretchGoal - fundingGoal)) * 100
    : 0

  return (
    <div className="space-y-4">
      {/* Main Progress Card */}
      <Card>
        <CardContent className="p-6">
          {/* Funding Status */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(currentFunding, currency)}
              </p>
              <p className="text-sm text-muted-foreground">
                raised of {formatCurrency(fundingGoal, currency)} goal
              </p>
            </div>
            {isFunded && (
              <Badge variant="default" className="bg-green-500">
                <Trophy className="w-3 h-3 mr-1" />
                Funded!
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          {showProgressBar && (
            <div className="mb-4">
              <Progress 
                value={progressPercentage} 
                className="h-3"
                indicatorClassName={isFunded ? "bg-green-500" : ""}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {progressPercentage.toFixed(1)}% complete
              </p>
            </div>
          )}

          {/* Stretch Goal Progress */}
          {stretchGoal && currentFunding >= fundingGoal && (
            <div className="mb-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm font-medium mb-2">
                🎯 Stretch Goal: {formatCurrency(stretchGoal, currency)}
              </p>
              <Progress 
                value={stretchProgress} 
                className="h-2"
                indicatorClassName="bg-amber-500"
              />
            </div>
          )}

          {/* Stats */}
          {showDetails && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {showBackersCount && (
                <div className="text-center">
                  <div className="flex items-center justify-center text-muted-foreground mb-1">
                    <Users className="w-4 h-4 mr-1" />
                  </div>
                  <p className="font-semibold">{backersCount}</p>
                  <p className="text-xs text-muted-foreground">backers</p>
                </div>
              )}
              
              {showTimeRemaining && isActive && (
                <div className="text-center">
                  <div className="flex items-center justify-center text-muted-foreground mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                  </div>
                  <p className="font-semibold">{daysRemaining}</p>
                  <p className="text-xs text-muted-foreground">days left</p>
                </div>
              )}

              {recentDonations.count > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center text-muted-foreground mb-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                  </div>
                  <p className="font-semibold">{recentDonations.count}</p>
                  <p className="text-xs text-muted-foreground">recent donations</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones */}
      {showMilestones && milestones.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Funding Milestones
            </h3>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${
                    milestone.IsReached 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium flex items-center">
                        {milestone.IsReached && (
                          <Trophy className="w-4 h-4 mr-2 text-green-600" />
                        )}
                        {milestone.Title}
                      </p>
                      {milestone.Description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.Description}
                        </p>
                      )}
                      {milestone.UnlockReward && milestone.IsReached && (
                        <p className="text-sm text-green-600 mt-1">
                          ✨ {milestone.UnlockReward}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold">
                        {formatCurrency(milestone.TargetAmount, currency)}
                      </p>
                      {milestone.IsReached && milestone.ReachedAt && (
                        <p className="text-xs text-muted-foreground">
                          Reached {new Date(milestone.ReachedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 