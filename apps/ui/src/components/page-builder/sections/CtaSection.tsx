import { Button } from '@/components/ui/button'
import { Container } from '@/components/catalyst/container'

interface CtaSectionProps {
  data?: {
    title?: string
    subtitle?: string
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

export default function CtaSection({ data }: CtaSectionProps) {
  const {
    title = "Ready to dive in?",
    subtitle = "Get started",
    description = "Start your free project today and join thousands of creators who have successfully funded their ideas through our platform.",
    primaryButtonText = "Get started",
    primaryButtonLink = "/start",
    secondaryButtonText = "Learn more",
    secondaryButtonLink = "/about",
    backgroundImage
  } = data || {}

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-2 rounded-3xl bg-white/80" />
      <Container>
        <div className="relative pt-20 pb-16 text-center sm:py-24">
          <hgroup>
            <p className="text-sm font-medium text-blue-600 mb-6">
              {subtitle}
            </p>
            <h2 className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
              {title}
              <br />
              Start your free project today.
            </h2>
          </hgroup>
          <p className="mx-auto mt-6 max-w-xs text-sm leading-6 text-gray-500">
            {description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="w-full sm:w-auto px-8 py-3">
              <a href={primaryButtonLink}>
                {primaryButtonText}
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto px-8 py-3">
              <a href={secondaryButtonLink}>
                {secondaryButtonText}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
} 