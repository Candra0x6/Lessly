"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, RefreshCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  // Animation for the UFO
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        {/* Animated 404 illustration */}
        <motion.div
          className="relative h-64 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: 0 }}
            animate={{ y: isAnimating ? [-10, 10, -5, 5, 0] : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* UFO */}
              <motion.g
                animate={{
                  y: isAnimating ? [0, -10, 0, -5, 0] : 0,
                  rotate: isAnimating ? [0, 5, -5, 3, 0] : 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <ellipse cx="100" cy="70" rx="50" ry="20" fill="#6366F1" />
                <ellipse cx="100" cy="70" rx="30" ry="10" fill="#818CF8" />
                <path d="M70 70C70 70 80 40 100 40C120 40 130 70 130 70" stroke="#4F46E5" strokeWidth="3" />
                <motion.g
                  animate={{
                    opacity: isAnimating ? [0, 1, 0, 1, 0] : 0,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <line x1="85" y1="80" x2="85" y2="90" stroke="#A5B4FC" strokeWidth="2" />
                  <line x1="100" y1="80" x2="100" y2="95" stroke="#A5B4FC" strokeWidth="2" />
                  <line x1="115" y1="80" x2="115" y2="90" stroke="#A5B4FC" strokeWidth="2" />
                </motion.g>
              </motion.g>

              {/* 404 Text */}
              <text x="60" y="140" fontFamily="monospace" fontSize="40" fontWeight="bold" fill="#4F46E5">
                404
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
            Page Not Found
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Search for content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="default">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
