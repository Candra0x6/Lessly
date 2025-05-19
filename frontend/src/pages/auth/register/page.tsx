"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowRight, CheckCircle, Loader2, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    subscription: "free",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubscriptionChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subscription: value }))
  }

  const handleTermsChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, termsAccepted: checked }))

    if (errors.terms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.terms
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formState.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formState.termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)

      // Redirect to dashboard after successful registration
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      setErrors({ form: "Registration failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const subscriptionOptions = [
    {
      id: "free",
      title: "Free",
      description: "Basic features for personal projects",
    },
    {
      id: "pro",
      title: "Pro",
      description: "Advanced features for professionals",
    },
    {
      id: "team",
      title: "Team",
      description: "Collaboration tools for teams",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
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
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                WebCanister
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
              <div className="relative p-6 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                >
                  <User className="h-8 w-8 text-purple-500" />
                </motion.div>
              </div>
            </div>

            <div className="p-6">
              <motion.div variants={item} className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Registration</h1>
                <p className="text-gray-600 dark:text-gray-400">Just a few more details to get you started</p>
              </motion.div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Registration Complete!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You're all set. Redirecting you to your dashboard...
                  </p>
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  </div>
                </motion.div>
              ) : (
                <motion.form variants={item} onSubmit={handleSubmit} className="space-y-6">
                  {errors.form && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{errors.form}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formState.username}
                      onChange={handleChange}
                      className={errors.username ? "border-red-500" : ""}
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label>Subscription Plan</Label>
                    <RadioGroup
                      value={formState.subscription}
                      onValueChange={handleSubscriptionChange}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {subscriptionOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            formState.subscription === option.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                          <Label htmlFor={option.id} className="flex flex-col cursor-pointer">
                            <span className="font-medium text-gray-900 dark:text-white">{option.title}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{option.description}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" checked={formState.termsAccepted} onCheckedChange={handleTermsChange} />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className={`text-sm font-medium leading-none ${
                          errors.terms ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        I accept the terms and conditions
                      </Label>
                      {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Complete Registration
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <Link href="/auth" className="text-blue-500 hover:text-blue-600">
                  Back to login
                </Link>
                <Link href="/help" className="text-blue-500 hover:text-blue-600">
                  Need help?
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
