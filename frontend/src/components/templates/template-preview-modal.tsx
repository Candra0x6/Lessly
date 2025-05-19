"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/lib/types"

interface TemplatePreviewModalProps {
  template: Template
  isOpen: boolean
  onClose: () => void
  onUse: () => void
}

export default function TemplatePreviewModal({ template, isOpen, onClose, onUse }: TemplatePreviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const previewImages = template.previewImages || [template.thumbnail]

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % previewImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mr-3">{template.name}</h2>
                <Badge variant="outline">{template.category}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="relative">
                <div className="aspect-[16/9] bg-gray-100 dark:bg-zinc-800 relative">
                  <img
                    src={previewImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`${template.name} preview ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />

                  {previewImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-10 w-10"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-10 w-10"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>

                {previewImages.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {previewImages.map((_, index) => (
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{template.description}</p>

                {template.features && (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 dark:text-gray-400 mb-6">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Preview {currentImageIndex + 1} of {previewImages.length}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={onUse}>
                  Use This Template
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
