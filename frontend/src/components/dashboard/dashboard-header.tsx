"use client"

import { useState } from "react"
import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500 mr-2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M12 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 12h.01" />
                <path d="M12 12h.01" />
                <path d="M17 12h.01" />
                <path d="M7 17h.01" />
                <path d="M12 17h.01" />
                <path d="M17 17h.01" />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                WebCanister
              </span>
            </Link>
          </div>

          <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full">
              {searchOpen ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="pl-10"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-between text-gray-400"
                  onClick={() => setSearchOpen(true)}
                >
                  <div className="flex items-center">
                    <Search className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span>Search projects...</span>
                  </div>
                  <span className="text-xs border rounded px-1.5 py-0.5 border-gray-300 dark:border-gray-600">⌘K</span>
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
