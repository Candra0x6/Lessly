"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Eye, MoreVertical, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  onClick?: (project: Project) => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick(project)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${project.thumbnail})` }}></div>
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" className="h-8">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="secondary" className="h-8">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4" onClick={handleClick}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{project.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.status === "published"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
            }`}
          >
            {project.status === "published" ? "Published" : "Draft"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Modified {formatDate(project.lastModified)}</span>
        </div>
      </div>
    </motion.div>
  )
}
