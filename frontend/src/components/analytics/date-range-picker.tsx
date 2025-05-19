"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export function DateRangePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
          <Calendar className="mr-2 h-4 w-4" />
          <span>May 1, 2025 - May 31, 2025</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="w-full">
              Cancel
            </Button>
            <Button size="sm" className="w-full">
              Apply
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              Yesterday
            </Button>
            <Button variant="outline" size="sm">
              This Week
            </Button>
            <Button variant="outline" size="sm">
              Last Week
            </Button>
            <Button variant="outline" size="sm">
              This Month
            </Button>
            <Button variant="outline" size="sm">
              Last Month
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
