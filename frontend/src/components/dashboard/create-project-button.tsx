"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreateProjectButtonProps {
  large?: boolean
}

export default function CreateProjectButton({ large }: CreateProjectButtonProps) {
  return large ? (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Plus className="h-5 w-5 mr-2" />
      Create New Project
    </motion.button>
  ) : (
    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
      <Plus className="h-4 w-4 mr-2" />
      New Project
    </Button>
  )
}
