"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe, Code, Zap, Lock, Database, Layers } from "lucide-react"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const floatingIcons = [
    { icon: <Globe className="h-6 w-6" />, color: "text-blue-500", delay: 0 },
    { icon: <Code className="h-6 w-6" />, color: "text-purple-500", delay: 0.1 },
    { icon: <Zap className="h-6 w-6" />, color: "text-yellow-500", delay: 0.2 },
    { icon: <Lock className="h-6 w-6" />, color: "text-green-500", delay: 0.3 },
    { icon: <Database className="h-6 w-6" />, color: "text-pink-500", delay: 0.4 },
    { icon: <Layers className="h-6 w-6" />, color: "text-orange-500", delay: 0.5 },
  ]

  return (
    <section className="relative  pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-100"></div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 mb-12">
            <motion.div variants={item} className="inline-block">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                Powered by Internet Computer
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Build Visually. Deploy Instantly.{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Own Your Web Presence Forever.
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create stunning websites with zero code using our powerful visual builder, then launch them on the
              Internet Computer with just one click. Your site lives on-chain—secure, censorship-resistant, and always
              online.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                Start Building Now
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative w-full max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative z-10 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="bg-white dark:bg-zinc-900 p-2 rounded-t-xl border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800 aspect-video relative overflow-hidden">
                {/* Website builder interface mockup */}
                <div className="absolute top-0 left-0 w-1/5 h-full bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-gray-700 p-2">
                  <div className="space-y-2">
                    <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-full bg-blue-100 dark:bg-blue-900/30 rounded"></div>
                    <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-4/5 h-full">
                  <div className="h-full w-full bg-white dark:bg-zinc-950 p-4">
                    <div className="h-12 w-3/4 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4"></div>
                    <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                      <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                    </div>
                    <div className="h-12 w-1/3 mx-auto bg-blue-500 rounded-lg"></div>
                  </div>
                </div>

                {/* Animated cursor */}
                <motion.div
                  className="absolute w-6 h-6 pointer-events-none"
                  initial={{ x: "50%", y: "50%" }}
                  animate={{
                    x: ["50%", "30%", "70%", "40%", "60%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"],
                    y: ["50%", "30%", "60%", "70%", "40%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"],
                    scale: [1, 1, 1, 1, 1, 0.8, 1.2, 0.9, 1.1, 1, 1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-500"
                  >
                    <path
                      d="M4 4L12 12M12 12L20 20M12 12L20 4M12 12L4 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Ready to deploy</span>
                  </div>
                  <motion.div
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Deploy to IC
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating icons animation */}
            {floatingIcons.map((icon, index) => (
              <motion.div
                key={index}
                className={`absolute hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-900 shadow-lg ${icon.color}`}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  x: isHovered ? Math.sin(index * 1.5) * 120 : 0,
                  y: isHovered ? Math.cos(index * 1.5) * 120 : 0,
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.8,
                  delay: icon.delay,
                  type: "spring",
                  damping: 15,
                }}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {icon.icon}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
