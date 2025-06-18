import { Fragment } from "react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { AppLocale } from "@/types/general"

import { getAuth } from "@/lib/auth"
import { PublicStrapiClient } from "@/lib/strapi-api"
import { cn } from "@/lib/styles"
import AppLink from "@/components/elementary/AppLink"
import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import StrapiImageWithLink from "@/components/page-builder/components/utilities/StrapiImageWithLink"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"
import { LoggedUserMenu } from "@/components/page-builder/single-types/navbar/LoggedUserMenu"

async function fetchData(locale: AppLocale) {
  try {
    return await PublicStrapiClient.fetchOne("api::navbar.navbar", undefined, {
      locale,
      populate: {
        logoImage: { 
          populate: { 
            image: { populate: "*" }, 
            link: true 
          } 
        },
        links: true,
      },
    })
  } catch (error) {
    console.error("Error fetching navbar data:", error)
    return null
  }
}

// Custom Logo Component để handle nested data structure
function NavbarLogo({ logoImage }: { logoImage: any }) {
  if (!logoImage?.image?.media) {
    return (
      <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-md flex items-center justify-center shadow-lg">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <span className="text-2xl font-bold text-gray-900 tracking-tight">Give</span>
      </a>
    )
  }

  const media = logoImage.image.media
  const imageUrl = media.formats?.small?.url || media.url
  const link = logoImage.link

  if (link?.href) {
    return (
      <a 
        href={link.href}
        target={link.target || "_self"}
        rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
        className="-m-1.5 p-1.5 flex items-center gap-3"
      >
        <img
          src={`http://localhost:1338${imageUrl}`}
          alt={logoImage.image.alt || "Logo"}
          className="h-10 w-auto max-w-[120px]"
        />
      </a>
    )
  }

  return (
    <div className="-m-1.5 p-1.5 flex items-center gap-3">
      <img
        src={`http://localhost:1338${imageUrl}`}
        alt={logoImage.image.alt || "Logo"}
        className="h-10 w-auto max-w-[120px]"
      />
    </div>
  )
}

export async function StrapiNavbar({ locale }: { locale: AppLocale }) {
  const session = await getAuth()
  const data = await fetchData(locale)

  if (!data) {
    // Fallback to hardcoded navbar if Strapi data not available
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex items-center gap-8">
            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-md flex items-center justify-center shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">Give</span>
              </a>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  const { logoImage, links } = data

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Left side - Logo + Menu */}
        <div className="flex items-center gap-8">
          <div className="flex lg:flex-1">
            <NavbarLogo logoImage={logoImage} />
          </div>
          
          {/* Desktop Navigation */}
          {links && links.length > 0 && (
            <div className="hidden lg:flex lg:gap-x-8">
              {links.slice(0, 3).map((link: any) => (
                <StrapiLink
                  key={link.id}
                  component={link}
                  className="text-sm font-medium leading-6 text-gray-700 hover:text-green-600 transition-colors duration-200"
                />
              ))}
            </div>
          )}
        </div>

        {/* Center - Search Bar */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:max-w-2xl">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for campaigns, creators, or categories..."
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm shadow-sm hover:shadow-md transition-shadow duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 shadow-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Login/Profile + Start Campaign */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          {session?.user ? (
            <LoggedUserMenu user={session.user} />
          ) : (
            <AppLink
              href="/auth/signin"
              variant="link"
              className="text-sm font-medium leading-6 text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2"
            >
              Sign in
            </AppLink>
          )}

          <AppLink
            href="/start"
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors duration-200 shadow-sm"
          >
            Start a campaign
          </AppLink>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

StrapiNavbar.displayName = "StrapiNavbar"

export default StrapiNavbar
