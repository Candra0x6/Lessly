"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowLeft, Home, RefreshCw, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [errorDetails, setErrorDetails] = useState("")
  const [isReportSent, setIsReportSent] = useState(false)

  // Animation for the error icon
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleReport = () => {
    // Simulate sending error report
    setTimeout(() => {
      setIsReportSent(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        {/* Animated 500 illustration */}
        <motion.div
          className="relative h-64 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Server */}
              <rect x="60" y="40" width="80" height="70" rx="4" fill="#818CF8" stroke="#4F46E5" strokeWidth="3" />

              {/* Server details */}
              <rect x="70" y="50" width="60" height="5" rx="2" fill="#A5B4FC" />
              <rect x="70" y="60" width="40" height="5" rx="2" fill="#A5B4FC" />
              <rect x="70" y="70" width="50" height="5" rx="2" fill="#A5B4FC" />

              {/* Error symbol */}
              <motion.g
                initial={{ scale: 1 }}
                animate={{
                  scale: isAnimating ? [1, 1.2, 1] : 1,
                  rotate: isAnimating ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <circle cx="130" cy="60" r="15" fill="#EF4444" />
                <path d="M125 55L135 65M135 55L125 65" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </motion.g>

              {/* Lightning bolt */}
              <motion.path
                d="M100 20L105 40H115L100 60L105 40"
                fill="#FBBF24"
                stroke="#F59E0B"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isAnimating ? [0, 1, 0] : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              {/* 500 Text */}
              <text x="60" y="140" fontFamily="monospace" fontSize="40" fontWeight="bold" fill="#4F46E5">
                500
              </text>
            </svg>
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Server Error
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Something went wrong on our servers. We've been notified and are working to fix the issue.
          </motion.p>

          {error.digest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Alert variant="destructive" className="text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error Code</AlertTitle>
                <AlertDescription className="font-mono text-xs">{error.digest}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {isReportSent ? (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                <AlertTitle>Report Sent</AlertTitle>
                <AlertDescription>Thank you for your feedback. Our team has been notified.</AlertDescription>
              </Alert>
            ) : (
              <div className="mb-4 space-y-2">
                <Textarea
                  placeholder="What were you trying to do when this error occurred? (optional)"
                  value={errorDetails}
                  onChange={(e) => setErrorDetails(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button variant="outline" className="w-full" onClick={handleReport}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Error Report
                </Button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="default" onClick={() => reset()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
