import { NextRequest, NextResponse } from "next/server"

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1338"

// GET - Fetch project updates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const queryString = searchParams.toString()

  try {
    const response = await fetch(
      `${STRAPI_URL}/api/project-updates?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching project updates:", error)
    return NextResponse.json(
      { error: "Failed to fetch project updates" },
      { status: 500 }
    )
  }
}

// POST - Create new project update
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data = formData.get("data") as string

    if (!data) {
      return NextResponse.json({ error: "Missing data field" }, { status: 400 })
    }

    const updateData = JSON.parse(data)

    // Validate required fields
    if (!updateData.Title || !updateData.Content || !updateData.Project) {
      return NextResponse.json(
        { error: "Missing required fields: Title, Content, or Project" },
        { status: 400 }
      )
    }

    // Create FormData for Strapi submission
    const strapiFormData = new FormData()
    strapiFormData.append("data", JSON.stringify(updateData))

    // Handle file uploads
    const imageFiles = formData.getAll("files.Images")
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file, index) => {
        if (file instanceof File) {
          strapiFormData.append(`files.Images`, file)
        }
      })
    }

    // Submit to Strapi
    const response = await fetch(`${STRAPI_URL}/api/project-updates`, {
      method: "POST",
      body: strapiFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Strapi error:", errorText)
      throw new Error(`Strapi error: ${response.status}`)
    }

    const result = await response.json()

    // Send email notifications to project supporters
    try {
      await sendUpdateNotifications(updateData.Project, result.data)
    } catch (emailError) {
      console.error("Failed to send email notifications:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: "Project update created successfully",
    })
  } catch (error) {
    console.error("Error creating project update:", error)
    return NextResponse.json(
      {
        error: "Failed to create project update",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// Helper function to send email notifications
async function sendUpdateNotifications(projectId: string, updateData: any) {
  try {
    // Get project details
    const projectResponse = await fetch(
      `${STRAPI_URL}/api/projects/${projectId}?populate[0]=Owner&populate[1]=Donations.Giver`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!projectResponse.ok) {
      throw new Error("Failed to fetch project details")
    }

    const projectData = await projectResponse.json()
    const project = projectData.data

    if (!project || !project.Donations) {
      console.log("No project or donations found")
      return
    }

    // Get unique donor emails (excluding anonymous donations)
    const donorEmails = new Set<string>()
    project.Donations.forEach((donation: any) => {
      if (donation.Giver?.email && !donation.isAnonymous) {
        donorEmails.add(donation.Giver.email)
      }
    })

    console.log(`Found ${donorEmails.size} unique donors to notify`)

    // Send notification emails
    for (const email of donorEmails) {
      try {
        await fetch("/api/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "project_update",
            to: email,
            data: {
              projectTitle: project.Title,
              projectSlug: project.Slug,
              updateTitle: updateData.Title,
              updateExcerpt:
                updateData.Excerpt || updateData.Content.substring(0, 300),
              projectOwner: project.Owner?.username || "Project Creator",
              updateUrl: `${process.env.FRONTEND_URL}/projects/${project.Slug}#updates`,
            },
          }),
        })
      } catch (emailError) {
        console.error(`Failed to send email to ${email}:`, emailError)
        // Continue with other emails
      }
    }

    console.log(
      `Successfully processed notifications for ${donorEmails.size} donors`
    )
  } catch (error) {
    console.error("Error in sendUpdateNotifications:", error)
    throw error
  }
}
