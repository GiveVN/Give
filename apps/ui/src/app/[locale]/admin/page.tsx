"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Shield,
    Lock,
    Loader2,
    AlertTriangle,
    Eye,
    EyeOff
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
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

import AdminDashboard from "@/components/admin/AdminDashboard"
import UserManagement from "@/components/admin/UserManagement"
import {
    AdminUser,
    getAdminUser,
    adminLogin,
    validateAdminSession
} from "@/lib/auth/admin"

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [loginLoading, setLoginLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState("")

    const router = useRouter()

    useEffect(() => {
        checkAdminSession()
    }, [])

    const checkAdminSession = async () => {
        try {
            setLoading(true)

            const isValid = await validateAdminSession()
            if (isValid) {
                const user = await getAdminUser()
                if (user) {
                    setAdminUser(user)
                    setIsAuthenticated(true)
                    return
                }
            }

            setIsAuthenticated(false)
        } catch (error) {
            console.error("Error checking admin session:", error)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError("")

        if (!loginForm.email || !loginForm.password) {
            setLoginError("Please fill in all fields")
            return
        }

        try {
            setLoginLoading(true)

            const result = await adminLogin(loginForm.email, loginForm.password)

            if (result.success && result.user) {
                setAdminUser(result.user)
                setIsAuthenticated(true)
                toast.success("Admin login successful!")
            } else {
                setLoginError(result.error || "Login failed")
            }
        } catch (error) {
            console.error("Login error:", error)
            setLoginError("An error occurred during login")
        } finally {
            setLoginLoading(false)
        }
    }

    const handleLogout = () => {
        setAdminUser(null)
        setIsAuthenticated(false)
        setLoginForm({ email: "", password: "" })
        toast.success("Logged out successfully")
        // Clear any stored tokens/sessions here
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Checking authentication...</span>
                </div>
            </div>
        )
    }

    // Login form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <Shield className="h-6 w-6 text-red-600" />
                        </div>
                        <CardTitle>Admin Access</CardTitle>
                        <CardDescription>
                            Enter your admin credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {loginError && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>{loginError}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={loginForm.email}
                                    onChange={(e) =>
                                        setLoginForm({ ...loginForm, email: e.target.value })
                                    }
                                    disabled={loginLoading}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={loginForm.password}
                                        onChange={(e) =>
                                            setLoginForm({ ...loginForm, password: e.target.value })
                                        }
                                        disabled={loginLoading}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loginLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loginLoading}>
                                {loginLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Sign In
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            <p>Only authorized administrators can access this area.</p>
                            <p className="mt-1">
                                Need help? Contact{" "}
                                <a
                                    href="mailto:support@give.local"
                                    className="text-blue-600 hover:underline"
                                >
                                    support@give.local
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Admin Dashboard (authenticated)
    if (!adminUser) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Authentication Error
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Unable to load admin user data. Please try logging in again.
                    </p>
                    <Button onClick={() => setIsAuthenticated(false)}>
                        Back to Login
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Logout button in top right */}
            <div className="absolute top-4 right-4 z-50">
                <Button variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            {/* Main Admin Dashboard */}
            <AdminDashboard adminUser={adminUser} />
        </div>
    )
}