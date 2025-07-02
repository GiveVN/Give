const fetch = require("node-fetch")

async function createCategory() {
  try {
    const categories = [
      {
        Name: "Education",
        Slug: "education",
        Description: "Educational projects and scholarships",
        Icon: "📚",
      },
      {
        Name: "Technology",
        Slug: "technology",
        Description: "Tech innovations and digital solutions",
        Icon: "💻",
      },
      {
        Name: "Environment",
        Slug: "environment",
        Description: "Environmental protection and sustainability",
        Icon: "🌱",
      },
      {
        Name: "Community",
        Slug: "community",
        Description: "Community development and social impact",
        Icon: "🤝",
      },
    ]

    for (const category of categories) {
      const categoryData = {
        data: {
          ...category,
          publishedAt: new Date().toISOString(),
        },
      }

      const response = await fetch("http://localhost:1338/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error(
          `Failed to create category ${category.Name}:`,
          response.status,
          error
        )
        continue
      }

      const created = await response.json()
      console.log(
        `✅ Created category: ${category.Name} (ID: ${created.data.id})`
      )
    }

    console.log("\n✅ All categories created successfully!")
  } catch (error) {
    console.error("Error:", error)
  }
}

createCategory()
