import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { PrivateStrapiClient } from "@/lib/strapi-api"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Validate user access
    if (!session || session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch donations from Strapi
    const response = await PrivateStrapiClient.fetchAPI(
      `/donations?filters[Giver][id][$eq]=${userId}&populate[Project][fields][0]=Title&populate[Project][fields][1]=Slug&sort[0]=createdAt:desc`
    )

    if (!response.ok) {
      throw new Error("Failed to fetch donations")
    }

    const data = await response.json()

    return NextResponse.json({
      donations: data.data.map((donation: any) => ({
        id: donation.id,
        Amount: donation.attributes.Amount,
        Currency: donation.attributes.Currency,
        PaymentStatus: donation.attributes.PaymentStatus,
        PaymentMethod: donation.attributes.PaymentMethod,
        Message: donation.attributes.Message,
        createdAt: donation.attributes.createdAt,
        Project: {
          id: donation.attributes.Project.data.id,
          Title: donation.attributes.Project.data.attributes.Title,
          Slug: donation.attributes.Project.data.attributes.Slug,
        },
      })),
    })
  } catch (error) {
    console.error("Error fetching donation history:", error)
    return NextResponse.json(
      { error: "Failed to fetch donation history" },
      { status: 500 }
    )
  }
}
