"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  Trash2,
  AlertTriangle,
  Save,
  Plus,
  X,
  ExternalLink,
  Loader2,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { mockProjects } from "@/lib/mock-data"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"

// Mock data for the settings page
const mockCollaborators = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Editor",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockDomains = [
  {
    id: "1",
    domain: "myproject.com",
    status: "active",
    primary: true,
    ssl: true,
  },
  {
    id: "2",
    domain: "myproject.io",
    status: "pending",
    primary: false,
    ssl: true,
  },
]

const mockVersions = [
  {
    id: "v1",
    version: "1.0.0",
    date: "2023-05-20T14:30:00Z",
    author: "Alex Johnson",
    changes: "Initial version",
  },
  {
    id: "v2",
    version: "1.1.0",
    date: "2023-05-22T10:15:00Z",
    author: "Sarah Williams",
    changes: "Updated hero section and added testimonials",
  },
  {
    id: "v3",
    version: "1.2.0",
    date: "2023-05-25T16:45:00Z",
    author: "Alex Johnson",
    changes: "Added pricing section and fixed mobile responsiveness",
  },
  {
    id: "v4",
    version: "1.3.0",
    date: "2023-05-28T09:20:00Z",
    author: "Michael Brown",
    changes: "Updated footer and added contact form",
  },
  {
    id: "v5",
    version: "1.4.0",
    date: "2023-06-01T11:30:00Z",
    author: "Alex Johnson",
    changes: "Performance optimizations and bug fixes",
  },
]

export default function ProjectSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string

  // Find the project from mock data
  const project = mockProjects.find((p) => p.id === projectId) || {
    id: projectId,
    name: "Sample Project",
    description: "A sample project for settings",
    thumbnail: "/placeholder.svg?height=200&width=400",
    status: "draft" as const,
    lastModified: new Date().toISOString(),
  }

  // State for project details form
  const [projectDetails, setProjectDetails] = useState({
    name: project.name,
    description: project.description || "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [newDomain, setNewDomain] = useState("")
  const [domains, setDomains] = useState(mockDomains)
  const [collaborators, setCollaborators] = useState(mockCollaborators)
  const [newCollaborator, setNewCollaborator] = useState({ email: "", role: "Viewer" })
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false)
  const [isAddingDomain, setIsAddingDomain] = useState(false)

  // Handle project details change
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle save project details
  const handleSaveDetails = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success message or handle errors
  }

  // Handle delete project
  const handleDeleteProject = async () => {
    setIsDeleting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsDeleting(false)
    router.push("/dashboard")
  }

  // Handle add collaborator
  const handleAddCollaborator = () => {
    if (!newCollaborator.email) return

    setIsAddingCollaborator(true)
    // Simulate API call
    setTimeout(() => {
      const newId = (collaborators.length + 1).toString()
      setCollaborators([
        ...collaborators,
        {
          id: newId,
          name: newCollaborator.email.split("@")[0],
          email: newCollaborator.email,
          role: newCollaborator.role,
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])
      setNewCollaborator({ email: "", role: "Viewer" })
      setIsAddingCollaborator(false)
    }, 1000)
  }

  // Handle remove collaborator
  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  // Handle add domain
  const handleAddDomain = () => {
    if (!newDomain) return

    setIsAddingDomain(true)
    // Simulate API call
    setTimeout(() => {
      const newId = (domains.length + 1).toString()
      setDomains([
        ...domains,
        {
          id: newId,
          domain: newDomain,
          status: "pending",
          primary: domains.length === 0,
          ssl: true,
        },
      ])
      setNewDomain("")
      setIsAddingDomain(false)
    }, 1000)
  }

  // Handle remove domain
  const handleRemoveDomain = (id: string) => {
    setDomains(domains.filter((d) => d.id !== id))
  }

  // Handle set primary domain
  const handleSetPrimaryDomain = (id: string) => {
    setDomains(
      domains.map((d) => ({
        ...d,
        primary: d.id === id,
      })),
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <div onClick={() => router.push("/dashboard")} className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </div>
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage settings for <span className="font-medium">{project.name}</span>
                </p>
              </div>
              <Button onClick={() => router.push(`/preview/${projectId}`)} variant="outline" className="sm:self-end">
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            {/* Settings Navigation */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden h-fit">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "details"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 text-left">Project Details</span>
                  {activeTab === "details" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("collaborators")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "collaborators"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 text-left">Collaborators</span>
                  {activeTab === "collaborators" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("domains")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "domains"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 text-left">Domains</span>
                  {activeTab === "domains" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("versions")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "versions"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 text-left">Version History</span>
                  {activeTab === "versions" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("export")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "export"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 text-left">Export</span>
                  {activeTab === "export" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("danger")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "danger"
                      ? "bg-red-50 border-l-2 border-red-500 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 text-left">Danger Zone</span>
                  {activeTab === "danger" && <ChevronRight className="h-4 w-4" />}
                </button>
              </nav>
            </div>

            {/* Settings Content */}
            <div>
              {/* Project Details */}
              {activeTab === "details" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Details</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                          Project Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={projectDetails.name}
                          onChange={handleDetailsChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                          Project Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={projectDetails.description}
                          onChange={handleDetailsChange}
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300">Project Status</Label>
                        <div className="mt-1">
                          <Badge variant={project.status === "published" ? "default" : "outline"}>
                            {project.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300">Last Modified</Label>
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(project.lastModified)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <Button
                      onClick={handleSaveDetails}
                      disabled={isSaving}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Collaborators */}
              {activeTab === "collaborators" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Collaborators</h2>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Collaborator
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Collaborator</DialogTitle>
                            <DialogDescription>Invite a team member to collaborate on this project.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                placeholder="colleague@example.com"
                                value={newCollaborator.email}
                                onChange={(e) => setNewCollaborator({ ...newCollaborator, email: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="role">Role</Label>
                              <select
                                id="role"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm"
                                value={newCollaborator.role}
                                onChange={(e) => setNewCollaborator({ ...newCollaborator, role: e.target.value })}
                              >
                                <option value="Owner">Owner</option>
                                <option value="Editor">Editor</option>
                                <option value="Viewer">Viewer</option>
                              </select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={handleAddCollaborator}
                              disabled={isAddingCollaborator || !newCollaborator.email}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              {isAddingCollaborator ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Adding...
                                </>
                              ) : (
                                "Add Collaborator"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-4">
                      {collaborators.map((collaborator) => (
                        <div
                          key={collaborator.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                              <AvatarFallback>
                                {collaborator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{collaborator.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{collaborator.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant={
                                collaborator.role === "Owner"
                                  ? "default"
                                  : collaborator.role === "Editor"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {collaborator.role}
                            </Badge>
                            {collaborator.role !== "Owner" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCollaborator(collaborator.id)}
                              >
                                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Domains */}
              {activeTab === "domains" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Custom Domains</h2>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Domain
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Custom Domain</DialogTitle>
                            <DialogDescription>Connect your own domain to your website.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="domain">Domain Name</Label>
                              <Input
                                id="domain"
                                placeholder="example.com"
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={handleAddDomain}
                              disabled={isAddingDomain || !newDomain}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              {isAddingDomain ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Adding...
                                </>
                              ) : (
                                "Add Domain"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-4">
                      {domains.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No custom domains added yet.
                        </div>
                      ) : (
                        domains.map((domain) => (
                          <div
                            key={domain.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg gap-4"
                          >
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white flex items-center">
                                {domain.domain}
                                {domain.primary && <Badge className="ml-2 bg-blue-500">Primary</Badge>}
                              </div>
                              <div className="flex items-center mt-1">
                                <Badge
                                  variant={domain.status === "active" ? "default" : "outline"}
                                  className={
                                    domain.status === "active"
                                      ? "bg-green-500 hover:bg-green-600"
                                      : "text-yellow-500 border-yellow-500"
                                  }
                                >
                                  {domain.status === "active" ? "Active" : "Pending"}
                                </Badge>
                                {domain.ssl && (
                                  <Badge variant="outline" className="ml-2 border-green-500 text-green-500">
                                    SSL
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 self-end sm:self-auto">
                              {!domain.primary && domain.status === "active" && (
                                <Button variant="outline" size="sm" onClick={() => handleSetPrimaryDomain(domain.id)}>
                                  Set as Primary
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveDomain(domain.id)}>
                                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Default Domain</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <code className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                          {projectId}.ic0.app
                        </code>
                        <Badge variant="outline" className="ml-2 border-green-500 text-green-500">
                          SSL
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Version History */}
              {activeTab === "versions" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Version History</h2>
                    <div className="space-y-4">
                      {mockVersions.map((version, index) => (
                        <div
                          key={version.id}
                          className={`relative pl-8 ${
                            index !== mockVersions.length - 1
                              ? "pb-8 border-l-2 border-gray-200 dark:border-gray-700"
                              : ""
                          }`}
                        >
                          <div className="absolute -left-2 mt-1.5">
                            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Version {version.version}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(version.date)} by {version.author}
                              </div>
                              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{version.changes}</div>
                            </div>
                            <div className="mt-2 sm:mt-0 flex space-x-2">
                              <Button variant="outline" size="sm">
                                Preview
                              </Button>
                              <Button variant="outline" size="sm">
                                Restore
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Export */}
              {activeTab === "export" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Export Project</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Export your project files for backup or to use with other platforms.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>HTML Export</CardTitle>
                          <CardDescription>
                            Export your project as static HTML, CSS, and JavaScript files.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            This export includes all the necessary files to host your website on any static hosting
                            platform.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Download className="mr-2 h-4 w-4" />
                            Export HTML
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Project Backup</CardTitle>
                          <CardDescription>
                            Export a complete backup of your project including all settings.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            This backup can be imported back into WebCanister to restore your project.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Download className="mr-2 h-4 w-4" />
                            Export Backup
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Danger Zone */}
              {activeTab === "danger" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-900/30 shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h2 className="text-lg font-medium text-red-500">Danger Zone</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Actions in this section can lead to permanent data loss. Please proceed with caution.
                    </p>

                    <div className="space-y-6">
                      <Card className="border-red-200 dark:border-red-900/30">
                        <CardHeader>
                          <CardTitle className="text-red-500">Delete Project</CardTitle>
                          <CardDescription>Permanently delete this project and all associated data.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            This action cannot be undone. All project data, including content, settings, and version
                            history will be permanently deleted.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Project
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the project
                                  <span className="font-medium"> {project.name} </span>
                                  and all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteProject}
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                  {isDeleting ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Deleting...
                                    </>
                                  ) : (
                                    "Delete Project"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </CardFooter>
                      </Card>

                      <Card className="border-red-200 dark:border-red-900/30">
                        <CardHeader>
                          <CardTitle className="text-red-500">Transfer Ownership</CardTitle>
                          <CardDescription>Transfer ownership of this project to another user.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Once ownership is transferred, you will no longer have owner privileges for this project.
                          </p>
                          <div className="mt-4">
                            <Label htmlFor="new-owner" className="text-gray-700 dark:text-gray-300">
                              New Owner Email
                            </Label>
                            <Input id="new-owner" placeholder="colleague@example.com" className="mt-1" />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="destructive">Transfer Ownership</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
