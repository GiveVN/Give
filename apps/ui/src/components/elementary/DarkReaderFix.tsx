"use client"

import { useLayoutEffect } from "react"

/**
 * Removes Dark Reader inline attributes that cause React hydration mismatch.
 * Works by stripping attributes just before React mounts client components.
 */
export default function DarkReaderFix() {
  useLayoutEffect(() => {
    const selector =
      "[data-darkreader-inline-stroke], [data-darkreader-inline-fill], [data-darkreader-inline-color]"
    const clean = () => {
      document.querySelectorAll(selector).forEach((el) => {
        el.removeAttribute("data-darkreader-inline-stroke")
        el.removeAttribute("data-darkreader-inline-fill")
        el.removeAttribute("data-darkreader-inline-color")
      })
    }

    // Clean immediately after mount
    clean()

    // Also observe mutations and clean again
    const observer = new MutationObserver(() => clean())
    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
    })
    return () => observer.disconnect()
  }, [])

  return null
}
