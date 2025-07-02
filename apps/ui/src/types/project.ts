export interface ProjectImage {
  url: string
  alternativeText?: string
  width?: number
  height?: number
}

export interface ProjectReward {
  id: number
  Title: string
  Description: string
  Amount: number
  Currency: string
  EstimatedDelivery?: string
  LimitedQuantity?: number
  ClaimedQuantity: number
  IsActive: boolean
  Image?: ProjectImage
}

export interface ProjectMilestone {
  id: number
  Title: string
  Description?: string
  TargetAmount: number
  IsReached: boolean
  ReachedAt?: string
  UnlockReward?: string
}

export interface BaseProject {
  id: string
  Title: string
  Description?: string
  ShortDescription?: string
  LongDescription?: string
  Type?: "give" | "back"
  Images?: ProjectImage[]
  Image?: ProjectImage
  FundingGoal?: number
  CurrentFunding?: number
  BackersCount?: number
  DaysLeft?: number | null
  CreatedBy?: string
  Currency?: string
  ShowProgressBar?: boolean
  ShowBackersCount?: boolean
  ShowTimeRemaining?: boolean
  Rewards?: ProjectReward[]
  GoalMilestones?: ProjectMilestone[]
  EndDate?: string
  EnableStretchGoals?: boolean
  StretchGoal?: number
  Slug?: string
  Media?: ProjectImage[]
  Location?: string
}

export interface ProjectData extends BaseProject {
  // Additional fields for specific use cases
  locale?: string
  [key: string]: any
}

// For API responses
export interface ProjectResponse {
  data: ProjectData
  meta: any
}

export interface ProjectListResponse {
  data: ProjectData[]
  meta: any
}
