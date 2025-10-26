import React from "react"

import { cn } from "@/lib/utils"

// Card Container Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gray" | "dark-gray" | "no-shadow"
  rounded?: "default" | "mobile-safe"
  children: React.ReactNode
}

export function Card({
  variant = "default",
  rounded = "default",
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = "overflow-hidden"

  const variantStyles = {
    default: "bg-white shadow-sm",
    gray: "bg-gray-50",
    "dark-gray": "bg-gray-200",
    "no-shadow": "bg-white",
  }

  const roundedStyles = {
    default: "rounded-lg",
    "mobile-safe": "sm:rounded-lg",
  }

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        roundedStyles[rounded],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gray"
  children: React.ReactNode
}

export function CardHeader({
  variant = "default",
  className,
  children,
  ...props
}: CardHeaderProps) {
  const baseStyles = "px-4 py-5 sm:px-6"

  const variantStyles = {
    default: "",
    gray: "bg-gray-50",
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Card Body/Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gray"
  children: React.ReactNode
}

export function CardContent({
  variant = "default",
  className,
  children,
  ...props
}: CardContentProps) {
  const baseStyles = "px-4 py-5 sm:p-6"

  const variantStyles = {
    default: "",
    gray: "bg-gray-50",
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gray"
  children: React.ReactNode
}

export function CardFooter({
  variant = "default",
  className,
  children,
  ...props
}: CardFooterProps) {
  const baseStyles = "px-4 py-4 sm:px-6"

  const variantStyles = {
    default: "",
    gray: "bg-gray-50",
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Card with Dividers Component (Composite)
interface CardWithDividersProps extends CardProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export function CardWithDividers({
  header,
  footer,
  children,
  ...cardProps
}: CardWithDividersProps) {
  return (
    <Card
      {...cardProps}
      className={cn("divide-y divide-gray-200", cardProps.className)}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

// Convenience exports for common patterns
export const SimpleCard = Card
export const CardWithHeader = CardWithDividers
export const CardWithFooter = CardWithDividers

// Example usage patterns matching Tailwind Plus examples:
/*
// Simple card
<Card>
  <CardContent>Your content here</CardContent>
</Card>

// Card with header
<Card className="divide-y divide-gray-200">
  <CardHeader>Header content</CardHeader>
  <CardContent>Body content</CardContent>
</Card>

// Card with footer
<Card className="divide-y divide-gray-200">
  <CardContent>Body content</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>

// Card with header and footer
<CardWithDividers
  header="Header content"
  footer="Footer content"
>
  Body content
</CardWithDividers>

// Gray background card
<Card variant="gray">
  <CardContent>Your content here</CardContent>
</Card>

// Card with gray footer
<Card>
  <CardContent>Body content</CardContent>
  <CardFooter variant="gray">Footer content</CardFooter>
</Card>

// Mobile-safe rounded corners
<Card rounded="mobile-safe">
  <CardContent>Your content here</CardContent>
</Card>
*/
