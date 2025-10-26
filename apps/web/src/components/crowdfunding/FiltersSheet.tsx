"use client"

import { useState } from "react"
import { Dialog, DialogPanel } from "@headlessui/react"
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"

import type { ProjectFiltersProps } from "./ProjectFilters"

import { Button } from "@/components/ui/button"

import ModernProjectFilters from "./ModernProjectFilters"

export default function FiltersSheet(props: ProjectFiltersProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger button visible on mobile only */}
      <div className="mb-4 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <FunnelIcon className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 left-0 w-full overflow-y-auto bg-white p-6 sm:max-w-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Close filters panel"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <ModernProjectFilters {...props} />
        </DialogPanel>
      </Dialog>
    </>
  )
}
