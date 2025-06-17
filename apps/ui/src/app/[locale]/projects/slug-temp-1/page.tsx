import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/strapi-api/content/project'
import { ProjectDetailHero } from './components/ProjectDetailHero'
import { ProjectDetailContent } from './components/ProjectDetailContent'
import { ProjectDetailSidebar } from './components/ProjectDetailSidebar'
import { Container } from '@/components/elementary/Container'

interface ProjectDetailPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <Container>
          <ProjectDetailHero project={project} />
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            <ProjectDetailContent project={project} />
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <ProjectDetailSidebar project={project} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.Title} | Give`,
    description: project.Description || `Support ${project.Title} on Give`,
    openGraph: {
      title: project.Title,
      description: project.Description,
      images: project.Image ? [project.Image.url] : [],
    },
  }
} 