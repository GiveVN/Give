import { cn } from "@/lib/utils"

export function Gradient({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-blue-50 via-white to-purple-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
