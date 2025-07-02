import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BarChart3 } from "lucide-react"

import { getProjectBySlug } from "@/lib/strapi-api/content/project"
import { ProjectProgressBar } from "@/components/crowdfunding/ProjectProgressBar"
import { ProjectStatistics } from "@/components/crowdfunding/ProjectStatistics"
import { Container } from "@/components/elementary/Container"
import { Button } from "@/components/ui/button"

interface ProjectStatisticsPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function ProjectStatisticsPage({
  params,
}: ProjectStatisticsPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <Container className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href={`/projects/${resolvedParams.slug}`}>
                <Button variant="ghost" size="sm" className="mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Project
                </Button>
              </Link>
              <h1 className="flex items-center text-2xl font-bold">
                <BarChart3 className="mr-2 h-6 w-6" />
                {project.Title} - Statistics Dashboard
              </h1>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Progress Overview - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ProjectProgressBar
                projectId={project.id}
                showDetails={true}
                showMilestones={true}
                refreshInterval={30}
              />
            </div>
          </div>

          {/* Statistics - Main Content */}
          <div className="lg:col-span-2">
            <ProjectStatistics
              projectId={project.id}
              currency={project.Currency || "USD"}
              refreshInterval={60}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export async function generateMetadata({ params }: ProjectStatisticsPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.Title} - Statistics | Give Crowdfunding`,
    description: `View detailed statistics and funding progress for ${project.Title}`,
  }
}
