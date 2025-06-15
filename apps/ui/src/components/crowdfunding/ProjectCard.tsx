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
    <Link href={projectLink} className="block">
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-none hover:shadow-xl transition-shadow duration-300 hover:z-30">
      {/* Project Image */}
      <div className="relative">
        <Image
          src={projectImage}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant={project.status === 'Active' ? 'default' : 'secondary'}
            className={`${
              project.status === 'Active' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}
          >
            {project.status}
          </Badge>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 relative z-10">
        {/* Category */}
        <div className="mb-3">
          <Badge className={categoryColor}>
            {categoryLabel}
          </Badge>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        {/* Funding Progress */}
        {fundingGoal > 0 ? (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(currentFunding)} raised
              </span>
              <span className="text-sm text-gray-500">
                {progressPercentage}%
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 mb-2"
            />
            <div className="text-sm text-gray-600">
              Goal: {formatCurrency(fundingGoal)}
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              Funding details coming soon
            </p>
          </div>
        )}

        {/* Project Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {daysRemaining !== null && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{daysRemaining} days left</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            <span>{backersCount} backers</span>
          </div>
        </div>

        {/* Description and Tags - Slide-up panel inside the same box */}
        {(project.shortDescription || (project.tags && project.tags.length > 0)) && (
          <div className="absolute inset-x-0 bottom-0 bg-white px-6 pt-4 pb-6 rounded-b-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-30">
            {project.shortDescription && (
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {project.shortDescription}
              </p>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </Link>
  )
} 