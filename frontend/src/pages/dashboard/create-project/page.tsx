"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import TemplateGrid from "@/components/create-project/template-grid"
import { templates } from "@/lib/templates"

export default function CreateProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState<"info" | "template">("info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectInfo((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!projectInfo.name.trim()) {
      newErrors.name = "Project name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateInfo()) {
      setStep("template")
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleCreateProject = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to editor or dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to create project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Set up your new web project on Internet Computer</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex">
              <button
                className={`px-6 py-3 font-medium text-sm relative ${
                  step === "info" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setStep("info")}
              >
                Project Information
                {step === "info" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm relative ${
                  step === "template" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => validateInfo() && setStep("template")}
              >
                Choose Template
                {step === "template" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            {step === "info" ? (
              <motion.form
                variants={container}
                initial="hidden"
                animate="show"
                onSubmit={handleInfoSubmit}
                className="max-w-2xl mx-auto"
              >
                <motion.div variants={item} className="space-y-2 mb-6">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={projectInfo.name}
                    onChange={handleInfoChange}
                    placeholder="My Awesome Website"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </motion.div>

                <motion.div variants={item} className="space-y-2 mb-8">
                  <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                    Project Description (optional)
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={projectInfo.description}
                    onChange={handleInfoChange}
                    placeholder="Describe your project..."
                    rows={4}
                  />
                </motion.div>

                <motion.div variants={item} className="flex justify-end">
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                    Continue to Templates
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={item} className="max-w-2xl mx-auto text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Choose a Starting Point</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a template or start from scratch with a blank canvas
                  </p>
                </motion.div>

                <motion.div variants={item}>
                  <TemplateGrid
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    onSelect={handleTemplateSelect}
                  />
                </motion.div>

                <motion.div variants={item} className="flex justify-end mt-8">
                  <Button variant="outline" className="mr-4" onClick={() => setStep("info")}>
                    Back
                  </Button>
                  <Button
                    onClick={handleCreateProject}
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Project...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Project
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
