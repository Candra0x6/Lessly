"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, X, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import TemplateCard from "@/components/templates/template-card"
import TemplateListItem from "@/components/templates/template-list-item"
import TemplatePreviewModal from "@/components/templates/template-preview-modal"
import CategoryFilter from "@/components/templates/category-filter"
import { templates } from "@/lib/templates"
import type { Template } from "@/lib/types"
import { useRouter } from "next/navigation"

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templates)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  // Get all unique categories
  const allCategories = Array.from(new Set(templates.map((template) => template.category)))

  // Filter templates based on search query and selected categories
  useEffect(() => {
    let filtered = [...templates]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags?.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((template) => selectedCategories.includes(template.category))
    }

    setFilteredTemplates(filtered)
  }, [searchQuery, selectedCategories])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchQuery("")
  }

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template)
  }

  const handleUseTemplate = (template: Template) => {
    // Redirect to create project page with template ID
    router.push(`/create-project?template=${template.id}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Template Gallery</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse and select from our collection of professionally designed templates
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-64 hidden md:block"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
              <h2 className="font-medium text-gray-900 dark:text-white mb-4">Categories</h2>
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <CategoryFilter
                    key={category}
                    category={category}
                    isSelected={selectedCategories.includes(category)}
                    onToggle={handleCategoryToggle}
                  />
                ))}
              </div>

              {(selectedCategories.length > 0 || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            {/* Search and Filters Bar */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
                    <TabsList className="grid w-[100px] grid-cols-2">
                      <TabsTrigger value="grid">
                        <Grid className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="list">
                        <List className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 md:hidden"
                >
                  <h2 className="font-medium text-gray-900 dark:text-white mb-2">Categories</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {allCategories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {(selectedCategories.length > 0 || searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 && "s"}
              </p>
              {selectedCategories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Filtered by:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <button onClick={() => handleCategoryToggle(category)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Templates Grid/List */}
            {filteredTemplates.length > 0 ? (
              <motion.div variants={container} initial="hidden" animate="show">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                      <motion.div key={template.id} variants={item}>
                        <TemplateCard
                          template={template}
                          onPreview={() => handlePreview(template)}
                          onUse={() => handleUseTemplate(template)}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTemplates.map((template) => (
                      <motion.div key={template.id} variants={item}>
                        <TemplateListItem
                          template={template}
                          onPreview={() => handlePreview(template)}
                          onUse={() => handleUseTemplate(template)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No templates found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUse={() => handleUseTemplate(previewTemplate)}
        />
      )}
    </div>
  )
}
