"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

import type { ProjectFiltersProps } from "./ProjectFilters"

import { cn } from "@/lib/utils"

const sortTabs = [
  { value: "trending", label: "Trending" },
  { value: "near", label: "Near you" },
  { value: "funded", label: "Most Funded" },
]

export default function ProjectsTopControls({
  currentSearch,
  currentCategory,
  currentStatus,
}: ProjectFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(currentSearch || "")

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page")
    router.push(`?${params.toString()}`)
  }

  const activeFilters: Array<{ key: string; label: string }> = []
  if (currentCategory) {
    activeFilters.push({
      key: "category",
      label: currentCategory.replace(/_/g, " "),
    })
  }
  if (currentStatus) {
    activeFilters.push({ key: "status", label: currentStatus })
  }

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateFilters("search", searchInput || null)
        }}
        className="w-full"
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for campaigns"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-3 pr-4 pl-10 text-sm placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </form>

      {/* Filters badges + sort row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Applied filters */}
        {activeFilters.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-800">
              Filtered by
            </span>
            {activeFilters.map((f) => (
              <span
                key={f.key}
                className="flex items-center gap-1 rounded bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {f.label}
                <button
                  aria-label={`Remove ${f.key} filter`}
                  onClick={() => updateFilters(f.key, null)}
                  className="hover:text-gray-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div />
        )}

        {/* Sort tabs */}
        <div className="ml-auto flex flex-wrap gap-3">
          {sortTabs.map((tab) => {
            const isActive =
              searchParams.get("sort") === tab.value ||
              (!searchParams.get("sort") && tab.value === "trending")
            return (
              <button
                key={tab.value}
                onClick={() => updateFilters("sort", tab.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
