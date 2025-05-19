"use client"

import { motion } from "framer-motion"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
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
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  WebCanister
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Build and deploy websites to the Internet Computer blockchain with our visual builder. No coding
                required.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {footerLinks.map((group) => (
              <div key={group.title}>
                <motion.h3 variants={item} className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  {group.title}
                </motion.h3>
                <motion.ul variants={container} className="space-y-3">
                  {group.links.map((link) => (
                    <motion.li key={link.name} variants={item}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} WebCanister. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
