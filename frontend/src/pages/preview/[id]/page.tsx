import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWebsiteStorage } from "@/hooks/useWebsiteStorage";
import { useAuth } from "@/utility/use-auth-client";
import ProtectedRoute from "@/utility/ProtectedRoute";

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

  useEffect(() => {
    const loadContent = async () => {
      if (!id) return;

      try {
        const websiteContent = await loadWebsiteContent(id);
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

  const handleBack = () => {
    navigate(`/editor/${id}`);
  };

  const handlePublish = () => {
    // Implement publish functionality
    alert("Publishing functionality will be implemented in a future update");
  };

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="preview-page flex flex-col h-screen">
        <div className="preview-toolbar flex items-center justify-between p-4 bg-card border-b">
          <div className="flex items-center space-x-2">
            <Button onClick={handleBack} variant="outline" size="sm">
              Back to Editor
            </Button>
            <h2 className="text-xl font-semibold">Website Preview</h2>
          </div>

          <div className="flex items-center space-x-2">
            <Button onClick={handlePublish} size="sm">
              Publish
            </Button>
          </div>
        </div>

        <div className="preview-content flex-1 bg-background">
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
