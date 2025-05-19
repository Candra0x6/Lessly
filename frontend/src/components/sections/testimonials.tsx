"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Designer",
      company: "Figma",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "CommandAI has completely transformed my workflow. I can access all my tools and AI features with just a keyboard shortcut, saving me hours every week.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      company: "Vercel",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The AI-powered assistance is mind-blowing. It's like having a second brain that understands exactly what I need and delivers it instantly.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      company: "YouTube",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "As a content creator, I need tools that help me work faster without sacrificing quality. CommandAI does exactly that, and the voice commands feature is a game-changer.",
      rating: 4,
    },
  ]

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
              <Star className="h-4 w-4 mr-1 fill-current" />
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Loved by thousands of users
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See what our users are saying about how CommandAI has transformed their workflow.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-6 -left-6 text-6xl text-blue-200 dark:text-blue-900 opacity-50">
            <Quote />
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
                      <img
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1.5 shadow-md">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{testimonials[activeIndex].content}"
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                    </p>
                    <div className="flex items-center mt-2 justify-center md:justify-start">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[activeIndex].rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 dark:text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button variant="outline" size="icon" onClick={handlePrev} className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext} className="h-8 w-8 rounded-full">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 flex space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index ? "w-6 bg-blue-500" : "w-2 bg-gray-300 dark:bg-gray-700"
                  }`}
                  onClick={() => {
                    setAutoplay(false)
                    setActiveIndex(index)
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
