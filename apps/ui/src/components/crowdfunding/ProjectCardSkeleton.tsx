import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectCardSkeleton() {
  return (
    <div className="group relative">
      <div className="relative bg-white rounded-lg border border-gray-200 overflow-visible">
        {/* Image skeleton */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content skeleton */}
        <div className="p-4">
          {/* Type badge skeleton */}
          <div className="mb-2">
            <Skeleton className="h-6 w-20" />
          </div>

          {/* Title skeleton */}
          <Skeleton className="h-6 w-3/4 mb-3" />

          {/* Progress bar skeleton */}
          <div className="mb-3">
            <Skeleton className="h-2 w-full" />
          </div>

          {/* Funding info skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
} 