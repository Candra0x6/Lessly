"use client";

import { motion } from "framer-motion";
import { Brain, Database, Globe } from "lucide-react";

export default function Scale() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Powered by Internet Computer",
      description:
        "Leverage the power of the Internet Computer Protocol for a truly decentralized web experience.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Dynamic Canister Storage",
      description:
        "Your website is stored in dedicated smart canisters, providing secure and scalable storage.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Serve Unlimited Websites",
      description:
        "Create and publish as many websites as you need, all running on the decentralized web.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ];

  return (
    <section id="scale" className="py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Made for Scale. Built for Web3.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We've built this platform to scale with your ambitions. Under the
            hood, every project is stored in a dedicated file space and served
            dynamically via our Motoko smart canisters—offering performance,
            flexibility, and full ownership.
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
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
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
          <div className="relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Technical Architecture
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our platform leverages the Internet Computer's unique
                  architecture to provide a truly decentralized web experience.
                  Each website is stored in a dedicated canister, ensuring
                  security, scalability, and ownership.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">
                      Smart canisters written in Motoko for optimal performance
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">
                      Distributed storage across the Internet Computer network
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">
                      Automatic content delivery through the Internet Computer
                      Protocol
                    </p>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white"
                  >
                    <Brain className="h-6 w-6" />
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                    className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white"
                  >
                    <Database className="h-6 w-6" />
                  </motion.div>
                  <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        Internet Computer
                      </div>
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-20 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                          <div className="h-8 w-8 bg-blue-500 rounded"></div>
                        </div>
                        <div className="h-20 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                          <div className="h-8 w-8 bg-purple-500 rounded"></div>
                        </div>
                        <div className="h-20 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                          <div className="h-8 w-8 bg-green-500 rounded"></div>
                        </div>
                      </div>
                      <div className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                      <div className="h-8 w-2/3 mx-auto bg-blue-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
