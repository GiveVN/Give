import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CalendarIcon, UsersIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

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

  // Calculate days remaining if endDate exists
  const daysRemaining = project.endDate 
    ? Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div className="group relative bg-white rounded-lg overflow-visible shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Main Card Content */}
      <div className="relative bg-white rounded-lg group-hover:rounded-b-none overflow-hidden">
        {/* Project Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
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
              <Badge className="bg-green-600 hover:bg-green-600 text-white text-xs font-medium px-2 py-1">
                ❤️ Project We Love
              </Badge>
            </div>
          )}
          
          {/* User Avatar - bottom left overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {project.creator?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
          
          {/* Save Button - bottom right */}
          <button 
            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Save project"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Main Card Info */}
        <div className="p-4">
          {/* Title */}
          <Link href={projectLink}>
            <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
              {project.title}
            </h3>
          </Link>
          
          {/* Creator */}
          <p className="text-sm text-gray-600 mb-2">
            by <span className="font-medium">{project.creator || 'Anonymous'}</span>
          </p>
          
          {/* Progress Info */}
          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <CalendarIcon className="w-3 h-3" />
            <span>{daysRemaining} days left</span>
            <span>•</span>
            <span>{progressPercentage}% funded</span>
          </div>
        </div>
      </div>

      {/* Expanded Content - Absolute positioned to overlap like Kickstarter */}
      <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
        <div className="px-4 py-3">
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
                {project.category}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 