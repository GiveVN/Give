'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Calendar } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface ProjectCardProps {
  project: {
    id: string
    documentId: string
    title: string
    slug?: string
    shortDescription?: string
    description: string
    category: string
    fundingGoal: number
    currentFunding: number
    currency: string
    backersCount: number
    startDate: string
    endDate: string
    featured: boolean
    projectStatus: string
    images?: Array<{
      id: number
      url: string
      alternativeText?: string
      width?: number
      height?: number
    }>
    tags?: Array<{
      id: number
      name: string
    }>
  }
}

// Helper function to format currency
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'funded':
      return 'bg-blue-100 text-blue-800'
    case 'ended':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper function to get status display name
const getStatusDisplayName = (status: string): string => {
  switch (status) {
    case 'active':
      return 'Active'
    case 'funded':
      return 'Funded'
    case 'ended':
      return 'Ended'
    default:
      return status
  }
}

// Helper function to get category display name
const getCategoryDisplayName = (category: string): string => {
  switch (category) {
    case 'technology_innovation':
      return 'Technology'
    case 'business':
      return 'Business'
    case 'creative_arts':
      return 'Creative Arts'
    case 'social_impact':
      return 'Social Impact'
    case 'health_wellness':
      return 'Health & Wellness'
    case 'education':
      return 'Education'
    case 'environment':
      return 'Environment'
    case 'community':
      return 'Community'
    default:
      return category
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  
  const progressPercentage = project.fundingGoal > 0 
    ? Math.round((project.currentFunding / project.fundingGoal) * 100)
    : 0

  const endDate = new Date(project.endDate)
  const today = new Date()
  const timeDiff = endDate.getTime() - today.getTime()
  const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)))

  const imageUrl = project.images?.[0]?.url 
    ? `http://localhost:1338${project.images[0].url}`
    : null

  return (
    <Link href={`/projects/${project.slug || project.documentId}`} className="block">
      <div className="group relative">
        
        {/* Main card - no z-index change, no shadow transition to avoid zoom effect */}
        <div className="relative bg-white rounded-lg border border-transparent group-hover:rounded-b-none group-hover:border-t-gray-200 group-hover:border-l-gray-200 group-hover:border-r-gray-200 group-hover:border-b-transparent overflow-visible transition-[border-radius,border-color] duration-200">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 z-10 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={isLiked ? "Unlike project" : "Like project"}
          >
            <Heart 
              className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>

          {/* Project Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            {/* Status Badge - moved to image corner */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.projectStatus)}`}>
                {getStatusDisplayName(project.projectStatus)}
              </span>
            </div>

            {project.images && project.images.length > 0 ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.images[0].url}`}
                alt={project.images[0].alternativeText || project.title || "Project image"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="p-4">
            {/* Project Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
              {project.title}
            </h3>

            {/* Progress Bar */}
            <div className="mb-3">
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Funding Info */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(project.currentFunding, project.currency)}
                </span>
                <span className="text-gray-500 ml-1">raised</span>
              </div>
              <div className="text-gray-500">
                {progressPercentage}% funded
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content - faster timing, shadow only when visible */}
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg p-4 space-y-3 opacity-0 invisible border border-transparent group-hover:opacity-100 group-hover:visible group-hover:border-l-gray-200 group-hover:border-r-gray-200 group-hover:border-b-gray-200 group-hover:border-t-transparent group-hover:shadow-lg transition-[opacity,visibility,border-color,box-shadow] duration-200 z-40">
          {/* Short Description */}
          {project.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-2 pt-2">
              {project.shortDescription}
            </p>
          )}
          
          {/* Category and Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {getCategoryDisplayName(project.category)}
            </span>
            {project.tags?.map((tag) => (
              <span 
                key={tag.id}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
} 