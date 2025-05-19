"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: "Free",
      description: "For individuals just getting started",
      price: { monthly: 0, annual: 0 },
      features: ["Basic command palette", "5 AI commands per day", "Standard response time", "Community support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For professionals and power users",
      price: { monthly: 12, annual: 9 },
      features: [
        "Advanced command palette",
        "Unlimited AI commands",
        "Priority response time",
        "Voice commands",
        "Cross-platform sync",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Team",
      description: "For teams and organizations",
      price: { monthly: 29, annual: 24 },
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Custom commands",
        "API access",
        "Priority support",
      ],
      cta: "Contact Sales",
      popular: false,
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

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={item} className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <Check className="h-4 w-4 mr-1" />
              Simple Pricing
            </span>
          </motion.div>
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Choose the perfect plan for your needs
          </motion.h2>
          <motion.p variants={item} className="text-xl text-gray-600 dark:text-gray-400">
            Start for free and upgrade as you grow. All plans come with a 14-day money-back guarantee.
          </motion.p>

          <motion.div variants={item} className="flex items-center justify-center mt-8 space-x-3">
            <span
              className={`text-sm font-medium ${!annual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Monthly
            </span>
            <Switch checked={annual} onCheckedChange={setAnnual} className="data-[state=checked]:bg-blue-500" />
            <span
              className={`text-sm font-medium ${annual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Annual
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Save 25%
              </span>
            </span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-xl shadow-blue-500/10"
                  : "border border-gray-200 dark:border-gray-800 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6 bg-white dark:bg-zinc-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-600 dark:text-gray-400 ml-1">/{annual ? "mo" : "mo"}</span>
                  )}
                  {annual && plan.price.monthly > 0 && <p className="text-sm text-gray-500 mt-1">Billed annually</p>}
                </div>

                <Button
                  className={`w-full mb-6 ${plan.popular ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
            Need a custom plan for your enterprise?
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">More info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Our enterprise plan includes custom integrations, dedicated support, and advanced security features.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
          <Button
            variant="link"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
          >
            Contact our sales team
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
