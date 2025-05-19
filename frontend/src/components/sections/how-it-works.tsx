"use client"

import { motion } from "framer-motion"
import { MousePointer, Upload, Share } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: <MousePointer className="h-6 w-6" />,
      title: "Build Visually",
      description: "Design your site using our drag-and-drop builder.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      number: "2",
      icon: <Upload className="h-6 w-6" />,
      title: "Click Deploy",
      description: "We package your site and send it to your blockchain canister.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      number: "3",
      icon: <Share className="h-6 w-6" />,
      title: "Share Your URL",
      description: "Your site is live! Accessible globally with a decentralized web address.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-zinc-950 max-w-7xl mx-auto rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How It Works (Simple as 1-2-3)
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our platform makes it incredibly easy to build and deploy websites to the blockchain in just a few simple
            steps.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 transform -translate-y-1/2 hidden md:block"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 relative"
              >
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border-4 border-gray-200 dark:border-gray-800 flex items-center justify-center text-lg font-bold text-gray-900 dark:text-white">
                  {step.number}
                </div>
                <div className="pt-4">
                  <div className={`p-3 rounded-lg ${step.bgColor} ${step.color} inline-block mb-4`}>{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="relative aspect-video bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white"
                    >
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
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">See it in action</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Watch our quick demo video to see how easy it is to build and deploy a website to the Internet
                  Computer in under 60 seconds.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Watch Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
