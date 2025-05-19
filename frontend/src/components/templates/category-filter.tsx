"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface CategoryFilterProps {
  category: string
  isSelected: boolean
  onToggle: (category: string) => void
}

export default function CategoryFilter({ category, isSelected, onToggle }: CategoryFilterProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm ${
        isSelected
          ? "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
      }`}
      onClick={() => onToggle(category)}
    >
      <span>{category}</span>
      {isSelected && <Check className="h-4 w-4" />}
    </motion.button>
  )
}
