export interface SocialLink {
    platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'youtube' | 'website' | 'github' | 'discord'
    url: string
    username?: string
    isVerified: boolean
    isPublic: boolean
}

export interface PrivacySettings {
    showEmail: boolean
    showLocation: boolean
    showBackedProjects: boolean
    showCreatedProjects: boolean
    allowMessages: 'all' | 'following' | 'none'
    showActivityFeed: boolean
    showDonationHistory: boolean
    profileVisibility: 'public' | 'authenticated' | 'private'
}

export interface NotificationSettings {
    emailNotifications: boolean
    pushNotifications: boolean
    projectUpdates: boolean
    newFollowers: boolean
    messages: boolean
    marketingEmails: boolean
    weeklyDigest: boolean
    donationReceipts: boolean
    projectMilestones: boolean
    commentReplies: boolean
}

export interface MediaFile {
    id: number
    url: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
}

export interface Project {
    id: number
    Title: string
    Slug: string
    Description: string
    ShortDescription?: string
    Type: 'give' | 'back'
    ProjectStatus: 'draft' | 'active' | 'funded' | 'ended' | 'cancelled'
    FundingGoal: number
    CurrentFunding: number
    Currency: 'USD' | 'EUR' | 'GBP' | 'VND'
    BackersCount: number
    StartDate: string
    EndDate: string
    Featured: boolean
    Media?: MediaFile[]
    createdAt: string
    updatedAt: string
}

export interface Donation {
    id: number
    Amount: number
    Currency: string
    Message?: string
    IsAnonymous: boolean
    Project: Project
    createdAt: string
    updatedAt: string
}

export interface UserProfile {
    id: number
    username: string
    email: string
    firstName?: string
    lastName?: string
    displayName?: string
    vanityUrl?: string
    avatar?: MediaFile
    coverImage?: MediaFile
    bio?: string
    website?: string
    location?: string
    timezone?: string
    socialLinks?: SocialLink[]
    isVerified: boolean
    verificationLevel: 'none' | 'email' | 'phone' | 'identity' | 'premium'
    reputation: number
    totalDonated: number
    totalRaised: number
    followersCount: number
    followingCount: number
    privacySettings?: PrivacySettings
    notificationSettings?: NotificationSettings
    lastActiveAt?: string
    isOnline: boolean
    Projects?: Project[]
    Donations?: Donation[]
    createdAt: string
    updatedAt: string
}

export interface UserStats {
    totalProjects: number
    activeProjects: number
    fundedProjects: number
    totalRaised: number
    totalBackers: number
}

export interface UpdateProfileData {
    firstName?: string
    lastName?: string
    displayName?: string
    vanityUrl?: string
    bio?: string
    website?: string
    location?: string
    timezone?: string
    socialLinks?: SocialLink[]
    privacySettings?: PrivacySettings
    notificationSettings?: NotificationSettings
}