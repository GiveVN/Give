"use client"

import ModernProjectFilters from "./ModernProjectFilters"
import type { ProjectFiltersProps } from "./ProjectFilters"

export default function FiltersSidebar(props: ProjectFiltersProps) {
  return (
    <aside className="hidden lg:block w-72 shrink-0 mt-6">
      <div className="sticky top-28">
        <ModernProjectFilters {...props} />
      </div>
    </aside>
  )
} 