"use client"

import { forwardRef } from "react"
import { LucideProps } from "lucide-react"

interface IconProps extends LucideProps {
  children: React.ReactElement
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ children, ...props }, ref) => {
    return <span suppressHydrationWarning>{children}</span>
  }
)

Icon.displayName = "Icon"
