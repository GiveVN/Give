"use client"

import { useState } from "react"

import { AppLocale } from "@/lib/i18n"
import { ProjectCard } from "@/components/crowdfunding/ProjectCard"

interface ProjectsGridShowMoreProps {
  locale: AppLocale
  initialProjects: any[]
  total: number
  baseSearchParams: {
    category?: string
    status?: string
    search?: string
  }
}

export default function ProjectsGridShowMore({
  locale,
  initialProjects,
  total,
  baseSearchParams,
}: ProjectsGridShowMoreProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const hasMore = projects.length < total

  async function handleShowMore() {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const queryParams = new URLSearchParams({
        "populate[images][populate]": "*",
        "populate[tags]": "true",
        "populate[seo]": "true",
        "sort[0]": "createdAt:desc",
        "pagination[page]": (page + 1).toString(),
        "pagination[pageSize]": "12",
        locale: locale,
      } as any)

      if (baseSearchParams.category) {
        queryParams.append("filters[category][$eq]", baseSearchParams.category)
      }
      if (baseSearchParams.status) {
        queryParams.append("filters[status][$eq]", baseSearchParams.status)
      }
      if (baseSearchParams.search) {
        queryParams.append(
          "filters[$or][0][title][$containsi]",
          baseSearchParams.search
        )
        queryParams.append(
          "filters[$or][1][shortDescription][$containsi]",
          baseSearchParams.search
        )
      }

      // Use NEXT_PUBLIC_* variable for client-side code
      const strapiUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        process.env.STRAPI_URL ||
        "http://localhost:1338"

      const res = await fetch(`${strapiUrl}/api/projects?${queryParams}`)
      if (!res.ok) {
        console.error(
          "Failed to load more projects",
          res.status,
          res.statusText
        )
        return
      }

      const json = await res.json()
      const newProjects = json?.data || []
      setProjects((prev) => [...prev, ...newProjects])
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error("Error loading more projects:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard
              key={project.id ?? project.documentId}
              project={project}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500">No projects found</div>
      )}

      {/* Results count */}
      <div className="mb-6 text-center text-sm text-gray-500">
        {total ? (
          <>
            Showing {projects.length} of {total} results
          </>
        ) : (
          <>No projects found</>
        )}
      </div>

      {/* Show more button */}
      {hasMore && (
        <div className="flex justify-center pb-4">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:border-gray-400 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  )
}
