import { Container } from "@/components/catalyst/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HeroCrowdfundingProps {
  data?: {
    title?: string
    subtitle?: string
    badge?: string
    description?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    backgroundImage?: {
      data?: {
        url?: string
        alternativeText?: string
      }
    }
  }
}

export default function HeroCrowdfunding({ data }: HeroCrowdfundingProps) {
  // Provide default values matching Radiant template
  const {
    title = "Give to Change the World",
    subtitle = "Get started",
    badge = "New Platform",
    description = "Join thousands of creators who have successfully funded their ideas through our crowdfunding platform. Start your project today and make your dreams a reality.",
    primaryButtonText = "Get started",
    primaryButtonLink = "/start",
    secondaryButtonText = "Learn more",
    secondaryButtonLink = "/about",
    backgroundImage,
  } = data || {}

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background pattern - exactly like Radiant */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px]" />
        <div className="absolute inset-2 rounded-3xl bg-white/80" />
      </div>

      <Container>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              {/* Badge - Radiant style */}
              <p className="mb-6 text-sm font-medium text-blue-600">
                {subtitle}
              </p>

              {/* Main heading - Radiant typography */}
              <h1 className="mb-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
                {title}
                <br />
                Start your free project today.
              </h1>

              {/* Description - Radiant style */}
              <p className="mx-auto mb-8 max-w-xs text-sm leading-6 text-gray-500">
                {description}
              </p>

              {/* CTA Buttons - Radiant style */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  className="w-full rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 sm:w-auto"
                >
                  <a href={primaryButtonLink}>{primaryButtonText}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50 sm:w-auto"
                >
                  <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-purple-300 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
          </div>
        </div>
      </Container>
    </div>
  )
}
