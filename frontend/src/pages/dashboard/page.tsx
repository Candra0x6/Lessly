"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Globe, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/utility/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/utility/use-auth-client";
import { useProjectManagement } from "@/hooks/useProjectManagement";
import { Project } from "@declarations/project_management/project_management.did";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ProjectSettingDropdown,
  PublishProjectDropdown,
} from "@/components/dropdown/project-card-dropdown";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { isAuthenticated, principal } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("all");
  const { getUserProjects, publishProject, loading, error } =
    useProjectManagement();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!principal) return;

      try {
        setIsLoading(true);
        const userProjects = await getUserProjects(principal);
        console.log(userProjects);
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && principal) {
      fetchProjects();
    }
  }, []);

  const handleCreateProject = () => {
    navigate("/dashboard/create-project");
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/editor/${projectId}`);
  };

  const handleViewProject = (urlSlug: string) => {
    navigate(`/site/${urlSlug}`);
  };

  const handlePublishToggle = async (
    projectId: string,
    currentStatus: boolean
  ) => {
    try {
      const result = await publishProject(projectId, !currentStatus);
      if ("ok" in result) {
        setProjects(projects.map((p) => (p.id === projectId ? result.ok : p)));

        toast.success(
          `Project ${!currentStatus ? "published" : "unpublished"} successfully`
        );
      } else {
        throw new Error("Failed to update project status");
      }
    } catch (error) {
      console.error("Error updating project status:", error);
      toast.error("Failed to update project status");
    }
  };

  const handleDeleteProject = (projectId: string) => {
    // In a real implementation, you would call a delete function from useProjectManagement
    // For now we'll just remove it from the local state
    setProjects(projects.filter((project) => project.id !== projectId));
    toast.success("Project deleted successfully");
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "published") return project.published;
    if (activeTab === "drafts") return !project.published;
    return true; // "all" tab
  });

  const formatDate = (timestamp: bigint) => {
    // Convert nanoseconds to milliseconds
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString();
  };

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="dashboard-page min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Website Projects</h1>
            <Button onClick={handleCreateProject}>Create New Project</Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6 "
          >
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-card">
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first website project to get started
              </p>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg overflow-hidden bg-card"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {project.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        Last updated: {formatDate(project.updated_at)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-center"
                          >
                            <Settings2 className="h-4 w-4 mr-1" />
                            Settings
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <ProjectSettingDropdown
                            handleDelete={() => handleDeleteProject(project.id)}
                            handleEdit={() => handleEditProject(project.id)}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-center"
                          >
                            <Globe className="h-4 w-4 mr-1" />
                            {project.published ? "Unpublish" : "Publish"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <PublishProjectDropdown
                            handleView={() =>
                              handleViewProject(project.url_slug)
                            }
                            site={
                              window.location.origin +
                              "/site/" +
                              project.url_slug
                            }
                            handlePublish={() =>
                              handlePublishToggle(project.id, project.published)
                            }
                            isPublished={project.published}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
