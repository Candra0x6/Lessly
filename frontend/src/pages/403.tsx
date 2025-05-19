"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ForbiddenPage() {
  const [isAnimating, setIsAnimating] = useState(false)

  // Animation for the lock
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        {/* Animated 403 illustration */}
        <motion.div
          className="relative h-64 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shield */}
              <motion.path
                d="M100 30C100 30 60 50 60 90C60 130 100 140 100 140C100 140 140 130 140 90C140 50 100 30 100 30Z"
                fill="#818CF8"
                stroke="#4F46E5"
                strokeWidth="3"
                initial={{ scale: 1 }}
                animate={{ scale: isAnimating ? [1, 1.05, 0.95, 1] : 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              {/* Lock */}
              <motion.g
                initial={{ y: 0 }}
                animate={{ y: isAnimating ? [0, -5, 0] : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <rect x="85" y="70" width="30" height="25" rx="2" fill="#4F46E5" />
                <path
                  d="M90 70V60C90 54.4772 94.4772 50 100 50V50C105.523 50 110 54.4772 110 60V70"
                  stroke="#4F46E5"
                  strokeWidth="4"
                />
                <circle cx="100" cy="80" r="5" fill="#A5B4FC" />
                <motion.line
                  x1="100"
                  y1="80"
                  x2="100"
                  y2="88"
                  stroke="#A5B4FC"
                  strokeWidth="2"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isAnimating ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </motion.g>

              {/* 403 Text */}
              <text x="60" y="140" fontFamily="monospace" fontSize="40" fontWeight="bold" fill="#4F46E5">
                403
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
            Access Denied
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            You don't have permission to access this page. Please log in with the appropriate credentials or contact
            your administrator.
          </motion.p>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="default" asChild>
                <Link href="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </Link>
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
