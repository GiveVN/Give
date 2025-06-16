import { Container } from "@/components/catalyst/container"
import ProjectCard from "@/components/crowdfunding/ProjectCard"
import FiltersSidebar from "@/components/crowdfunding/FiltersSidebar"
import FiltersSheet from "@/components/crowdfunding/FiltersSheet"
import ProjectsTopControls from "@/components/crowdfunding/ProjectsTopControls"
import { AppLocale } from "@/types/general"

interface ProjectsPageProps {
  params: Promise<{ locale: AppLocale }>
  searchParams: Promise<{ 
    category?: string
    status?: string
    search?: string
    page?: string
  }>
}

async function fetchProjects(locale: AppLocale, searchParams: any) {
  try {
    // Direct API call to Strapi as workaround for permissions
    const queryParams = new URLSearchParams({
      'sort[0]': 'createdAt:desc',
      'pagination[page]': searchParams.page || '1',
      'pagination[pageSize]': '12',
      'locale': locale
    })
    
    // Add filters if provided
    if (searchParams.category) {
      queryParams.append('filters[category][$eq]', searchParams.category)
    }
    if (searchParams.status) {
      queryParams.append('filters[status][$eq]', searchParams.status)
    }
    if (searchParams.search) {
      queryParams.append('filters[$or][0][title][$containsi]', searchParams.search)
      queryParams.append('filters[$or][1][shortDescription][$containsi]', searchParams.search)
    }
    
    // Use env variable so it works in all environments
    const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1338"

    const response = await fetch(`${strapiUrl}/api/projects?${queryParams}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }
    })
    
    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText)
      return null
    }
    
    const result = await response.json()
    console.log("Projects fetched:", result?.data?.length || 0)
    return result
  } catch (error) {
    console.error("Error fetching projects:", error)
    return null
  }
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  
  const projectsData = await fetchProjects(resolvedParams.locale, resolvedSearchParams)
  const projects = projectsData?.data || []
  const pagination = projectsData?.meta?.pagination

  return (
    <Container>
      {/* Page Header */}
      <div className="pt-12 pb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Projects</h1>
        <p className="text-lg text-gray-600">
          Support innovative projects and help bring creative ideas to life. Browse through our curated collection of campaigns.
        </p>
      </div>

      {/* Mobile filter toggle */}
      <FiltersSheet
        currentCategory={resolvedSearchParams.category}
        currentStatus={resolvedSearchParams.status}
        currentSearch={resolvedSearchParams.search}
      />

      <div className="pb-12 flex gap-8">
        {/* Sidebar filters (desktop) */}
        <FiltersSidebar
          currentCategory={resolvedSearchParams.category}
          currentStatus={resolvedSearchParams.status}
          currentSearch={resolvedSearchParams.search}
        />

        {/* Main content */}
        <div className="flex-1">
          <div className="pt-4 pb-16">
            {/* Search + Sort tabs */}
            <div className="mb-8">
              <ProjectsTopControls 
                currentSearch={resolvedSearchParams.search}
                currentCategory={resolvedSearchParams.category}
                currentStatus={resolvedSearchParams.status}
              />
            </div>

            {/* Projects Grid */}
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {projects.map((project: any) => (
                  <ProjectCard 
                    key={project.documentId}
                    project={project}
                    locale={resolvedParams.locale}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all projects.</p>
              </div>
            )}

            {/* Results Count bottom */}
            <div className="mt-4 text-center text-sm text-gray-500">
              {pagination?.total ? (
                <>Showing {projects.length} of {pagination.total} projects</>
              ) : (
                <>No projects found</>
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.pageCount > 1 && (
              <div className="flex justify-center space-x-2">
                {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`?${new URLSearchParams({ 
                      ...resolvedSearchParams, 
                      page: page.toString() 
                    }).toString()}`}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      page === pagination.page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>{/* end main content */}
      </div>
    </Container>
  )
} 