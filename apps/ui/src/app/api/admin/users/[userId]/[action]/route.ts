import { NextRequest, NextResponse } from "next/server"
import { PrivateStrapiClient } from "@/lib/strapi-api"

interface RouteParams {
    userId: string
    action: string
}

export async function POST(
    request: NextRequest,
    { params }: { params: RouteParams }
) {
    try {
        const { userId, action } = params

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

        // Check specific permissions for each action
        let hasPermission = false
        switch (action) {
            case "suspend":
            case "unsuspend":
                hasPermission = ["super-admin", "admin", "moderator"].includes(userRole)
                break
            case "delete":
                hasPermission = ["super-admin", "admin"].includes(userRole)
                break
            case "edit":
                hasPermission = ["super-admin", "admin"].includes(userRole)
                break
            default:
                return NextResponse.json(
                    { error: "Invalid action" },
                    { status: 400 }
                )
        }

        if (!hasPermission) {
            return NextResponse.json(
                { error: `Insufficient permissions to ${action} users` },
                { status: 403 }
            )
        }

        // Prevent self-modification
        if (adminUser.id.toString() === userId) {
            return NextResponse.json(
                { error: "Cannot perform actions on your own account" },
                { status: 400 }
            )
        }

        // Fetch target user to verify they exist
        const targetUserResponse = await PrivateStrapiClient.fetchAPI(`/users/${userId}?populate=role`)
        if (!targetUserResponse.ok) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        const targetUser = await targetUserResponse.json()

        // Prevent actions on higher-level admins
        const targetUserRole = targetUser.role?.type || "authenticated"
        const adminHierarchy = {
            "super-admin": 4,
            "admin": 3,
            "moderator": 2,
            "support": 1,
            "authenticated": 0
        }

        const adminLevel = adminHierarchy[userRole as keyof typeof adminHierarchy] || 0
        const targetLevel = adminHierarchy[targetUserRole as keyof typeof adminHierarchy] || 0

        if (targetLevel >= adminLevel) {
            return NextResponse.json(
                { error: "Cannot perform actions on users with equal or higher privileges" },
                { status: 403 }
            )
        }

        let updateData: any = {}
        let successMessage = ""

        switch (action) {
            case "suspend":
                updateData = { blocked: true }
                successMessage = "User suspended successfully"
                break

            case "unsuspend":
                updateData = { blocked: false }
                successMessage = "User unsuspended successfully"
                break

            case "delete":
                // For delete, we'll make a separate API call
                const deleteResponse = await PrivateStrapiClient.fetchAPI(`/users/${userId}`, {
                    method: "DELETE"
                })

                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete user")
                }

                // Log the action
                await logAdminAction(adminUser.id, "delete_user", {
                    targetUserId: userId,
                    targetUserEmail: targetUser.email,
                    targetUserRole: targetUserRole
                })

                return NextResponse.json({
                    success: true,
                    message: "User deleted successfully"
                })

            case "edit":
                // For edit actions, we'd need to handle the specific fields
                const body = await request.json()
                updateData = body.updates || {}
                successMessage = "User updated successfully"
                break
        }

        // Update the user
        const updateResponse = await PrivateStrapiClient.fetchAPI(`/users/${userId}`, {
            method: "PUT",
            body: updateData
        })

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text()
            throw new Error(`Failed to update user: ${errorText}`)
        }

        const updatedUser = await updateResponse.json()

        // Log the admin action
        await logAdminAction(adminUser.id, action, {
            targetUserId: userId,
            targetUserEmail: targetUser.email,
            targetUserRole: targetUserRole,
            changes: updateData
        })

        return NextResponse.json({
            success: true,
            message: successMessage,
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                blocked: updatedUser.blocked,
                confirmed: updatedUser.confirmed,
                role: updatedUser.role?.type || "authenticated"
            }
        })

    } catch (error) {
        console.error(`Error performing user action ${params.action}:`, error)
        return NextResponse.json(
            {
                error: `Failed to ${params.action} user`,
                message: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        )
    }
}

// Helper function to log admin actions (for audit trail)
async function logAdminAction(
    adminId: string,
    action: string,
    details: any
) {
    try {
        // This would typically log to a separate audit log table
        // For now, we'll just console log
        console.log(`Admin Action Log:`, {
            adminId,
            action,
            details,
            timestamp: new Date().toISOString()
        })

        // In a real implementation, you might want to create an audit log entry in Strapi:
        // await PrivateStrapiClient.fetchAPI("/admin-logs", {
        //   method: "POST",
        //   body: {
        //     adminId,
        //     action,
        //     details: JSON.stringify(details),
        //     timestamp: new Date().toISOString()
        //   }
        // })

    } catch (error) {
        console.error("Failed to log admin action:", error)
        // Don't throw - logging failures shouldn't prevent the main action
    }
}