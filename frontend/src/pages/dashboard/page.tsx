"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/utility/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/utility/use-auth-client";

interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  template: string;
}

const DashboardPage = () => {
  const { isAuthenticated, principal } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const mockProjects = [
          {
            id: "project-1",
            name: "Personal Website",
            description: "My personal portfolio website",
            lastModified: new Date().toLocaleDateString(),
            template: "portfolio",
          },
          {
            id: "project-2",
            name: "Business Landing Page",
            description: "A landing page for my business",
            lastModified: new Date().toLocaleDateString(),
            template: "landing",
          },
          {
            id: "project-3",
            name: "Blog Website",
            description: "A blog for sharing my thoughts",
            lastModified: new Date().toLocaleDateString(),
            template: "blog",
          },
        ];
        setProjects(mockProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load your projects",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    const newProject = {
      id: `project-${Date.now()}`,
      name: "Untitled Project",
      description: "A new website project",
      lastModified: new Date().toLocaleDateString(),
      template: "blank",
    };

    setProjects([...projects, newProject]);
    navigate(`/editor/${newProject.id}`);
    toast({
      title: "Project created",
      description: "Your new project has been created",
    });
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/editor/${projectId}`);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    toast({
      title: "Project deleted",
      description: "Your project has been deleted",
    });
  };

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="dashboard-page min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Website Projects</h1>
            <Button onClick={handleCreateProject}>Create New Project</Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-card">
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first website project to get started
              </p>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>Last modified: {project.lastModified}</p>
                    <p>Template: {project.template}</p>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
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
