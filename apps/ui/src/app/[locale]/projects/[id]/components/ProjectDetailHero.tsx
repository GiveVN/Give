"use client"

import { Calendar, MapPin, Users, ChevronLeft, ChevronRight, Heart, Share2, Bookmark, Facebook, Twitter, Mail, Link } from "lucide-react"
import { useState } from "react"

import { ImageWithFallback } from "@/components/elementary/ImageWithFallback"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface ProjectDetailHeroProps {
  project: {
    id: string
    Title: string
    Description?: string
    ShortDescription?: string
    Images?: Array<{
      url: string
      alternativeText?: string
      width?: number
      height?: number
    }>
    Image?: {
      url: string
      alternativeText?: string
    }
    FundingGoal?: number
    CurrentFunding?: number
    BackersCount?: number
    DaysLeft?: number
    Category?: string
    CreatedBy?: string
    Location?: string
  }
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = project.Images && project.Images.length > 0 
    ? project.Images 
    : project.Image 
      ? [project.Image] 
      : []

  const fundingPercentage = project.FundingGoal
    ? Math.round(((project.CurrentFunding || 0) / project.FundingGoal) * 100)
    : 0

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section - Title & Description */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl leading-tight font-bold text-gray-900 lg:text-3xl xl:text-4xl mb-4">
            {project.Title}
          </h1>
          {(project.ShortDescription || project.Description) && (
            <p className="text-lg leading-relaxed text-gray-600 max-w-4xl mx-auto">
              {project.ShortDescription || project.Description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10 lg:items-start">
          {/* Left: Project Image Gallery - 60% width */}
          <div className="space-y-4 lg:col-span-6">
            {/* Main Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              {images.length > 0 ? (
                <>
                  <ImageWithFallback
                    src={images[currentImageIndex].url}
                    alt={
                      images[currentImageIndex].alternativeText ||
                      project.Title ||
                      "Project image"
                    }
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                  
                  {/* Navigation arrows for multiple images */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <ImageWithFallback
                  src="/placeholder-project.svg"
                  alt="Project placeholder"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alternativeText || `Project image ${index + 1}`}
                      width={80}
                      height={60}
                      className="h-15 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Project Info - 40% width */}
          <div className="space-y-6 lg:col-span-4">
            {/* Category & Status */}
            <div className="flex items-center gap-2 mb-4">
              {project.Category && (
                <Badge variant="secondary" className="text-sm">
                  {project.Category}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="border-green-200 text-green-600"
              >
                Active
              </Badge>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>by {project.CreatedBy || "Anonymous Creator"}</span>
              </div>
              {project.Location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{project.Location}</span>
                </div>
              )}
            </div>

            {/* Funding Progress - Indiegogo Style */}
            <div className="space-y-4">
              {/* Top Stats Row: Amount + Backers */}
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    ${(project.CurrentFunding || 0).toLocaleString()}
                    <span className="text-base font-normal text-gray-600 ml-2">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {(project.BackersCount || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">backers</div>
                </div>
              </div>

              {/* Progress Bar - Indiegogo Pink/Red Style */}
              <div className="h-3 w-full rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300"
                  style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                />
              </div>

              {/* Bottom Stats Row: Percentage + Days Left */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {fundingPercentage}%
                  </span>
                  <span className="text-sm text-gray-600">
                    of ${(project.FundingGoal || 0).toLocaleString()}
                  </span>
                  {fundingPercentage > 100 && (
                    <Badge variant="outline" className="text-xs border-green-500 text-green-600 bg-green-50">
                      Flexible Goal
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {project.DaysLeft || 30}
                  </div>
                  <div className="text-sm text-gray-600">days left</div>
                </div>
              </div>

              {/* Goal Status */}
              {fundingPercentage > 100 && (
                <div className="text-sm font-medium text-green-600">
                  🎉 Goal achieved! This project will be funded.
                </div>
              )}
            </div>

            {/* Action Buttons Section - Kickstarter Style */}
            <div className="space-y-4 pt-4 border-t">
              {/* Primary Action Button */}
              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg"
              >
                Back this project
              </Button>

              {/* Secondary Actions */}
              <div className="flex items-center justify-between">
                {/* Left: Remind Me & Bookmark */}
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    Remind me
                  </Button>
                </div>

                {/* Right: Share Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* All or Nothing Notice */}
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border-l-4 border-orange-400">
                <span className="font-medium text-gray-900">All or nothing.</span>{" "}
                This project will only be funded if it reaches its goal by{" "}
                <span className="font-medium">
                  {project.DaysLeft ? 
                    new Date(Date.now() + project.DaysLeft * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    }) : 
                    'the deadline'
                  }.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
