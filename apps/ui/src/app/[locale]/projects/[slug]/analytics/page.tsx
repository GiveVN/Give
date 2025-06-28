import { notFound } from "next/navigation"
import { PrivateStrapiClient } from "@/lib/strapi-api"
import { AnalyticsDashboard } from "@/components/crowdfunding/AnalyticsDashboard"

interface ProjectAnalyticsPageProps {
  params: {
    slug: string
    locale: string
  }
}

export default async function ProjectAnalyticsPage({ params }: ProjectAnalyticsPageProps) {
  const { slug, locale } = params

  // Fetch project data
  const project = await PrivateStrapiClient.findOne("projects", undefined, {
    filters: {
      Slug: { $eq: slug }
    },
    populate: ["Creator"]
  })

  if (!project?.data) {
    notFound()
  }

  // TODO: Check if user is the project creator or has admin permissions
  // For now, we'll show analytics to everyone (you should add proper auth)

  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsDashboard 
        projectId={project.data.id}
        projectTitle={project.data.Title}
      />
    </div>
  )
}

export async function generateMetadata({ params }: ProjectAnalyticsPageProps) {
  const { slug } = params

  const project = await PrivateStrapiClient.findOne("projects", undefined, {
    filters: {
      Slug: { $eq: slug }
    }
  })

  if (!project?.data) {
    return {
      title: "Analytics Not Found",
    }
  }

  return {
    title: `Analytics - ${project.data.Title}`,
    description: `View detailed analytics and insights for ${project.data.Title}`,
  }
} 