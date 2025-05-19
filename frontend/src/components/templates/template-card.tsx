"use client"

import { motion } from "framer-motion"
import { Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/lib/types"

interface TemplateCardProps {
  template: Template
  onPreview: () => void
  onUse: () => void
}

export default function TemplateCard({ template, onPreview, onUse }: TemplateCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden h-full flex flex-col"
    >
      <div className="relative group">
        <div
          className="aspect-video bg-cover bg-center"
          style={{ backgroundImage: `url(${template.thumbnail})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm" onClick={onPreview} className="mr-2">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{template.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button onClick={onUse} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Use Template
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  )
}
