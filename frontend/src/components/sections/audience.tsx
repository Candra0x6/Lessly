"use client"

import { motion } from "framer-motion"
import { Palette, Megaphone, Construction } from "lucide-react"

export default function Audience() {
  const audiences = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Designers",
      description: "Focus on UI, not code",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Marketers",
      description: "Go live instantly",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      icon: <Construction className="h-8 w-8" />,
      title: "Builders",
      description: "Deploy fast, iterate faster",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
  ]

  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Perfect for Creators, Startups, and Builders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Whether you're a freelancer, startup founder, or community leader, our platform gives you a competitive
            edge. Launch product pages, portfolios, or landing pages that scale securely from day one.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 text-center"
              whileHover={{ y: -10 }}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`mx-auto p-4 rounded-full ${audience.bgColor} ${audience.color} inline-block mb-6`}
              >
                {audience.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{audience.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{audience.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to launch your next project?</h3>
          <p className="text-lg text-blue-100 mb-6">
            Join thousands of creators who are already building on the decentralized web.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium"
          >
            Start Building Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
