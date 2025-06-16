import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CalendarIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { Heart } from 'lucide-react'

interface ProjectCardProps {
  project: {
    documentId: string
    title: string
    shortDescription: string
    category: string
    status: string
    fundingGoal?: number | null
    currentFunding?: number | null
    backersCount?: number | null
    featured?: boolean | null
    images?: any[] | null
    tags?: Array<{
      id: number
      name: string
      color?: string
    }> | null
    slug?: string | null
    endDate?: string | null
    creator: string
  }
  locale: string
}

const categoryLabels: Record<string, string> = {
  technology_innovation: 'Technology',
  environment_sustainability: 'Environment', 
  health_medical: 'Health',
  arts_culture: 'Arts & Culture',
  community: 'Community',
  education: 'Education',
  business: 'Business'
}

const categoryColors: Record<string, string> = {
  technology_innovation: 'bg-blue-100 text-blue-800',
  environment_sustainability: 'bg-green-100 text-green-800',
  health_medical: 'bg-red-100 text-red-800', 
  arts_culture: 'bg-purple-100 text-purple-800',
  community: 'bg-orange-100 text-orange-800',
  education: 'bg-indigo-100 text-indigo-800',
  business: 'bg-gray-100 text-gray-800'
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  draft: 'Draft',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800', 
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  // Handle missing funding data with fallbacks
  const fundingGoal = project.fundingGoal || 0
  const currentFunding = project.currentFunding || 0
  const backersCount = project.backersCount || 0
  const featured = project.featured || false
  
  // Calculate progress percentage
  const progressPercentage = fundingGoal > 0 ? Math.round((currentFunding / fundingGoal) * 100) : 0

  // Calculate days left
  const daysLeft = project.endDate 
    ? Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get project image
  const projectImage = project.images?.[0]?.url 
    ? `http://localhost:1338${project.images[0].url}`
    : '/placeholder-project.svg'

  // Get category info
  const categoryLabel = categoryLabels[project.category] || project.category
  const categoryColor = categoryColors[project.category] || 'bg-gray-100 text-gray-800'
  
  // Get status info
  const statusLabel = statusLabels[project.status] || project.status
  const statusColor = statusColors[project.status] || 'bg-gray-100 text-gray-800'

  // Project link
  const projectLink = project.slug 
    ? `/${locale}/projects/${project.slug}`
    : `/${locale}/projects/${project.documentId}`

  return (
    <div className="group relative before:content-[''] before:absolute before:inset-0 before:rounded-lg hover:before:bottom-[-96px] hover:before:shadow-xl before:pointer-events-none before:-z-10 before:transition-all before:duration-300 hover:z-50">
      {/* Main card */}
      <div className="relative bg-white rounded-lg shadow-sm group-hover:shadow-none transition-shadow duration-300">
        {/* Project Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Link href={projectLink}>
            <Image
              src={projectImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
          
          {/* Featured Badge - Kickstarter style */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-600 hover:bg-green-600 text-white">
                ❤️ Project We Love
              </Badge>
            </div>
          )}

          {/* Creator Avatar - Top right */}
          <div className="absolute top-3 right-12 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
            {project.creator?.[0] || 'U'}
          </div>

          {/* Save Button - Top right corner */}
          <button 
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Save project"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Project Title */}
          <Link href={projectLink}>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
          </Link>

          {/* Creator */}
          <p className="text-sm text-gray-600 mb-3">
            by <span className="font-medium">{project.creator || 'Anonymous'}</span>
          </p>

          {/* Progress Bar */}
          <div className="mb-3">
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{daysLeft} days left</span>
              </div>
              <span>{progressPercentage}% funded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="p-4">
          {/* Project Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {project.shortDescription}
          </p>
          
          {/* Tags - Kickstarter style */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 2).map((tag) => (
              <Link
                key={tag.id}
                href={`/projects?tag=${tag.name}`}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                {tag.name}
              </Link>
            ))}
            {project.category && (
              <Link
                href={`/projects?category=${project.category}`}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                {categoryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 