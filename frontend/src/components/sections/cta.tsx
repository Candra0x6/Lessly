"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Cta() {
  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>

            <motion.div
              className="absolute top-10 left-10 text-white/10"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="160"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-10 text-white/10"
              animate={{
                rotate: -360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="160"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 12V2" />
                <path d="M12 12 4 4" />
              </svg>
            </motion.div>
          </div>

          <div className="relative z-10 px-6 py-16 md:py-20 md:px-20 text-center">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Start Building the Future of the Web Today
            </motion.h2>

            <motion.p
              className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Own your content. Host your vision. Join the decentralized web revolution.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Free – No Wallet Needed
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Deploy to Web3 in Under 1 Minute
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.p
              className="mt-8 text-sm text-blue-100/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              No credit card required. Free plan available with premium upgrades.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
