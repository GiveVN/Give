"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Heart } from "lucide-react"

import { getCategoryIcon } from "@/lib/category-icons"
import { formatCurrency } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { TypeBadge } from "@/components/ui/TypeBadge"

interface ProjectCardProps {
  project: {
    Id: string
    DocumentId: string
    Title: string
    Slug?: string
    ShortDescription?: string
    Description: string
    Type?: "give" | "back"
    Category:
      | string
      | {
          id: number
          documentId: string
          Name: string
          Slug: string
          Description?: string
          Icon?: string
          Color?: string
          Featured?: boolean
          SortOrder?: number
          IsActive?: boolean
          Metadata?: any
          createdAt?: string
          updatedAt?: string
          publishedAt?: string
          locale?: string
          Type?: string
        }
    FundingGoal: number
    CurrentFunding: number
    Currency: string
    BackersCount: number
    StartDate: string
    EndDate: string
    Featured: boolean
    ProjectStatus: string
    // Support both Images array and Media array from Strapi
    Images?: Array<{
      Id: number
      Url: string
      AlternativeText?: string
      Width?: number
      Height?: number
    }>
    Media?: Array<{
      id: number
      url: string
      alternativeText?: string
      width?: number
      height?: number
      formats?: any
    }>
    Tags?: Array<{
      Id: number
      Name: string
    }>
  }
}

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "funded":
      return "bg-blue-100 text-blue-800"
    case "ended":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper function to get status display name
const getStatusDisplayName = (status: string): string => {
  switch (status) {
    case "active":
      return "Active"
    case "funded":
      return "Funded"
    case "ended":
      return "Ended"
    default:
      return status
  }
}

// Helper function to get category display name
const getCategoryDisplayName = (category: string | any): string => {
  // If category is an object, get the Name or Slug
  if (typeof category === "object" && category !== null) {
    return category.Name || category.Slug || "Unknown"
  }

  // If category is a string, use existing logic
  switch (category) {
    case "technology_innovation":
      return "Technology"
    case "business":
      return "Business"
    case "creative_arts":
      return "Creative Arts"
    case "social_impact":
      return "Social Impact"
    case "health_wellness":
      return "Health & Wellness"
    case "education":
      return "Education"
    case "environment":
      return "Environment"
    case "community":
      return "Community"
    default:
      return category
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const progressPercentage =
    project.FundingGoal > 0
      ? Math.round((project.CurrentFunding / project.FundingGoal) * 100)
      : 0

  const endDate = new Date(project.EndDate)
  const today = new Date()
  const timeDiff = endDate.getTime() - today.getTime()
  const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)))

  // Support both Images and Media fields
  let imageSrc = null
  let imageAlt = project.Title || "Project image"

  // Check Images field first (transformed data)
  if (project.Images && project.Images.length > 0 && project.Images[0]) {
    imageSrc = project.Images[0].Url.startsWith("http")
      ? project.Images[0].Url
      : `http://localhost:1338${project.Images[0].Url}`
    imageAlt = project.Images[0].AlternativeText || imageAlt
  }
  // Check Media field (raw Strapi data)
  else if (project.Media && project.Media.length > 0 && project.Media[0]) {
    imageSrc = project.Media[0].url.startsWith("http")
      ? project.Media[0].url
      : `http://localhost:1338${project.Media[0].url}`
    imageAlt = project.Media[0].alternativeText || imageAlt
  }

  return (
    <Link
      href={`/projects/${project.Slug || project.DocumentId}`}
      className="block"
    >
      <div className="group relative">
        {/* Main card - no z-index change, no shadow transition to avoid zoom effect */}
        <div className="relative overflow-visible rounded-lg border border-gray-100 bg-white transition-all duration-200 group-hover:rounded-b-none group-hover:border-t-gray-200 group-hover:border-r-gray-200 group-hover:border-b-transparent group-hover:border-l-gray-200 group-hover:shadow-sm">
          {/* Featured Badge */}
          {project.Featured && (
            <div className="absolute top-3 right-3 z-10 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
              Featured
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            aria-label={isLiked ? "Unlike project" : "Like project"}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>

          {/* Project Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            {/* Status Badge - moved to image corner */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(project.ProjectStatus)}`}
              >
                {getStatusDisplayName(project.ProjectStatus)}
              </span>
            </div>

            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="p-4">
            {/* Type Badge */}
            {project.Type && (
              <div className="mb-2">
                <TypeBadge type={project.Type} />
              </div>
            )}

            {/* Project Title */}
            <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900">
              {project.Title}
            </h3>

            {/* Progress Bar */}
            <div className="mb-3">
              <Progress
                value={progressPercentage}
                className="h-2 transition-all duration-1000 ease-out"
              />
            </div>

            {/* Funding Info */}
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(project.CurrentFunding, project.Currency)}
                </span>
                <span className="ml-1 text-gray-500">raised</span>
              </div>
              <div className="text-gray-500">
                {progressPercentage}% funded
                {project.BackersCount && project.BackersCount > 0 && (
                  <span> • {project.BackersCount} backers</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content - faster timing, shadow only when visible */}
        <div className="invisible absolute top-full right-0 left-0 z-40 space-y-3 rounded-b-lg border border-transparent bg-white p-4 opacity-0 transition-[opacity,visibility,border-color,box-shadow] duration-200 group-hover:visible group-hover:border-t-transparent group-hover:border-r-gray-200 group-hover:border-b-gray-200 group-hover:border-l-gray-200 group-hover:opacity-100 group-hover:shadow-lg">
          {/* Short Description */}
          {project.ShortDescription && (
            <p className="line-clamp-2 pt-2 text-sm text-gray-600">
              {project.ShortDescription}
            </p>
          )}

          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {project.Category && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                {getCategoryIcon(project.Category)}
                {getCategoryDisplayName(project.Category)}
              </span>
            )}
            {project.Tags?.map((tag) => (
              <span
                key={tag.Id}
                className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {tag.Name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
