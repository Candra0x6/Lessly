"use client"

import type React from "react"

import { motion } from "framer-motion"
import ProjectCard from "./project-card"
import type { Project } from "@/lib/types"

interface ProjectGridProps {
  projects: Project[]
  loading?: boolean
  emptyState?: React.ReactNode
  onProjectClick?: (project: Project) => void
}

export default function ProjectGrid({ projects, loading, emptyState, onProjectClick }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4"></div>
              <div className="mt-4 flex items-center justify-between">
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
      ))}
    </motion.div>
  )
}
