import { getCategories } from "@/lib/strapi-api/content/category"
import { Card } from "@/components/tailwind-plus/Card"

export default async function CategoriesPage() {
  const giveCategories = await getCategories("give")
  const backCategories = await getCategories("back")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Give Categories */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            Give Categories (Charitable)
          </h2>
          <div className="space-y-3">
            {giveCategories.length === 0 ? (
              <Card className="p-4">
                <p className="text-gray-500 italic">No Give categories found. Please run the seed script.</p>
              </Card>
            ) : (
              giveCategories.map((category) => (
                <Card key={category.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{category.Icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{category.Name}</h3>
                        <p className="text-sm text-gray-600">{category.Description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">Slug: {category.Slug}</span>
                          {category.Color && (
                            <span 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: category.Color }}
                              title={category.Color}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">#{category.SortOrder}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Back Categories */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Back Categories (Creative)
          </h2>
          <div className="space-y-3">
            {backCategories.length === 0 ? (
              <Card className="p-4">
                <p className="text-gray-500 italic">No Back categories found. Please run the seed script.</p>
              </Card>
            ) : (
              backCategories.map((category) => (
                <Card key={category.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{category.Icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{category.Name}</h3>
                        <p className="text-sm text-gray-600">{category.Description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">Slug: {category.Slug}</span>
                          {category.Color && (
                            <span 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: category.Color }}
                              title={category.Color}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">#{category.SortOrder}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">How to seed categories:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>Go to Strapi Admin → Settings → API Tokens</li>
          <li>Create a new API token with full access</li>
          <li>Set environment variable: <code className="bg-gray-200 px-2 py-1 rounded">$env:STRAPI_API_TOKEN="your-token"</code></li>
          <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">.\scripts\seed-categories.ps1</code></li>
        </ol>
      </div>
    </div>
  )
} 