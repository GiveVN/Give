import { cn } from "@/lib/utils"

interface TypeBadgeProps {
  type: "give" | "back"
  className?: string
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        {
          "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300":
            type === "give",
          "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300":
            type === "back",
        },
        className
      )}
    >
      {type === "give" ? "❤️ Give" : "🚀 Back"}
    </span>
  )
}
