"use client"

import { motion } from "framer-motion"
import { Lock, Shield, Globe } from "lucide-react"

export default function Decentralized() {
  const features = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "No Vendor Lock-in",
      description:
        "Your website lives on the blockchain, not on our servers. You maintain complete ownership and control.",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Tamper-proof Deployment",
      description:
        "Once deployed, your website is secured by blockchain technology, making it resistant to tampering and censorship.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Globally Distributed Infrastructure",
      description:
        "Your website runs on a network of nodes distributed worldwide, ensuring high availability and performance.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-950 max-w-7xl mx-auto rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Truly Decentralized. Fully Yours.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Every website you publish is stored on-chain using smart canisters—no third-party hosting, no central
            servers. You control your content, your access, your future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`p-3 rounded-lg ${feature.bgColor} ${feature.color} inline-block mb-4`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-20"></div>
          <div className="relative bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Blockchain-Powered Web Hosting
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Traditional web hosting relies on centralized servers that can go down, be censored, or suddenly
                  change pricing. With our platform, your website lives on the Internet Computer blockchain, giving you
                  true ownership and permanence.
                </p>
                <div className="flex items-center space-x-2 text-blue-500">
                  <span className="font-medium">Learn more about Internet Computer</span>
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
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="aspect-video bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
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
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      How the Internet Computer works
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
