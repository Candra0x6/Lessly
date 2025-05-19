"use client"

import { motion } from "framer-motion"
import { Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/lib/types"

interface TemplateListItemProps {
  template: Template
  onPreview: () => void
  onUse: () => void
}

export default function TemplateListItem({ template, onPreview, onUse }: TemplateListItemProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 lg:w-64">
          <div
            className="aspect-video sm:h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${template.thumbnail})` }}
          ></div>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
              <Badge variant="outline" className="mt-1">
                {template.category}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-auto">
            <Button variant="outline" size="sm" onClick={onPreview}>
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button size="sm" onClick={onUse} className="bg-blue-500 hover:bg-blue-600 text-white">
              Use Template
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
