"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  ComputerIcon as Desktop,
  Tablet,
  Smartphone,
  Share2,
  Edit,
  Globe,
  Copy,
  Check,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockProjects } from "@/lib/mock-data"

type DeviceType = "desktop" | "tablet" | "mobile"

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const [device, setDevice] = useState<DeviceType>("desktop")
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [showShareAlert, setShowShareAlert] = useState(false)
  const previewFrameRef = useRef<HTMLIFrameElement>(null)

  // Find the project from mock data
  const project = mockProjects.find((p) => p.id === projectId) || {
    id: projectId,
    name: "Sample Project",
    description: "A sample project for preview",
    thumbnail: "/placeholder.svg?height=200&width=400",
    status: "draft" as const,
    lastModified: new Date().toISOString(),
  }

  // Handle device width based on selected device
  const getDeviceWidth = () => {
    switch (device) {
      case "desktop":
        return "100%"
      case "tablet":
        return "768px"
      case "mobile":
        return "375px"
      default:
        return "100%"
    }
  }

  // Handle toolbar visibility toggle
  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible)
  }

  // Handle back to editor
  const handleBackToEditor = () => {
    router.push(`/editor/${projectId}`)
  }

  // Handle share link
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/preview/${projectId}?share=true`
    navigator.clipboard.writeText(shareUrl)
    setIsCopied(true)
    setShowShareAlert(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
    setTimeout(() => {
      setShowShareAlert(false)
    }, 5000)
  }

  // Handle publish
  const handlePublish = () => {
    setIsPublishing(true)
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false)
      setIsPublished(true)
    }, 2000)
  }

  // Handle view published site
  const handleViewPublished = () => {
    window.open(`https://${projectId}.ic0.app`, "_blank")
  }

  // Reset toolbar visibility when changing device
  useEffect(() => {
    setIsToolbarVisible(true)
  }, [device])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex flex-col">
      {/* Toolbar */}
      <AnimatePresence>
        {isToolbarVisible && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10"
          >
            <div className="container mx-auto px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Previewing: <span className="text-blue-500">{project.name}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <div className="bg-gray-100 dark:bg-zinc-800 rounded-md p-1 flex items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`px-3 ${
                              device === "desktop" ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-transparent"
                            }`}
                            onClick={() => setDevice("desktop")}
                          >
                            <Desktop className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Desktop view</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`px-3 ${
                              device === "tablet" ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-transparent"
                            }`}
                            onClick={() => setDevice("tablet")}
                          >
                            <Tablet className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Tablet view</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`px-3 ${
                              device === "mobile" ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-transparent"
                            }`}
                            onClick={() => setDevice("mobile")}
                          >
                            <Smartphone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Mobile view</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>

                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleBackToEditor}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  {isPublished ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Globe className="h-4 w-4 mr-2" />
                          Published
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleViewPublished}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live Site
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handlePublish}>
                          <Globe className="h-4 w-4 mr-2" />
                          Republish
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={handlePublish}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Globe className="h-4 w-4 mr-2" />
                          Publish
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Alert */}
      <AnimatePresence>
        {showShareAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 z-20 w-96"
          >
            <Alert className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-400" />}
                </div>
                <div className="ml-3 flex-1">
                  <AlertDescription>
                    {isCopied ? "Preview link copied to clipboard!" : "Share this preview link with others"}
                    <div className="mt-2 flex items-center">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/preview/${projectId}?share=true`}
                        className="flex-1 text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded py-1 px-2"
                      />
                      <Button size="sm" variant="ghost" className="ml-2" onClick={() => setShowShareAlert(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Frame */}
      <div className="flex-1 flex items-center justify-center overflow-auto relative">
        {/* Toggle toolbar button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-gray-800/70 hover:bg-gray-800/90 text-white rounded-full p-1"
          onClick={toggleToolbar}
        >
          {isToolbarVisible ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <ChevronDown className="h-4 w-4 transform rotate-180" />
            </motion.div>
          )}
        </motion.button>

        <div
          className="h-full transition-all duration-300 flex items-start justify-center overflow-auto py-4"
          style={{ width: getDeviceWidth() }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden h-full w-full"
            style={{
              maxWidth: getDeviceWidth(),
              minHeight: device === "mobile" ? "667px" : device === "tablet" ? "1024px" : "100%",
            }}
          >
            <iframe
              ref={previewFrameRef}
              src="/preview-content"
              className="w-full h-full border-0"
              title="Website Preview"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
