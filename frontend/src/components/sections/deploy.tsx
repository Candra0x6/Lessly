"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Zap, Check } from "lucide-react";

export default function Deploy() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const benefits = [
    {
      icon: <Check className="h-5 w-5" />,
      text: "Censorship-Resistant Hosting",
    },
    {
      icon: <Check className="h-5 w-5" />,
      text: "Always Available",
    },
    {
      icon: <Check className="h-5 w-5" />,
      text: "Instant Content Updates",
    },
  ];

  return (
    <section id="deploy" className="py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={container}
            className="order-2 md:order-1"
          >
            <motion.div variants={item} className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                <Zap className="h-4 w-4 mr-1" />
                One-Click Publish
              </span>
            </motion.div>
            <motion.h2
              variants={item}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              One Click to Go Live — Instantly on the Blockchain
            </motion.h2>
            <motion.p
              variants={item}
              className="text-lg text-gray-600 dark:text-gray-400 mb-6"
            >
              Say goodbye to domain configuration, hosting plans, and deployment
              pipelines. With a single click, your site is instantly published
              on the <strong>Internet Computer Protocol</strong>, giving you a
              public, permanent web address like:
            </motion.p>

            <motion.div
              variants={item}
              className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg font-mono text-sm mb-8 overflow-x-auto"
            >
              <code className="text-blue-600 dark:text-blue-400">
                https://yourapp.ic0.app/yourproject/web
              </code>
            </motion.div>

            <motion.div variants={container} className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-20 transform -rotate-6"></div>
              <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Publish.ic
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>

                    <motion.div
                      className="h-12 w-full bg-yellow-500 rounded-lg flex items-center justify-center text-white font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      <span>Publish to Internet Computer</span>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-800 p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Ready to publish
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Estimated time: 5 seconds
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Zap className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
