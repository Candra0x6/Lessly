import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWebsiteStorage } from "@/hooks/useWebsiteStorage";

interface WebsiteContent {
  html: string;
  css: string;
  js?: string;
}

const SitePage = () => {
  const { id } = useParams();
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

  return (
    <div className="preview-page flex flex-col h-screen bg-white">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SitePage;
