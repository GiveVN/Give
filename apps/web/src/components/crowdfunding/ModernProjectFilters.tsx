"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react"
import { ChevronDownIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid"
import { FunnelIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"

import { ProjectFiltersProps } from "./ProjectFilters"

const types = [
  { value: "give", label: "❤️ Give", description: "Support charitable causes" },
  { value: "back", label: "🚀 Back", description: "Fund creative projects" },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "goal_low", label: "Goal: Low to High" },
  { value: "goal_high", label: "Goal: High to Low" },
]

// Categories for Give (charitable/donation projects)
const giveCategories = [
  { value: "disaster_relief", label: "Disaster Relief" },
  { value: "poverty_alleviation", label: "Poverty Alleviation" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education_charity", label: "Education" },
  { value: "environment_conservation", label: "Environment" },
  { value: "animal_welfare", label: "Animal Welfare" },
  { value: "community_development", label: "Community Development" },
  { value: "humanitarian_aid", label: "Humanitarian Aid" },
]

// Categories for Back (creative/reward-based projects)
const backCategories = [
  { value: "technology", label: "Technology" },
  { value: "arts", label: "Arts" },
  { value: "film_video", label: "Film & Video" },
  { value: "games", label: "Games" },
  { value: "music", label: "Music" },
  { value: "publishing", label: "Publishing" },
  { value: "food_craft", label: "Food & Craft" },
  { value: "design_fashion", label: "Design & Fashion" },
]

const statuses = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "completed", label: "Completed" },
]

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function ModernProjectFilters({
  currentType,
  currentCategory,
  currentStatus,
  currentSearch,
}: ProjectFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(currentSearch || "")

  // Select categories based on current type
  const categories =
    currentType === "give"
      ? giveCategories
      : currentType === "back"
        ? backCategories
        : [...giveCategories, ...backCategories]

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Clear category when changing type
    if (key === "type" && value !== currentType) {
      params.delete("category")
    }

    params.delete("page")

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Sort + mobile trigger row (can be hidden by parent) */}
      <div className="flex items-center justify-between lg:hidden">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort
            <ChevronDownIcon className="h-4 w-4" />
          </MenuButton>
          <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {sortOptions.map((option) => (
              <MenuItem key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => updateFilters("sort", option.value)}
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "block w-full px-4 py-2 text-left text-sm text-gray-700"
                    )}
                  >
                    {option.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        {/* This icon is decorative in sidebar context; actual mobile trigger lives outside */}
        <FunnelIcon className="h-5 w-5 text-gray-400 lg:hidden" />
      </div>

      {/* Type */}
      <Disclosure as="div" defaultOpen>
        {({ open }) => (
          <div className="border-b border-gray-200 pb-4">
            <DisclosureButton className="flex w-full items-center justify-between text-sm font-medium text-gray-900">
              Project Type
              {open ? (
                <MinusIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </DisclosureButton>
            <DisclosurePanel className="space-y-2 pt-4">
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    updateFilters(
                      "type",
                      type.value === currentType ? null : type.value
                    )
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm transition-all duration-200",
                    type.value === currentType
                      ? type.value === "give"
                        ? "border border-pink-200 bg-gradient-to-r from-pink-50 to-pink-100 font-semibold text-pink-800 shadow-sm"
                        : "border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 font-semibold text-blue-800 shadow-sm"
                      : "border border-transparent text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {/* Radio appearance */}
                  <span
                    className={cn(
                      "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                      type.value === currentType
                        ? type.value === "give"
                          ? "border-pink-600"
                          : "border-blue-600"
                        : "border-gray-400"
                    )}
                  >
                    {type.value === currentType && (
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          type.value === "give" ? "bg-pink-600" : "bg-blue-600"
                        )}
                      />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs font-normal opacity-75">
                      {type.description}
                    </div>
                  </div>
                </button>
              ))}
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>

      {/* Categories */}
      <Disclosure as="div" defaultOpen>
        {({ open }) => (
          <div className="border-b border-gray-200 pb-4">
            <DisclosureButton className="flex w-full items-center justify-between text-sm font-medium text-gray-900">
              Category
              {open ? (
                <MinusIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </DisclosureButton>
            <DisclosurePanel className="space-y-2 pt-4">
              {categories.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  Select a project type first
                </p>
              ) : (
                categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() =>
                      updateFilters(
                        "category",
                        cat.value === currentCategory ? null : cat.value
                      )
                    }
                    className={cn(
                      cat.value === currentCategory
                        ? "font-medium text-indigo-600"
                        : "text-gray-600 hover:text-gray-900",
                      "block w-full text-left text-sm"
                    )}
                  >
                    {cat.label}
                  </button>
                ))
              )}
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>

      {/* Status */}
      <Disclosure as="div" defaultOpen>
        {({ open }) => (
          <div className="border-b border-gray-200 pb-4">
            <DisclosureButton className="flex w-full items-center justify-between text-sm font-medium text-gray-900">
              Status
              {open ? (
                <MinusIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </DisclosureButton>
            <DisclosurePanel className="space-y-2 pt-4">
              {statuses.map((st) => (
                <button
                  key={st.value}
                  onClick={() =>
                    updateFilters(
                      "status",
                      st.value === currentStatus ? null : st.value
                    )
                  }
                  className={cn(
                    "flex w-full items-center gap-3 text-left text-sm",
                    st.value === currentStatus
                      ? "font-semibold text-indigo-700"
                      : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  {/* Radio appearance */}
                  <span
                    className={cn(
                      "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                      st.value === currentStatus
                        ? "border-indigo-700"
                        : "border-gray-400"
                    )}
                  >
                    {st.value === currentStatus && (
                      <span className="h-2 w-2 rounded-full bg-indigo-700" />
                    )}
                  </span>
                  {st.label}
                </button>
              ))}
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>

      {/* Search removed in sidebar/mobile filters; global search available on top */}
    </div>
  )
}
