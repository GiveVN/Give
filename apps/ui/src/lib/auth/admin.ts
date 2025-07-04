import { PrivateStrapiClient } from "@/lib/strapi-api"

export interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  blocked: boolean
  confirmed: boolean
  createdAt: string
  updatedAt: string
}

export interface AdminRole {
  id: string
  name: string
  description: string
  type: string
  permissions: string[]
}

// Admin role types
export enum AdminRoleType {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin", 
  MODERATOR = "moderator",
  SUPPORT = "support"
}

// Admin permissions
export enum AdminPermission {
  // User Management
  MANAGE_USERS = "manage-users",
  SUSPEND_USERS = "suspend-users", 
  DELETE_USERS = "delete-users",
  VIEW_USER_DETAILS = "view-user-details",
  
  // Project Management
  MANAGE_PROJECTS = "manage-projects",
  APPROVE_PROJECTS = "approve-projects",
  FEATURE_PROJECTS = "feature-projects",
  DELETE_PROJECTS = "delete-projects",
  
  // Content Moderation
  MODERATE_COMMENTS = "moderate-comments",
  MODERATE_UPDATES = "moderate-updates",
  HANDLE_REPORTS = "handle-reports",
  
  // System Management
  SYSTEM_SETTINGS = "system-settings",
  VIEW_ANALYTICS = "view-analytics",
  MANAGE_CATEGORIES = "manage-categories",
  EMAIL_MANAGEMENT = "email-management",
  
  // Financial
  VIEW_FINANCIALS = "view-financials",
  MANAGE_PAYOUTS = "manage-payouts",
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<AdminRoleType, AdminPermission[]> = {
  [AdminRoleType.SUPER_ADMIN]: Object.values(AdminPermission),
  
  [AdminRoleType.ADMIN]: [
    AdminPermission.MANAGE_USERS,
    AdminPermission.SUSPEND_USERS,
    AdminPermission.VIEW_USER_DETAILS,
    AdminPermission.MANAGE_PROJECTS,
    AdminPermission.APPROVE_PROJECTS,
    AdminPermission.FEATURE_PROJECTS,
    AdminPermission.MODERATE_COMMENTS,
    AdminPermission.MODERATE_UPDATES,
    AdminPermission.HANDLE_REPORTS,
    AdminPermission.VIEW_ANALYTICS,
    AdminPermission.MANAGE_CATEGORIES,
    AdminPermission.VIEW_FINANCIALS,
  ],
  
  [AdminRoleType.MODERATOR]: [
    AdminPermission.VIEW_USER_DETAILS,
    AdminPermission.SUSPEND_USERS,
    AdminPermission.APPROVE_PROJECTS,
    AdminPermission.MODERATE_COMMENTS,
    AdminPermission.MODERATE_UPDATES,
    AdminPermission.HANDLE_REPORTS,
    AdminPermission.VIEW_ANALYTICS,
  ],
  
  [AdminRoleType.SUPPORT]: [
    AdminPermission.VIEW_USER_DETAILS,
    AdminPermission.HANDLE_REPORTS,
    AdminPermission.VIEW_ANALYTICS,
  ],
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const response = await PrivateStrapiClient.fetchAPI("/users/me")
    
    if (!response.ok) {
      return false
    }
    
    const userData = await response.json()
    const userRole = userData.role?.type || ""
    
    return Object.values(AdminRoleType).includes(userRole as AdminRoleType)
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

/**
 * Get current admin user data
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const response = await PrivateStrapiClient.fetchAPI("/users/me?populate=role")
    
    if (!response.ok) {
      return null
    }
    
    const userData = await response.json()
    
    // Check if user has admin role
    const userRole = userData.role?.type || ""
    if (!Object.values(AdminRoleType).includes(userRole as AdminRoleType)) {
      return null
    }
    
    return {
      id: userData.id.toString(),
      username: userData.username,
      email: userData.email,
      role: userRole,
      blocked: userData.blocked || false,
      confirmed: userData.confirmed || false,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    }
  } catch (error) {
    console.error("Error fetching admin user:", error)
    return null
  }
}

/**
 * Check if admin has specific permission
 */
export function hasPermission(
  adminRole: AdminRoleType, 
  permission: AdminPermission
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[adminRole] || []
  return rolePermissions.includes(permission)
}

/**
 * Check multiple permissions
 */
export function hasAnyPermission(
  adminRole: AdminRoleType,
  permissions: AdminPermission[]
): boolean {
  return permissions.some(permission => hasPermission(adminRole, permission))
}

/**
 * Check if admin can manage users
 */
export function canManageUsers(adminRole: AdminRoleType): boolean {
  return hasAnyPermission(adminRole, [
    AdminPermission.MANAGE_USERS,
    AdminPermission.SUSPEND_USERS,
    AdminPermission.VIEW_USER_DETAILS,
  ])
}

/**
 * Check if admin can moderate content
 */
export function canModerateContent(adminRole: AdminRoleType): boolean {
  return hasAnyPermission(adminRole, [
    AdminPermission.MODERATE_COMMENTS,
    AdminPermission.MODERATE_UPDATES,
    AdminPermission.HANDLE_REPORTS,
  ])
}

/**
 * Check if admin can manage projects
 */
export function canManageProjects(adminRole: AdminRoleType): boolean {
  return hasAnyPermission(adminRole, [
    AdminPermission.MANAGE_PROJECTS,
    AdminPermission.APPROVE_PROJECTS,
    AdminPermission.FEATURE_PROJECTS,
  ])
}

/**
 * Get admin role display name
 */
export function getAdminRoleDisplayName(role: AdminRoleType): string {
  const roleNames = {
    [AdminRoleType.SUPER_ADMIN]: "Super Admin",
    [AdminRoleType.ADMIN]: "Admin",
    [AdminRoleType.MODERATOR]: "Moderator", 
    [AdminRoleType.SUPPORT]: "Support",
  }
  
  return roleNames[role] || role
}

/**
 * Get admin role badge color
 */
export function getAdminRoleBadgeColor(role: AdminRoleType): string {
  const colors = {
    [AdminRoleType.SUPER_ADMIN]: "bg-red-100 text-red-800",
    [AdminRoleType.ADMIN]: "bg-purple-100 text-purple-800",
    [AdminRoleType.MODERATOR]: "bg-blue-100 text-blue-800",
    [AdminRoleType.SUPPORT]: "bg-green-100 text-green-800",
  }
  
  return colors[role] || "bg-gray-100 text-gray-800"
}

/**
 * Admin login with enhanced validation
 */
export async function adminLogin(email: string, password: string): Promise<{
  success: boolean
  user?: AdminUser
  token?: string
  error?: string
}> {
  try {
    // First, attempt regular login
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.message || "Login failed"
      }
    }
    
    const loginData = await response.json()
    
    // Check if user has admin role
    const adminUser = await getAdminUser()
    if (!adminUser) {
      return {
        success: false,
        error: "Access denied. Admin privileges required."
      }
    }
    
    return {
      success: true,
      user: adminUser,
      token: loginData.jwt
    }
    
  } catch (error) {
    console.error("Admin login error:", error)
    return {
      success: false,
      error: "Login system error. Please try again."
    }
  }
}

/**
 * Validate admin session
 */
export async function validateAdminSession(): Promise<boolean> {
  try {
    const adminUser = await getAdminUser()
    return adminUser !== null && !adminUser.blocked
  } catch (error) {
    console.error("Error validating admin session:", error)
    return false
  }
}