"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterBarProps {
  filters: {
    status: string
    sort: string
    search: string
  }
  onFilterChange: (filters: Partial<{ status: string; sort: string; search: string }>) => void
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
            Status
          </Label>
          <Select value={filters.status} onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger id="status-filter" className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sort-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
            Sort By
          </Label>
          <Select value={filters.sort} onValueChange={(value) => onFilterChange({ sort: value })}>
            <SelectTrigger id="sort-filter" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="search-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
            Search
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              id="search-filter"
              type="search"
              placeholder="Search projects..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
