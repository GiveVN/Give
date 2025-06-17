import { notFound } from "next/navigation"
import { ROOT_PAGE_PATH } from "@repo/shared-data"
import { setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { getMetadataFromStrapi } from "@/lib/metadata"
import { fetchPage } from "@/lib/strapi-api/content/page"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import { PageContentComponents } from "@/components/page-builder"
import StrapiStructuredData from "@/components/page-builder/components/seo-utilities/StrapiStructuredData"

type Props = PageProps<{}>

export async function generateMetadata(props: Props) {
  const params = await props.params
  const fullPath = ROOT_PAGE_PATH

  return getMetadataFromStrapi({ fullPath, locale: params.locale })
}

export default async function HomePage(props: Props) {
  const params = await props.params

  setRequestLocale(params.locale)

  const fullPath = ROOT_PAGE_PATH
  const response = await fetchPage(fullPath, params.locale)

  const data = response?.data

  // Handle both null and empty content array
  const { content, ...restPageData } = data || {}
  const hasContent = content && Array.isArray(content) && content.length > 0

  // If no data at all, show 404
  if (!data) {
    notFound()
  }

  return (
    <>
      <StrapiStructuredData structuredData={data?.seo?.structuredData} />

      <main className={cn("flex w-full flex-col overflow-hidden")}>
        {hasContent ? (
          // Render Strapi content
          content
            .filter((comp) => comp != null)
            .map((comp) => {
              const name = comp.__component
              const id = comp.id
              const key = `${name}-${id}`
              const Component = PageContentComponents[name]
              if (Component == null) {
                console.warn(`Unknown component "${name}" with id "${id}".`)

                return (
                  <div key={key} className="font-medium text-red-500">
                    Component &quot;{key}&quot; is not implemented on the
                    frontend.
                  </div>
                )
              }

              return (
                <ErrorBoundary key={key}>
                  <div className={cn("mb-4 md:mb-12 lg:mb-16")}>
                    <Component
                      component={comp}
                      pageParams={params}
                      page={restPageData}
                    />
                  </div>
                </ErrorBoundary>
              )
            })
        ) : (
          // Default crowdfunding homepage when content is empty
          <Container className="py-16">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Fund the Future
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Discover and support innovative projects that make a difference. 
                  Join thousands of backers bringing creative ideas to life.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/projects" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Browse Projects
                </a>
                <a 
                  href="/projects/create" 
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Start a Campaign
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold">1,000+</div>
                  <div className="text-sm text-muted-foreground">Projects Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">$2.5M+</div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Backers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </Container>
        )}
      </main>
    </>
  )
}
