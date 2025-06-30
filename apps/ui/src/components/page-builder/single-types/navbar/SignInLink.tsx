"use client"

import { usePathname } from "next/navigation"
import AppLink from "@/components/elementary/AppLink"

export function SignInLink() {
  const pathname = usePathname()
  const callbackUrl = encodeURIComponent(pathname)
  
  // Extract locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Check if first segment is a locale (2-letter code)
  let locale = 'en' // Default locale
  if (pathSegments.length > 0 && /^[a-z]{2}$/.test(pathSegments[0])) {
    locale = pathSegments[0]
  }
  
  return (
    <AppLink
      href={`/${locale}/auth/signin?callbackUrl=${callbackUrl}`}
      variant="link"
      className="text-sm font-medium leading-6 text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2"
    >
      Sign in
    </AppLink>
  )
} 