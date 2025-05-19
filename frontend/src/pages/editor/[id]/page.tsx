import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GrapesJSEditor from "@/components/editor/GrapesJSEditor";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/utility/use-auth-client";
import ProtectedRoute from "@/utility/ProtectedRoute";

interface EditorPageProps {
  mode?: "webpage" | "newsletter";
}

const EditorPage = ({ mode = "webpage" }: EditorPageProps) => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading project metadata
    const loadProjectMetadata = async () => {
      setIsLoading(false);
    };

    loadProjectMetadata();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading editor...
      </div>
    );
  }

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="editor-page">
        <GrapesJSEditor projectId={id} mode={mode} />
        <Toaster />
      </div>
    </ProtectedRoute>
  );
};

export default EditorPage;
