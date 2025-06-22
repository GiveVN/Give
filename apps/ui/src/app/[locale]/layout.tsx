import "@/styles/globals.css"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { LayoutProps } from "@/types/next"

import { fontRoboto } from "@/lib/fonts"
import { routing } from "@/lib/navigation"
import { cn } from "@/lib/styles"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import StrapiPreviewListener from "@/components/elementary/StrapiPreviewListener"
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator"
import { StrapiFooter } from "@/components/page-builder/single-types/footer/StrapiFooter"
import { StrapiNavbarNew } from "@/components/page-builder/single-types/navbar/StrapiNavbarNew"
import { ClientProviders } from "@/components/providers/ClientProviders"
import { ServerProviders } from "@/components/providers/ServerProviders"
import TrackingScripts from "@/components/providers/TrackingScripts"
import { Toaster } from "@/components/ui/toaster"
import DarkReaderFix from "@/components/elementary/DarkReaderFix"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "Give - Crowdfunding Platform",
  description: "A modern crowdfunding platform built with Next.js and Strapi",
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  const { locale } = resolvedParams
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={cn(fontRoboto.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background min-h-screen font-sans antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <ServerProviders params={resolvedParams}>
            <ClientProviders>
              <div className="relative flex min-h-screen flex-col">
                <StrapiNavbarNew locale={locale} />
                <main className="flex-1">{children}</main>
                <StrapiFooter locale={locale} />
              </div>
              <Toaster />
              <TailwindIndicator />
              <StrapiPreviewListener />
              <DarkReaderFix />
            </ClientProviders>
          </ServerProviders>
        </ErrorBoundary>
        <TrackingScripts />
      </body>
    </html>
  )
}
