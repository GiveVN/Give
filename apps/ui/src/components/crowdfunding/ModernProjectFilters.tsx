"use client"

import { useState } from "react"
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
import { ProjectFiltersProps } from "./ProjectFilters"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FunnelIcon } from "@heroicons/react/24/outline"

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "goal_low", label: "Goal: Low to High" },
  { value: "goal_high", label: "Goal: High to Low" },
]

const categories = [
  { value: "technology_innovation", label: "Technology" },
  { value: "environment_sustainability", label: "Environment" },
  { value: "health_medical", label: "Health" },
  { value: "arts_culture", label: "Arts & Culture" },
  { value: "community", label: "Community" },
  { value: "education", label: "Education" },
  { value: "business", label: "Business" },
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
  currentCategory,
  currentStatus,
  currentSearch,
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

      {/* Categories */}
      <Disclosure as="div" defaultOpen>
        {({ open }) => (
          <div className="border-b border-gray-200 pb-4">
            <DisclosureButton className="flex w-full items-center justify-between text-sm font-medium text-gray-900">
              Category
              {open ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
            </DisclosureButton>
            <DisclosurePanel className="pt-4 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => updateFilters("category", cat.value === currentCategory ? null : cat.value)}
                  className={cn(
                    cat.value === currentCategory ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900",
                    "block w-full text-left text-sm"
                  )}
                >
                  {cat.label}
                </button>
              ))}
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
              {open ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
            </DisclosureButton>
            <DisclosurePanel className="pt-4 space-y-2">
              {statuses.map((st) => (
                <button
                  key={st.value}
                  onClick={() => updateFilters("status", st.value === currentStatus ? null : st.value)}
                  className={cn(
                    "flex items-center w-full text-left text-sm gap-3",
                    st.value === currentStatus ? "text-indigo-700 font-semibold" : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  {/* Radio appearance */}
                  <span
                    className={cn(
                      "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                      st.value === currentStatus ? "border-indigo-700" : "border-gray-400"
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