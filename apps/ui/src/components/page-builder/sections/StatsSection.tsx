import React from "react"

interface StatItem {
  id: number
  label: string
  value: string
  description?: string
}

interface StatsSectionProps {
  title?: string
  subtitle?: string
  stats?: StatItem[]
}

export function StatsSection({
  title,
  subtitle,
  stats = [],
}: StatsSectionProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mb-2 text-4xl font-bold text-green-600">
                {stat.value}
              </div>
              <div className="mb-1 text-lg font-medium text-gray-900">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-gray-600">{stat.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
