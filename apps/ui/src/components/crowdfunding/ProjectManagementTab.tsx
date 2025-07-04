"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Eye,
  FileText,
  Heart,
  MessageSquare,
  Plus,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CreateProjectUpdate from "./CreateProjectUpdate"
import ProjectUpdates from "./ProjectUpdates"

interface ProjectManagementTabProps {
  project: {
    id: string
    documentId: string
    Title: string
    Slug: string
    RaisedAmount: number
    TargetAmount: number
    Status: string
    Owner?: {
      username: string
      email: string
    }
    Donations?: Array<any>
    Updates?: Array<any>
  }
  isOwner: boolean
}

export default function ProjectManagementTab({
  project,
  isOwner,
}: ProjectManagementTabProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateUpdate, setShowCreateUpdate] = useState(false)
  const [refreshUpdates, setRefreshUpdates] = useState(0)

  if (!isOwner) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Access Restricted
          </h3>
          <p className="text-gray-600">
            Only project owners can access the management dashboard.
          </p>
        </CardContent>
      </Card>
    )
  }

  const stats = {
    totalDonations: project.Donations?.length || 0,
    totalUpdates: project.Updates?.length || 0,
    totalRaised: project.RaisedAmount || 0,
    progressPercentage: project.TargetAmount
      ? Math.round(((project.RaisedAmount || 0) / project.TargetAmount) * 100)
      : 0,
  }

  const handleUpdateCreated = () => {
    setShowCreateUpdate(false)
    setRefreshUpdates((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div className="text-sm font-medium text-gray-600">Progress</div>
            </div>
            <div className="text-2xl font-bold">
              {stats.progressPercentage}%
            </div>
            <div className="text-xs text-gray-500">
              ${stats.totalRaised.toLocaleString()} raised
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div className="text-sm font-medium text-gray-600">
                Supporters
              </div>
            </div>
            <div className="text-2xl font-bold">{stats.totalDonations}</div>
            <div className="text-xs text-gray-500">Total donations</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <div className="text-sm font-medium text-gray-600">Updates</div>
            </div>
            <div className="text-2xl font-bold">{stats.totalUpdates}</div>
            <div className="text-xs text-gray-500">Published updates</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-orange-600" />
              <div className="text-sm font-medium text-gray-600">Status</div>
            </div>
            <div className="text-2xl font-bold">
              <Badge
                variant={project.Status === "active" ? "default" : "secondary"}
              >
                {project.Status}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">Current status</div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="updates">
            <MessageSquare className="mr-2 h-4 w-4" />
            Updates
          </TabsTrigger>
          <TabsTrigger value="supporters">
            <Users className="mr-2 h-4 w-4" />
            Supporters
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>
                Overview of your project's funding progress and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{stats.progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-600"
                      style={{
                        width: `${Math.min(stats.progressPercentage, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>${stats.totalRaised.toLocaleString()}</span>
                    <span>${project.TargetAmount?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalDonations}
                    </div>
                    <div className="text-sm text-blue-600">
                      Total Supporters
                    </div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.totalUpdates}
                    </div>
                    <div className="text-sm text-purple-600">
                      Updates Posted
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button
                  onClick={() => setShowCreateUpdate(true)}
                  className="flex h-auto flex-col items-center gap-2 p-4"
                >
                  <Plus className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Post Update</div>
                    <div className="text-xs opacity-80">
                      Share progress with supporters
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="flex h-auto flex-col items-center gap-2 p-4"
                >
                  <Settings className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Edit Project</div>
                    <div className="text-xs opacity-80">
                      Update project details
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Project Updates</h3>
              <p className="text-sm text-gray-600">
                Manage and create updates for your supporters
              </p>
            </div>
            <Button onClick={() => setShowCreateUpdate(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Update
            </Button>
          </div>

          {showCreateUpdate ? (
            <CreateProjectUpdate
              projectId={project.documentId}
              projectTitle={project.Title}
              onUpdateCreated={handleUpdateCreated}
              onCancel={() => setShowCreateUpdate(false)}
            />
          ) : (
            <ProjectUpdates
              projectId={project.documentId}
              projectTitle={project.Title}
              authorName={project.Owner?.username}
              key={refreshUpdates} // Force refresh when new update is created
            />
          )}
        </TabsContent>

        <TabsContent value="supporters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Supporters</CardTitle>
              <CardDescription>
                People who have donated to your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.totalDonations === 0 ? (
                <div className="py-8 text-center">
                  <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No supporters yet
                  </h3>
                  <p className="text-gray-600">
                    Share your project to start receiving donations!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.totalDonations}
                    </div>
                    <div className="text-sm text-green-600">
                      Amazing supporters backing your project!
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Detailed supporter analytics coming soon...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>
                Manage your project configuration and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Project Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      <strong>Title:</strong> {project.Title}
                    </div>
                    <div>
                      <strong>Slug:</strong> {project.Slug}
                    </div>
                    <div>
                      <strong>Status:</strong> {project.Status}
                    </div>
                    <div>
                      <strong>Target:</strong> $
                      {project.TargetAmount?.toLocaleString()}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Edit Details
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Notification Settings</h4>
                  <p className="mb-3 text-sm text-gray-600">
                    Configure how you receive notifications about your project
                  </p>
                  <Button variant="outline" size="sm">
                    Manage Notifications
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Privacy & Visibility</h4>
                  <p className="mb-3 text-sm text-gray-600">
                    Control who can see and interact with your project
                  </p>
                  <Button variant="outline" size="sm">
                    Privacy Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
