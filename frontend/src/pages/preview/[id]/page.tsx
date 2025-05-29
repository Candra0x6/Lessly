import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWebsiteStorage } from "@/hooks/useWebsiteStorage";
import { useAuth } from "@/utility/use-auth-client";
import ProtectedRoute from "@/utility/ProtectedRoute";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useProjectManagement } from "@/hooks/useProjectManagement";
import { Project } from "@declarations/project_management/project_management.did";
import { PublishProjectDropdown } from "@/components/dropdown/project-card-dropdown";
import toast from "react-hot-toast";

interface WebsiteContent {
  html: string;
  css: string;
  js?: string;
}

const PreviewPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { loadWebsiteContent } = useWebsiteStorage();
  const { getProject, publishProject } = useProjectManagement();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const loadContent = async () => {
      if (!id) return;

      try {
        const websiteContent = await loadWebsiteContent(id);
        const data = await getProject(id);
        // @ts-ignore
        setProject(data.ok);
        if (websiteContent) {
          setContent(websiteContent);
        }
      } catch (error) {
        console.error("Failed to load website content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [id]);

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
        setProject((prev) =>
          prev ? { ...prev, published: !prev.published } : undefined
        );
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
  const handleBack = () => {
    navigate(`/editor/${id}`);
  };

  const handlePublish = () => {};

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="preview-page flex flex-col h-screen bg-white">
        <div className="preview-toolbar flex items-center justify-between p-4 bg-card border-b">
          <div className="flex items-center space-x-2">
            <Button onClick={handleBack} variant="outline" size="sm">
              Back to Editor
            </Button>
            <h2 className="text-xl font-semibold">Website Preview</h2>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {project?.published ? "Unpublish" : "Publish"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <PublishProjectDropdown
                  handleView={() =>
                    handleViewProject(project?.url_slug as string)
                  }
                  site={window.location.origin + "/site/" + project?.url_slug}
                  handlePublish={() =>
                    handlePublishToggle(
                      project?.id as string,
                      project?.published as boolean
                    )
                  }
                  isPublished={project?.published as boolean}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="preview-content flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              Loading preview...
            </div>
          ) : content ? (
            <iframe
              title="Website Preview"
              className="w-full h-full border-none"
              srcDoc={`
                <!DOCTYPE html>
                <html>
                <head>
                  <style>${content.css}</style>
                </head>
                <body>
                  ${content.html}
                  ${content.js ? `<script>${content.js}</script>` : ""}
                </body>
                </html>
              `}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg text-muted-foreground mb-4">
                No content found for this project
              </p>
              <Button onClick={handleBack}>Return to Editor</Button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PreviewPage;
