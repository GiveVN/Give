import { notFound } from "next/navigation"

import { getProjectBySlug } from "@/lib/strapi-api/content/project"
import { Container } from "@/components/elementary/Container"

import { ProjectDetailContent } from "./components/ProjectDetailContent"
import { ProjectDetailHero } from "./components/ProjectDetailHero"
import { ProjectDetailSidebar } from "./components/ProjectDetailSidebar"

interface ProjectDetailPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ProjectDetailHero project={project} />

      {/* Main Content Grid */}
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ProjectDetailContent project={project} />
          </div>

          {/* Sidebar - Takes 1 column on large screens */}
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
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.Title} - Give Crowdfunding`,
    description:
      project.Description ||
      `Support ${project.Title} on Give crowdfunding platform`,
    openGraph: {
      title: project.Title,
      description: project.Description,
      images: project.Image
        ? [
            {
              url: project.Image.url,
              alt: project.Image.alternativeText || project.Title,
            },
          ]
        : [],
      type: "website",
    },
  }
}
