import { cn } from "@/lib/utils"

export function PlusGrid({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mx-auto max-w-6xl px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  )
}

export function PlusGridRow({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}

export function PlusGridItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}
