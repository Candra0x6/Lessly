"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import TemplateGrid from "@/components/create-project/template-grid";
import TemplatePreviewModal from "@/components/create-project/template-preview-modal";
import { useProjectManagement } from "@/hooks/useProjectManagement";
import { useAuth } from "@/utility/use-auth-client";
import ProtectedRoute from "@/utility/ProtectedRoute";
import { Template, ProjectFormData } from "@/lib/types";
import { useWebsiteStorage } from "@/hooks/useWebsiteStorage";

// Sample template data - in a real app, these would come from a backend service
const sampleTemplates: Template[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Perfect for showcasing your work and skills",
    category: "Personal",
    thumbnail: "/assets/templates/portfolio-thumbnail.jpg",
    tags: ["Personal", "Portfolio", "Minimalist"],
    preview_url: "/previews/portfolio",
  },
  {
    id: "blog",
    name: "Blog",
    description: "A clean blog layout with featured posts and categories",
    category: "Content",
    thumbnail: "/assets/templates/blog-thumbnail.jpg",
    tags: ["Blog", "Content", "Writing"],
    preview_url: "/previews/blog",
  },
  {
    id: "business",
    name: "E-commerce",
    description:
      "Professional e-commerce website with services and contact sections",
    category: "Business",
    thumbnail: "/assets/templates/business-thumbnail.jpg",
    tags: ["Business", "Professional", "Services"],
    preview_url: "/previews/business",
  },
  {
    id: "landing",
    name: "Landing Page",
    description:
      "High-converting landing page with clear call-to-action sections",
    category: "Marketing",
    thumbnail: "/assets/templates/landing-thumbnail.jpg",
    tags: ["Landing", "Conversion", "Marketing"],
    preview_url: "/previews/landing",
  },
];

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, principal } = useAuth();
  const { createProject, loading } = useProjectManagement();
  const { setProjectAccess } = useWebsiteStorage();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    template_id: null,
  });
  const [step, setStep] = useState<number>(1);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({
      ...formData,
      template_id: templateId === "blank" ? null : templateId,
    });
  };

  const handlePreviewTemplate = (template: Template) => {
    setPreviewTemplate(template);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedTemplate) {
        toast({
          title: "Please select a template",
          description: "You need to select a template to continue",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleCreateProject = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await createProject(
        formData.name,
        formData.description || "No description provided",
        formData.template_id || undefined
      );

      if ("ok" in result) {
        toast({
          title: "Project created",
          description: "Your new project has been created successfully",
        });

        // Navigate to editor with both project ID and template ID
        navigate(
          `/editor/${result.ok.id}${
            formData.template_id ? `?template=${formData.template_id}` : ""
          }`
        );
        setProjectAccess(result.ok.id, [principal!]);
      } else {
        throw new Error(
          `Failed to create project: ${JSON.stringify(result.err)}`
        );
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

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
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>

          <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

          <div className="space-y-8">
            {step === 1 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Choose a Template
                  </h2>
                  <p className="text-muted-foreground">
                    Select a template that best fits your project needs, or
                    start with a blank canvas
                  </p>
                </div>

                <TemplateGrid
                  templates={sampleTemplates}
                  selectedTemplate={selectedTemplate}
                  onSelect={handleSelectTemplate}
                />

                <div className="flex justify-end">
                  <Button onClick={handleNextStep} size="lg">
                    Continue
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Project Details
                  </h2>
                  <p className="text-muted-foreground">
                    Enter the basic information for your new project
                  </p>
                </div>

                <Card className="dark:bg-card border dark:border-border text-foreground">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Project Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="My Awesome Website"
                          className="mt-2"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description (optional)
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="A brief description of your project"
                          className="mt-2"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Selected Template</Label>
                        <div className="p-3 border rounded-md bg-background/50 mt-2">
                          {selectedTemplate === "blank"
                            ? "Blank Canvas"
                            : sampleTemplates.find(
                                (t) => t.id === selectedTemplate
                              )?.name || "No template selected"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleCreateProject} disabled={loading}>
                    {loading ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {previewTemplate && (
          // @ts-ignore
          <TemplatePreviewModal
            template={previewTemplate}
            isOpen={Boolean(previewTemplate)}
            onClose={closePreview}
          />
        )}

        <Toaster />
      </div>
    </ProtectedRoute>
  );
}
