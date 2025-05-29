"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Clock,
  Users,
  Globe,
  FileText,
  Save,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useProjectManagement } from "@/hooks/useProjectManagement";
import { useAuth } from "@/utility/use-auth-client";
import ProtectedRoute from "@/utility/ProtectedRoute";
import {
  Project,
  ProjectVersion,
} from "@declarations/project_management/project_management.did";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const {
    getProject,
    updateProject,
    createVersion,
    getProjectVersions,
    loading,
    error,
  } = useProjectManagement();

  const [project, setProject] = useState<Project | null>(null);
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [versionDescription, setVersionDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;

      setIsLoading(true);
      try {
        // Fetch project details
        const projectResult = await getProject(projectId);
        if ("ok" in projectResult) {
          const projectData = projectResult.ok;
          setProject(projectData);
          setEditedName(projectData.name);
          setEditedDescription(projectData.description);

          // Fetch project versions
          const versionsResult = await getProjectVersions(projectId);
          if ("ok" in versionsResult) {
            setVersions(versionsResult.ok);
          } else {
            console.error("Failed to fetch versions:", versionsResult.err);
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch project details",
            variant: "destructive",
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch project data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId, getProject, getProjectVersions, navigate, toast]);

  const handleSaveChanges = async () => {
    if (!project || !projectId) return;

    try {
      const result = await updateProject(
        projectId,
        editedName,
        editedDescription
      );

      if ("ok" in result) {
        setProject(result.ok);
        setIsEditing(false);
        toast({
          title: "Changes saved",
          description: "Project details updated successfully",
        });
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    if (project) {
      setEditedName(project.name);
      setEditedDescription(project.description);
    }
    setIsEditing(false);
  };

  const handleCreateVersion = async () => {
    if (!projectId || !versionDescription.trim()) return;

    try {
      const result = await createVersion(projectId, versionDescription);

      if ("ok" in result) {
        // Add the new version to the list
        setVersions([...versions, result.ok]);

        // Update the project's current version
        if (project) {
          setProject({
            ...project,
            current_version: result.ok.id,
            updated_at: result.ok.created_at,
          });
        }

        setIsVersionDialogOpen(false);
        setVersionDescription("");

        toast({
          title: "Version created",
          description: "New project version created successfully",
        });
      } else {
        throw new Error("Failed to create version");
      }
    } catch (error) {
      console.error("Error creating version:", error);
      toast({
        title: "Error",
        description: "Failed to create new version",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: bigint) => {
    // Convert nanoseconds to milliseconds
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        Project not found.
      </div>
    );
  }

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="min-h-screen bg-background pb-10">
        <div className="container mx-auto py-8 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <span
                  className={`ml-4 text-xs px-2 py-1 rounded-full ${
                    project.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-muted-foreground mt-2">
                {project.description}
              </p>
            </div>

            <div className="flex gap-2">
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Details
                </Button>
              )}
              <Button onClick={() => navigate(`/editor/${projectId}`)}>
                Open in Editor
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {isEditing ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Project Details</CardTitle>
                    <CardDescription>
                      Update your project information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Project name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Project description"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveChanges}>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Project ID
                          </dt>
                          <dd className="mt-1 text-sm">{project.id}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            URL Slug
                          </dt>
                          <dd className="mt-1 text-sm">{project.url_slug}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Template
                          </dt>
                          <dd className="mt-1 text-sm">
                            {project.template_id ?? "Custom"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Created
                          </dt>
                          <dd className="mt-1 text-sm flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(project.created_at)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Last Updated
                          </dt>
                          <dd className="mt-1 text-sm flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(project.updated_at)}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Collaboration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Owner
                        </h3>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Users className="h-4 w-4" />
                          </div>
                          <span className="text-sm truncate">
                            {project.owner.toString()}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Collaborators
                        </h3>
                        {project.collaborators.length > 0 ? (
                          <ul className="space-y-2">
                            {project.collaborators.map(
                              (collaborator, index) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                    <Users className="h-4 w-4" />
                                  </div>
                                  <span className="text-sm truncate">
                                    {collaborator.toString()}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No collaborators yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="versions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Project Versions</h2>
                <Dialog
                  open={isVersionDialogOpen}
                  onOpenChange={setIsVersionDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Create New Version
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Version</DialogTitle>
                      <DialogDescription>
                        Create a new version of your project to track changes
                        over time.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label
                        htmlFor="version-description"
                        className="mb-2 block"
                      >
                        Version Description
                      </Label>
                      <Textarea
                        id="version-description"
                        value={versionDescription}
                        onChange={(e) => setVersionDescription(e.target.value)}
                        placeholder="Describe what changed in this version"
                        rows={4}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsVersionDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateVersion}
                        disabled={!versionDescription.trim()}
                      >
                        Create Version
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Version ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Created By
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {versions.length > 0 ? (
                      versions
                        .sort((a, b) => Number(b.created_at - a.created_at))
                        .map((version) => (
                          <tr key={version.id} className="border-t">
                            <td className="px-4 py-3 text-sm">{version.id}</td>
                            <td className="px-4 py-3 text-sm">
                              {formatDate(version.created_at)}
                            </td>
                            <td className="px-4 py-3 text-sm truncate max-w-[150px]">
                              {version.created_by.toString()}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {version.description}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {project.current_version === version.id ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                  Current
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                  Previous
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-3 text-center text-muted-foreground"
                        >
                          No versions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Toaster />
      </div>
    </ProtectedRoute>
  );
}
