"use client"

import { useState, useEffect } from "react"
import {
    Search,
    Filter,
    MoreVertical,
    Shield,
    UserX,
    Mail,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Eye,
    Edit,
    Trash2,
    Download,
    RefreshCw
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

import { AdminUser, AdminRoleType, hasPermission, AdminPermission } from "@/lib/auth/admin"

interface User {
    id: string
    username: string
    email: string
    role: string
    blocked: boolean
    confirmed: boolean
    createdAt: string
    updatedAt: string
    lastLoginAt?: string
    projectsCount: number
    donationsCount: number
    totalDonated: number
}

interface UserManagementProps {
    adminUser: AdminUser
}

export default function UserManagement({ adminUser }: UserManagementProps) {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    const adminRole = adminUser.role as AdminRoleType

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/admin/users")
            if (response.ok) {
                const data = await response.json()
                setUsers(data.users || [])
            } else {
                toast.error("Failed to fetch users")
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Error loading users")
        } finally {
            setLoading(false)
        }
    }

    const handleUserAction = async (userId: string, action: string) => {
        if (!hasPermission(adminRole, AdminPermission.MANAGE_USERS)) {
            toast.error("You don't have permission to perform this action")
            return
        }

        try {
            setActionLoading(userId)

            const response = await fetch(`/api/admin/users/${userId}/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                toast.success(`User ${action} successful`)
                await fetchUsers() // Refresh the list
            } else {
                const errorData = await response.json()
                toast.error(errorData.message || `Failed to ${action} user`)
            }
        } catch (error) {
            console.error(`Error ${action} user:`, error)
            toast.error(`Error ${action} user`)
        } finally {
            setActionLoading(null)
        }
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && !user.blocked) ||
            (statusFilter === "blocked" && user.blocked) ||
            (statusFilter === "unconfirmed" && !user.confirmed)

        const matchesRole =
            roleFilter === "all" ||
            user.role === roleFilter

        return matchesSearch && matchesStatus && matchesRole
    })

    const getUserStatusBadge = (user: User) => {
        if (user.blocked) {
            return <Badge variant="destructive">Blocked</Badge>
        }
        if (!user.confirmed) {
            return <Badge variant="secondary">Unconfirmed</Badge>
        }
        return <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
    }

    const getUserRoleBadge = (role: string) => {
        const colors = {
            "super-admin": "bg-red-100 text-red-800",
            "admin": "bg-purple-100 text-purple-800",
            "moderator": "bg-blue-100 text-blue-800",
            "authenticated": "bg-gray-100 text-gray-800",
        }

        return (
            <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
                {role.replace("-", " ").replace("authenticated", "user")}
            </Badge>
        )
    }

    const UserActionsMenu = ({ user }: { user: User }) => {
        const canSuspend = hasPermission(adminRole, AdminPermission.SUSPEND_USERS)
        const canDelete = hasPermission(adminRole, AdminPermission.DELETE_USERS)
        const canManage = hasPermission(adminRole, AdminPermission.MANAGE_USERS)

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>

                    {canManage && (
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {canSuspend && !user.blocked && (
                        <DropdownMenuItem
                            onClick={() => handleUserAction(user.id, "suspend")}
                            className="text-yellow-600"
                        >
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend User
                        </DropdownMenuItem>
                    )}

                    {canSuspend && user.blocked && (
                        <DropdownMenuItem
                            onClick={() => handleUserAction(user.id, "unsuspend")}
                            className="text-green-600"
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Unsuspend User
                        </DropdownMenuItem>
                    )}

                    {canDelete && (
                        <DropdownMenuItem
                            onClick={() => handleUserAction(user.id, "delete")}
                            className="text-red-600"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    const UserDetailsModal = () => {
        if (!selectedUser) return null

        return (
            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                            Detailed information about {selectedUser.username}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg">
                                    {selectedUser.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">{selectedUser.username}</h3>
                                <p className="text-gray-600">{selectedUser.email}</p>
                                <div className="flex space-x-2">
                                    {getUserStatusBadge(selectedUser)}
                                    {getUserRoleBadge(selectedUser.role)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <h4 className="font-medium">Account Information</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">User ID:</span>
                                        <span className="font-mono">{selectedUser.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Created:</span>
                                        <span>{formatDistanceToNow(new Date(selectedUser.createdAt), { addSuffix: true })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Last Login:</span>
                                        <span>
                                            {selectedUser.lastLoginAt
                                                ? formatDistanceToNow(new Date(selectedUser.lastLoginAt), { addSuffix: true })
                                                : "Never"
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Confirmed:</span>
                                        <span>{selectedUser.confirmed ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-medium">Platform Activity</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Projects Created:</span>
                                        <span>{selectedUser.projectsCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Donations Made:</span>
                                        <span>{selectedUser.donationsCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Donated:</span>
                                        <span>${selectedUser.totalDonated.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedUser(null)}>
                            Close
                        </Button>
                        {hasPermission(adminRole, AdminPermission.MANAGE_USERS) && (
                            <Button>Edit User</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <p className="text-gray-600">Manage user accounts and permissions</p>
                </div>

                <div className="flex space-x-2">
                    <Button variant="outline" onClick={fetchUsers}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search users by username or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                                <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="authenticated">Users</SelectItem>
                                <SelectItem value="moderator">Moderators</SelectItem>
                                <SelectItem value="admin">Admins</SelectItem>
                                <SelectItem value="super-admin">Super Admins</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                            <Shield className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Users</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(u => !u.blocked && u.confirmed).length}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Blocked Users</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(u => u.blocked).length}
                                </p>
                            </div>
                            <UserX className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Unconfirmed</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(u => !u.confirmed).length}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Users ({filteredUsers.length})</CardTitle>
                    <CardDescription>
                        {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                            ? `Showing filtered results (${filteredUsers.length} of ${users.length})`
                            : `All registered users`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <RefreshCw className="h-6 w-6 animate-spin" />
                            <span className="ml-2">Loading users...</span>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Activity</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.username}</div>
                                                    <div className="text-sm text-gray-600">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getUserRoleBadge(user.role)}
                                        </TableCell>
                                        <TableCell>
                                            {getUserStatusBadge(user)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm space-y-1">
                                                <div>{user.projectsCount} projects</div>
                                                <div>{user.donationsCount} donations</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {actionLoading === user.id ? (
                                                <RefreshCw className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <UserActionsMenu user={user} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {!loading && filteredUsers.length === 0 && (
                        <div className="text-center py-8">
                            <Shield className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm ? "Try adjusting your search terms" : "No users match the current filters"}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <UserDetailsModal />
        </div>
    )
}