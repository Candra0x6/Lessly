"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bell, Calendar, Clock, Home, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function MaintenancePage() {
  const [progress, setProgress] = useState(35)
  const [isAnimating, setIsAnimating] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60) // minutes

  // Animation for the tools
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        return newProgress > 100 ? 100 : newProgress
      })

      setTimeRemaining((prev) => {
        const newTime = prev - 1
        return newTime < 0 ? 0 : newTime
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Format time remaining
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins} minutes`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        {/* Animated maintenance illustration */}
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

              {/* Tools */}
              <motion.g
                animate={{
                  rotate: isAnimating ? [0, 15, -15, 10, -10, 0] : 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: "130px 60px" }}
              >
                {/* Wrench */}
                <path
                  d="M120 50C120 50 125 45 135 45C145 45 150 50 150 50L140 70C140 70 135 65 130 65C125 65 120 70 120 70L120 50Z"
                  fill="#94A3B8"
                  stroke="#64748B"
                  strokeWidth="2"
                />

                {/* Screwdriver */}
                <rect x="115" y="75" width="5" height="25" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
                <path d="M115 75L120 75L117.5 65L115 75Z" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
              </motion.g>

              {/* Progress indicator */}
              <rect x="70" y="90" width="60" height="10" rx="5" fill="#E2E8F0" />
              <motion.rect
                x="70"
                y="90"
                height="10"
                rx="5"
                fill="#4F46E5"
                initial={{ width: 0 }}
                animate={{ width: progress * 0.6 }} // Scale to fit
                transition={{ duration: 0.5 }}
              />
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
            We're Under Maintenance
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            We're performing scheduled maintenance to improve your experience. We'll be back shortly.
          </motion.p>

          <motion.div
            className="pt-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Estimated time remaining: {formatTime(timeRemaining)}</span>
              </div>

              <Progress value={progress} className="h-2" />

              <div className="text-xs text-muted-foreground">{progress.toFixed(0)}% complete</div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>Maintenance started: May 17, 2025 at 10:00 AM UTC</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" asChild>
                  <a href="https://status.webcanister.com" target="_blank" rel="noopener noreferrer">
                    <Wrench className="h-4 w-4 mr-2" />
                    Status Page
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Try Homepage
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      alert("You'll be notified when maintenance is complete")
                    }}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Get Notified
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
