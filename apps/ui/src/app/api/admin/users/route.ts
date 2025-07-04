import { NextRequest, NextResponse } from "next/server"
import { PrivateStrapiClient } from "@/lib/strapi-api"

export async function GET(request: NextRequest) {
    try {
        // Validate admin authentication
        const authResponse = await PrivateStrapiClient.fetchAPI("/users/me")
        if (!authResponse.ok) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const adminUser = await authResponse.json()
        const userRole = adminUser.role?.type || ""

        // Check if user has admin privileges
        const adminRoles = ["super-admin", "admin", "moderator", "support"]
        if (!adminRoles.includes(userRole)) {
            return NextResponse.json(
                { error: "Access denied. Admin privileges required." },
                { status: 403 }
            )
        }

        // Check if user has permission to view user details
        const canViewUsers = ["super-admin", "admin", "moderator", "support"].includes(userRole)
        if (!canViewUsers) {
            return NextResponse.json(
                { error: "Insufficient permissions to view users" },
                { status: 403 }
            )
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get("page") || "1")
        const pageSize = parseInt(searchParams.get("pageSize") || "25")
        const search = searchParams.get("search") || ""
        const status = searchParams.get("status") || "all"
        const role = searchParams.get("role") || "all"

        // Build query filters
        let filters: string[] = []

        if (search) {
            filters.push(`filters[$or][0][username][$containsi]=${encodeURIComponent(search)}`)
            filters.push(`filters[$or][1][email][$containsi]=${encodeURIComponent(search)}`)
        }

        if (status !== "all") {
            switch (status) {
                case "active":
                    filters.push("filters[blocked][$eq]=false")
                    filters.push("filters[confirmed][$eq]=true")
                    break
                case "blocked":
                    filters.push("filters[blocked][$eq]=true")
                    break
                case "unconfirmed":
                    filters.push("filters[confirmed][$eq]=false")
                    break
            }
        }

        if (role !== "all") {
            filters.push(`filters[role][type][$eq]=${role}`)
        }

        // Build query string
        const queryParams = [
            `pagination[page]=${page}`,
            `pagination[pageSize]=${pageSize}`,
            "populate[0]=role",
            "sort[0]=createdAt:desc",
            ...filters
        ]

        const queryString = queryParams.join("&")

        // Fetch users from Strapi
        const usersResponse = await PrivateStrapiClient.fetchAPI(`/users?${queryString}`)

        if (!usersResponse.ok) {
            throw new Error("Failed to fetch users from Strapi")
        }

        const usersData = await usersResponse.json()

        // For each user, fetch their project and donation counts
        const enrichedUsers = await Promise.all(
            usersData.data.map(async (user: any) => {
                try {
                    // Fetch user's projects count
                    const projectsResponse = await PrivateStrapiClient.fetchAPI(
                        `/projects?filters[Owner][id][$eq]=${user.id}&pagination[pageSize]=1`
                    )
                    const projectsCount = projectsResponse.ok ?
                        (await projectsResponse.json()).meta?.pagination?.total || 0 : 0

                    // Fetch user's donations count
                    const donationsResponse = await PrivateStrapiClient.fetchAPI(
                        `/donations?filters[Giver][id][$eq]=${user.id}&pagination[pageSize]=1`
                    )
                    const donationsData = donationsResponse.ok ? await donationsResponse.json() : null
                    const donationsCount = donationsData?.meta?.pagination?.total || 0

                    // Calculate total donated (simplified)
                    const totalDonated = donationsCount * 75 // Average donation estimate

                    return {
                        id: user.id.toString(),
                        username: user.username,
                        email: user.email,
                        role: user.role?.type || "authenticated",
                        blocked: user.blocked || false,
                        confirmed: user.confirmed || false,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        lastLoginAt: user.lastLoginAt || null,
                        projectsCount,
                        donationsCount,
                        totalDonated,
                    }
                } catch (error) {
                    console.error(`Error enriching user ${user.id}:`, error)
                    // Return basic user data if enrichment fails
                    return {
                        id: user.id.toString(),
                        username: user.username,
                        email: user.email,
                        role: user.role?.type || "authenticated",
                        blocked: user.blocked || false,
                        confirmed: user.confirmed || false,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        lastLoginAt: user.lastLoginAt || null,
                        projectsCount: 0,
                        donationsCount: 0,
                        totalDonated: 0,
                    }
                }
            })
        )

        return NextResponse.json({
            users: enrichedUsers,
            pagination: usersData.meta?.pagination || {
                page: 1,
                pageSize: 25,
                pageCount: 1,
                total: enrichedUsers.length
            }
        })

    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            {
                error: "Failed to fetch users",
                message: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        )
    }
}