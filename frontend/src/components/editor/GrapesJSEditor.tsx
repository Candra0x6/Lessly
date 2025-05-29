import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowDown } from "lucide-react";
import grapesjs, { Editor } from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsPresetNewsletter from "grapesjs-preset-newsletter";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import customBlocks from "./customBlocks";
import loadTemplates from "./loadTemplates";

import "grapesjs/dist/css/grapes.min.css";
import "./GrapesJSEditor.css"; // Import custom CSS
import { useWebsiteStorage } from "@/hooks/useWebsiteStorage";

interface GrapesJSEditorProps {
  projectId?: string;
  mode?: "webpage" | "newsletter";
}

const GrapesJSEditor = ({
  projectId,
  mode = "webpage",
}: GrapesJSEditorProps) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const location = useLocation();
  const urlProjectId = params.id || projectId;

  // Extract template from URL query parameters if available
  const queryParams = new URLSearchParams(location.search);
  const templateFromUrl = queryParams.get("template");

  // Initialize the website storage hook
  const {
    loading: storageLoading,
    error: storageError,
    storeAssetMetadata,
    storeAssetChunk,
    getAssetMetadata,
    getAssetChunk,
    getProjectAssets,
    getVersionAssets,
    deleteAsset,
    loadWebsiteContent,
  } = useWebsiteStorage();

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize GrapesJS
    const grapesJsEditor = grapesjs.init({
      container: editorRef.current,
      height: "calc(100vh - 5rem)",
      width: "auto",
      storageManager: { type: "none" },
      deviceManager: {
        devices: [
          { name: "Desktop", width: "" },
          { name: "Tablet", width: "768px" },
          { name: "Mobile", width: "320px" },
        ],
      },
      blockManager: {
        blocks: [], // Will be added via customBlocks function
      },
      panels: {
        defaults: [
          {
            id: "panel-devices",
            el: ".panel__devices",
            buttons: [
              {
                id: "device-desktop",
                label: "D",
                command: "set-device-desktop",
                active: true,
                togglable: false,
              },
              {
                id: "device-tablet",
                label: "T",
                command: "set-device-tablet",
                togglable: false,
              },
              {
                id: "device-mobile",
                label: "M",
                command: "set-device-mobile",
                togglable: false,
              },
            ],
          },
        ],
      },
      plugins: [
        mode === "webpage" ? gjsPresetWebpage : gjsPresetNewsletter,
        gjsBlocksBasic,
      ],
      pluginsOpts: {
        [mode === "webpage" ? "gjsPresetWebpage" : "gjsPresetNewsletter"]: {},
        gjsBlocksBasic: {},
      },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        ],
      },
    });

    // Set custom commands for devices
    grapesJsEditor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });

    grapesJsEditor.Commands.add("set-device-tablet", {
      run: (editor) => editor.setDevice("Tablet"),
    });

    grapesJsEditor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });

    // Add custom blocks and templates
    customBlocks(grapesJsEditor);
    loadTemplates(grapesJsEditor);

    setEditor(grapesJsEditor);
    setIsLoading(false);

    // Load content if projectId is provided
    if (urlProjectId) {
      // If this is a new project with a template, apply the template first
      const isNewProject = async () => {
        try {
          const assets = await getProjectAssets(urlProjectId);
          // If there are no assets, this is likely a new project
          return assets.length === 0;
        } catch (error) {
          console.error("Error checking if project is new:", error);
          return true; // Assume it's new if there's an error
        }
      };

      isNewProject().then((isNew) => {
        if (isNew && templateFromUrl) {
          // Apply the template from URL
          grapesJsEditor.runCommand("load-template", {
            template: templateFromUrl,
          });
          toast({
            title: "Template applied",
            description: `The ${templateFromUrl} template has been applied to your project`,
          });

          // Immediately save the project with the template
          saveProject();
        } else {
          // Otherwise load existing project data
          loadProjectData(urlProjectId, grapesJsEditor);
        }
      });
    }

    return () => {
      grapesJsEditor.destroy();
    };
  }, [urlProjectId, mode, templateFromUrl]);

  const loadProjectData = async (id: string, editorInstance: Editor) => {
    setIsLoading(true);
    try {
      // Fetch all assets for this project
      const assets = await getProjectAssets(id);
      console.log(assets);
      // Find HTML, CSS, JS assets by asset_type
      // compare asset_type data is {html: null}
      const htmlAsset = assets.find((a) => "html" in a.asset_type);
      const cssAsset = assets.find((a) => "css" in a.asset_type);
      const jsAsset = assets.find((a) => "javascript" in a.asset_type);
      console.log(htmlAsset);
      // Load HTML content
      if (htmlAsset) {
        let htmlContent = "";
        try {
          // Get the first chunk (assuming HTML is small enough for one chunk)
          const htmlResult = await getAssetChunk(htmlAsset.id, 0);
          if ("ok" in htmlResult) {
            // Convert blob to text
            htmlContent = await htmlResult.ok.text();
            editorInstance.setComponents(htmlContent);
          }
          console.log(htmlContent);
        } catch (e) {
          console.error("Error loading HTML content:", e);
        }
      }

      // Load CSS content
      if (cssAsset) {
        let cssContent = "";
        try {
          const cssResult = await getAssetChunk(cssAsset.id, 0);
          if ("ok" in cssResult) {
            cssContent = await cssResult.ok.text();
            editorInstance.setStyle(cssContent);
          }
          console.log(cssContent);
        } catch (e) {
          console.error("Error loading CSS content:", e);
        }
      }

      // Load JS content if needed
      if (jsAsset) {
        let jsContent = "";
        try {
          const jsResult = await getAssetChunk(jsAsset.id, 0);
          if ("ok" in jsResult) {
            jsContent = await jsResult.ok.text();
            // Handle JS if needed
            // editorInstance.setJs(jsContent); // Uncomment if your editor supports this
          }
          console.log(jsContent);
        } catch (e) {
          console.error("Error loading JS content:", e);
        }
      }

      toast({
        title: "Project loaded successfully",
        description: "Your project has been loaded into the editor",
      });
    } catch (error) {
      console.error("Error loading project data:", error);
      toast({
        title: "Error loading project",
        description: "Could not load project data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async () => {
    if (!editor || !urlProjectId) return;

    setIsLoading(true);
    try {
      const html = editor.getHtml();
      console.log(html);
      const css = editor.getCss();
      const js = editor.getJs();

      const finalHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
      `;

      // Get the current timestamp to use as version ID
      const versionId = new Date().getTime().toString();

      // Save HTML content
      const htmlAssetId = `${urlProjectId}-html-index.html`;
      const htmlBlob = new Blob([html], { type: "text/html" });

      // Store HTML metadata
      const htmlMetadataResult = await storeAssetMetadata(
        urlProjectId,
        "index.html",
        "text/html",
        htmlBlob.size,
        versionId,
        { html: null },
        "/"
      );

      console.log("HTML Metadata Result", htmlMetadataResult);
      if ("ok" in htmlMetadataResult) {
        // Store HTML content chunk
        const htmlChunkResult = await storeAssetChunk(
          htmlMetadataResult.ok.id,
          0,
          htmlBlob
        );
        console.log("HTML Chunk Result", htmlChunkResult);
        if (!("ok" in htmlChunkResult)) {
          throw new Error("Failed to store HTML chunk");
        }
      } else {
        throw new Error("Failed to store HTML metadata");
      }
      // Save CSS content
      const cssAssetId = `${urlProjectId}-css-styles.css`;
      // @ts-ignore
      const cssBlob = new Blob([css], { type: "text/css" });

      // Store CSS metadata
      const cssMetadataResult = await storeAssetMetadata(
        urlProjectId,
        "styles.css",
        "text/css",
        cssBlob.size,
        versionId,
        { css: null },
        "/css/"
      );

      console.log("CSS Metadata Result", cssMetadataResult);
      if ("ok" in cssMetadataResult) {
        // Store CSS content chunk
        const cssChunkResult = await storeAssetChunk(
          cssMetadataResult.ok.id,
          0,
          cssBlob
        );
        console.log("CSS Chunk Result", cssChunkResult);
        if (!("ok" in cssChunkResult)) {
          throw new Error("Failed to store CSS chunk");
        }
      } else {
        throw new Error("Failed to store CSS metadata");
      }

      // Save JS content if available
      if (js) {
        const jsAssetId = `${urlProjectId}-js-script.js`;
        const jsBlob = new Blob([js], { type: "text/javascript" });

        // Store JS metadata
        const jsMetadataResult = await storeAssetMetadata(
          urlProjectId,
          "script.js",
          "text/javascript",
          jsBlob.size,
          versionId,
          { javascript: null },
          "/js/"
        );

        console.log("JS Metadata Result", jsMetadataResult);
        if ("ok" in jsMetadataResult) {
          // Store JS content chunk
          const jsChunkResult = await storeAssetChunk(
            jsMetadataResult.ok.id,
            0,
            jsBlob
          );
          console.log("JS Chunk Result", jsChunkResult);
          if (!("ok" in jsChunkResult)) {
            throw new Error("Failed to store JS chunk");
          }
        } else {
          throw new Error("Failed to store JS metadata");
        }
      }

      toast({
        title: "Project saved successfully",
        description: "Your changes have been saved",
      });
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error saving project",
        description: "Could not save your changes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handlePreview = () => {
    if (!urlProjectId) return;

    // Save the current project and navigate to preview
    saveProject().then(() => {
      navigate(`/preview/${projectId}`);
    });
  };

  const applyTemplate = (templateName: string) => {
    if (editor) {
      editor.runCommand("load-template", { template: templateName });
      toast({
        title: "Template applied",
        description: `The ${templateName} template has been applied to your project`,
      });
    }
  };

  return (
    <div className="editor-container flex flex-col h-screen">
      <div className="editor-toolbar flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center space-x-2">
          <Button onClick={handleBack} variant="outline" size="sm">
            Back
          </Button>
          <h2 className="text-xl font-semibold">Website Builder</h2>
        </div>

        <div className="panel__devices"></div>

        <div className="flex items-center space-x-2">
          <Button onClick={saveProject} disabled={isLoading} size="sm">
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button onClick={handlePreview} variant="outline" size="sm">
            Preview
          </Button>
          <Select onValueChange={(value) => applyTemplate(value)}>
            <SelectTrigger className="bg-primary py-2 px-5  text-white rounded-md text-sm">
              <span className="flex items-center">
                <span className="text-sm font-medium text-white">
                  Templates
                </span>
                <ArrowDown className="ml-2 text-sm w-4" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="landing">Landing Page</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="editor-main flex flex-1 bg-background">
        <div className="editor-canvas flex-1">
          <div ref={editorRef} className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default GrapesJSEditor;
