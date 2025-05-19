"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MousePointer, Palette, Eye, MousePointer2 } from "lucide-react"

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <MousePointer className="h-6 w-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      title: "Visual Builder",
      description: "Design your website visually with our intuitive drag-and-drop interface. No coding required.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      title: "Fully Customizable Templates",
      description: "Start with professionally designed templates and customize every aspect to match your brand.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      title: "Live Preview and Instant Deploy",
      description: "See changes in real-time and deploy instantly to the Internet Computer blockchain.",
    },
  ]

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

  const featureScreens = [
    <div key="visual-builder" className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 h-full ">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex h-[300px]">
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-800 p-2">
          <div className="space-y-2">
            <div className="h-8 w-full bg-blue-100 dark:bg-blue-900/30 rounded"></div>
            <div className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="w-3/4 p-2">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
          <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded mb-2"></div>
          <div className="h-12 w-1/3 bg-blue-500 rounded"></div>
        </div>
        <motion.div
          className="absolute"
          animate={{
            x: [100, 150, 200, 250, 200, 150, 100],
            y: [100, 150, 120, 180, 150, 120, 100],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <MousePointer2 className="h-5 w-5 text-blue-500" />
        </motion.div>
      </div>

    </div>,

    <div key="templates" className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 h-full">
      <div className="grid grid-cols-2 gap-4 h-[300px]">
        <div className="space-y-4">
          <div className="h-40 bg-purple-100 dark:bg-purple-900/30 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 p-2">
              <div className="h-6 w-1/2 bg-purple-200 dark:bg-purple-800 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-purple-200 dark:bg-purple-800 rounded mb-2"></div>
              <div className="h-12 w-full bg-purple-200 dark:bg-purple-800 rounded"></div>
            </div>
          </div>
          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 p-2">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 p-2">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 p-2">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 text-white rounded-lg flex items-center justify-center text-lg font-bold"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
      >
        <Palette className="h-10 w-10" />
      </motion.div>
    </div>,

    <div key="preview" className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 h-full">
      <div className="flex h-[300px]">
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-800 p-2">
          <div className="h-full bg-gray-100 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="h-8 w-3/4 bg-green-100 dark:bg-green-900/30 rounded mb-4"></div>
              <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-10 w-1/3 bg-green-500 rounded"></div>
            </div>
            <motion.div
              className="absolute top-2 right-2 text-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Eye className="h-6 w-6" />
            </motion.div>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="h-full bg-gray-100 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="h-8 w-3/4 bg-green-100 dark:bg-green-900/30 rounded mb-4"></div>
              <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-10 w-1/3 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <motion.div
          className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        >
          <span>Deploy Now</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </motion.div>
      </div>
    </div>,
  ]

  return (
    <section id="features" className="py-20 bg-gray-50 rounded-2xl dark:bg-zinc-950 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            No Developers Needed — Just Drag, Drop & Deploy
          </motion.h2>
          <motion.p variants={item} className="text-xl text-gray-600 dark:text-gray-400">
            Our intuitive visual builder makes it easy to create stunning websites without writing a single line of
            code.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeFeature === index
                  ? `${feature.bgColor} border-2 border-${feature.color.split("-")[1]}-500`
                  : "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 hover:shadow-md"
                  }`}
                whileHover={{ y: -5 }}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`p-3 rounded-lg ${feature.bgColor} ${feature.color} inline-block mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-2xl shadow-lg relative"
          >
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-[350px] overflow-hidden"
            >
              {featureScreens[activeFeature]}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
