"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

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
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="bg-background border-t border-gray-200 dark:border-gray-800">
      {/* Copyright */}
      <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Lessly. All rights reserved.
      </div>
    </footer>
  );
}
