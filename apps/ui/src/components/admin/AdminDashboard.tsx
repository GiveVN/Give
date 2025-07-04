"use client"

import { useState, useEffect } from "react"
import {
    Users,
    FolderOpen,
    MessageSquare,
    TrendingUp,
    Shield,
    Settings,
    BarChart3,
    AlertTriangle,
    CheckCircle,
    Clock,
    DollarSign,
    Activity,
    Bell,
    Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    AdminUser,
    AdminRoleType,
    getAdminRoleDisplayName,
    getAdminRoleBadgeColor,
    canManageUsers,
    canModerateContent,
    canManageProjects,
    hasPermission,
    AdminPermission,
} from "@/lib/auth/admin"
import UserManagement from "./UserManagement"

interface DashboardStats {
    totalUsers: number
    totalProjects: number
    totalDonations: number
    totalRevenue: number
    pendingProjects: number
    flaggedContent: number
    activeUsers24h: number
    recentSignups: number
}

interface AdminDashboardProps {
    adminUser: AdminUser
}

export default function AdminDashboard({ adminUser }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState("overview")
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalProjects: 0,
        totalDonations: 0,
        totalRevenue: 0,
        pendingProjects: 0,
        flaggedContent: 0,
        activeUsers24h: 0,
        recentSignups: 0,
    })
    const [loading, setLoading] = useState(true)

    const adminRole = adminUser.role as AdminRoleType

    useEffect(() => {
        fetchDashboardStats()
    }, [])

    const fetchDashboardStats = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/admin/dashboard-stats")
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error)
        } finally {
            setLoading(false)
        }
    }

    const StatCard = ({
        title,
        value,
        change,
        icon: Icon,
        color = "blue"
    }: {
        title: string
        value: string | number
        change?: string
        icon: any
        color?: string
    }) => (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                        {change && (
                            <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {change} from last month
                            </p>
                        )}
                    </div>
                    <div className={`p-3 rounded-full bg-${color}-100`}>
                        <Icon className={`h-6 w-6 text-${color}-600`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const QuickActionCard = ({
        title,
        description,
        icon: Icon,
        action,
        disabled = false,
        variant = "outline" as "outline" | "default"
    }: {
        title: string
        description: string
        icon: any
        action: () => void
        disabled?: boolean
        variant?: "outline" | "default"
    }) => (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                        <Button
                            variant={variant}
                            size="sm"
                            onClick={action}
                            disabled={disabled}
                            className="mt-3"
                        >
                            {disabled ? "No Access" : "Open"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {adminUser.username}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 w-80"
                                />
                            </div>

                            <Button variant="outline" size="icon">
                                <Bell className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium">{adminUser.username}</p>
                                    <Badge className={getAdminRoleBadgeColor(adminRole)}>
                                        {getAdminRoleDisplayName(adminRole)}
                                    </Badge>
                                </div>
                                <Avatar>
                                    <AvatarFallback>
                                        {adminUser.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6 max-w-4xl">
                        <TabsTrigger value="overview">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Overview
                        </TabsTrigger>

                        {canManageUsers(adminRole) && (
                            <TabsTrigger value="users">
                                <Users className="mr-2 h-4 w-4" />
                                Users
                            </TabsTrigger>
                        )}

                        {canManageProjects(adminRole) && (
                            <TabsTrigger value="projects">
                                <FolderOpen className="mr-2 h-4 w-4" />
                                Projects
                            </TabsTrigger>
                        )}

                        {canModerateContent(adminRole) && (
                            <TabsTrigger value="moderation">
                                <Shield className="mr-2 h-4 w-4" />
                                Moderation
                            </TabsTrigger>
                        )}

                        {hasPermission(adminRole, AdminPermission.VIEW_ANALYTICS) && (
                            <TabsTrigger value="analytics">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Analytics
                            </TabsTrigger>
                        )}

                        {hasPermission(adminRole, AdminPermission.SYSTEM_SETTINGS) && (
                            <TabsTrigger value="settings">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </TabsTrigger>
                        )}
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Users"
                                value={stats.totalUsers.toLocaleString()}
                                change="+12%"
                                icon={Users}
                                color="blue"
                            />
                            <StatCard
                                title="Active Projects"
                                value={stats.totalProjects.toLocaleString()}
                                change="+8%"
                                icon={FolderOpen}
                                color="green"
                            />
                            <StatCard
                                title="Total Revenue"
                                value={`$${stats.totalRevenue.toLocaleString()}`}
                                change="+15%"
                                icon={DollarSign}
                                color="purple"
                            />
                            <StatCard
                                title="Active Users (24h)"
                                value={stats.activeUsers24h.toLocaleString()}
                                change="+5%"
                                icon={Activity}
                                color="orange"
                            />
                        </div>

                        {/* Alerts & Notifications */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>System Status</CardTitle>
                                    <CardDescription>Real-time platform health</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="font-medium">All Systems Operational</span>
                                            </div>
                                            <Badge variant="outline" className="bg-green-100 text-green-800">
                                                Healthy
                                            </Badge>
                                        </div>

                                        {stats.pendingProjects > 0 && (
                                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <Clock className="h-5 w-5 text-yellow-600" />
                                                    <span className="font-medium">
                                                        {stats.pendingProjects} projects awaiting approval
                                                    </span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Review
                                                </Button>
                                            </div>
                                        )}

                                        {stats.flaggedContent > 0 && (
                                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                                    <span className="font-medium">
                                                        {stats.flaggedContent} flagged content items
                                                    </span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Moderate
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="text-sm">
                                            <p className="font-medium">New user registrations</p>
                                            <p className="text-gray-600">{stats.recentSignups} today</p>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium">Projects created</p>
                                            <p className="text-gray-600">5 today</p>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium">Donations processed</p>
                                            <p className="text-gray-600">${stats.totalDonations.toLocaleString()} today</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    Common administrative tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <QuickActionCard
                                        title="User Management"
                                        description="Manage user accounts and permissions"
                                        icon={Users}
                                        action={() => setActiveTab("users")}
                                        disabled={!canManageUsers(adminRole)}
                                        variant={canManageUsers(adminRole) ? "default" : "outline"}
                                    />

                                    <QuickActionCard
                                        title="Project Review"
                                        description="Review and approve pending projects"
                                        icon={FolderOpen}
                                        action={() => setActiveTab("projects")}
                                        disabled={!canManageProjects(adminRole)}
                                        variant={canManageProjects(adminRole) ? "default" : "outline"}
                                    />

                                    <QuickActionCard
                                        title="Content Moderation"
                                        description="Review flagged content and reports"
                                        icon={Shield}
                                        action={() => setActiveTab("moderation")}
                                        disabled={!canModerateContent(adminRole)}
                                        variant={canModerateContent(adminRole) ? "default" : "outline"}
                                    />

                                    <QuickActionCard
                                        title="Analytics"
                                        description="View platform analytics and reports"
                                        icon={BarChart3}
                                        action={() => setActiveTab("analytics")}
                                        disabled={!hasPermission(adminRole, AdminPermission.VIEW_ANALYTICS)}
                                    />

                                    <QuickActionCard
                                        title="System Settings"
                                        description="Configure platform settings"
                                        icon={Settings}
                                        action={() => setActiveTab("settings")}
                                        disabled={!hasPermission(adminRole, AdminPermission.SYSTEM_SETTINGS)}
                                    />

                                    <QuickActionCard
                                        title="Financial Overview"
                                        description="View revenue and transaction data"
                                        icon={DollarSign}
                                        action={() => setActiveTab("analytics")}
                                        disabled={!hasPermission(adminRole, AdminPermission.VIEW_FINANCIALS)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* User Management Tab */}
                    <TabsContent value="users">
                        <UserManagement adminUser={adminUser} />
                    </TabsContent>

                    <TabsContent value="projects">
                        <Card>
                            <CardContent className="py-8 text-center">
                                <FolderOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium">Project Management</h3>
                                <p className="text-gray-600">Project management interface coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="moderation">
                        <Card>
                            <CardContent className="py-8 text-center">
                                <Shield className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium">Content Moderation</h3>
                                <p className="text-gray-600">Moderation tools coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <Card>
                            <CardContent className="py-8 text-center">
                                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium">Analytics Dashboard</h3>
                                <p className="text-gray-600">Analytics dashboard coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardContent className="py-8 text-center">
                                <Settings className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium">System Settings</h3>
                                <p className="text-gray-600">Settings panel coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}