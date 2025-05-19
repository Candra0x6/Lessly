"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                WebCanister
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <motion.nav className="flex items-center space-x-6">
                {["Features", "Deploy", "How It Works", "Scale"].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.nav>

              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  Start Building
                </Button>
              </motion.div>
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-6">
                {["Features", "Deploy", "How It Works", "Scale"].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-lg font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Start Building</Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
