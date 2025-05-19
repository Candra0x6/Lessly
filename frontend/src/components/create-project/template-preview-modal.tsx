"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Template } from "@/lib/types"

interface TemplatePreviewModalProps {
  template: Template
  isOpen: boolean
  onClose: () => void
  onSelect: () => void
}

export default function TemplatePreviewModal({ template, isOpen, onClose, onSelect }: TemplatePreviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{template.name}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="relative aspect-video">
                <img
                  src={template.previewImages?.[currentImageIndex] || template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.previewImages && template.previewImages.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {template.previewImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${
                          currentImageIndex === index ? "bg-blue-500" : "bg-white/50 hover:bg-white/80"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {template.category}
                  </span>
                  {template.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{template.description}</p>

                {template.features && (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Features</h3>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 mb-6 space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <Button variant="outline" onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={onSelect}>
                Use This Template
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
