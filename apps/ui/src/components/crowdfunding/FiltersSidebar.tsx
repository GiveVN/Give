"use client"

import type { ProjectFiltersProps } from "./ProjectFilters"

import ModernProjectFilters from "./ModernProjectFilters"

export default function FiltersSidebar(props: ProjectFiltersProps) {
  return (
    <aside className="mt-6 hidden w-64 shrink-0 lg:block">
      <div className="sticky top-28">
        <ModernProjectFilters {...props} />
      </div>
    </aside>
  )
}
