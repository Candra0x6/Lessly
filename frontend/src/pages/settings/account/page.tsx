"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Save,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle,
  Lock,
  Key,
  User,
  Bell,
  Loader2,
  AlertTriangle,
  ChevronRight,
  Mail,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"

// Mock user data
const mockUser = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  createdAt: "2023-01-15T10:30:00Z",
  subscription: {
    plan: "Pro",
    status: "active",
    renewalDate: "2023-12-15T10:30:00Z",
    price: 19,
    billingCycle: "monthly",
  },
}

// Mock payment methods
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  },
]

// Mock subscription plans
const mockSubscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "For individuals just getting started",
    features: ["Basic command palette", "5 AI commands per day", "Standard response time", "Community support"],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and power users",
    features: [
      "Advanced command palette",
      "Unlimited AI commands",
      "Priority response time",
      "Voice commands",
      "Cross-platform sync",
      "Email support",
    ],
    current: true,
  },
  {
    id: "team",
    name: "Team",
    price: 49,
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Admin dashboard",
      "Custom commands",
      "API access",
      "Priority support",
    ],
    current: false,
  },
]

// Mock billing history
const mockBillingHistory = [
  {
    id: "inv_1",
    date: "2023-11-15T10:30:00Z",
    amount: 19,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "inv_2",
    date: "2023-10-15T10:30:00Z",
    amount: 19,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "inv_3",
    date: "2023-09-15T10:30:00Z",
    amount: 19,
    status: "paid",
    description: "Pro Plan - Monthly",
  },
]

export default function AccountSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    productUpdates: true,
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    rememberDevices: true,
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle save profile
  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser((prev) => ({
      ...prev,
      name: profileForm.name,
      email: profileForm.email,
    }))
    setIsSaving(false)
  }

  // Handle payment method form change
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPaymentMethod((prev) => ({ ...prev, [name]: value }))
  }

  // Handle add payment method
  const handleAddPaymentMethod = async () => {
    setIsAddingPaymentMethod(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const newId = `pm_${paymentMethods.length + 1}`
    setPaymentMethods([
      ...paymentMethods,
      {
        id: newId,
        type: "card",
        brand: "visa",
        last4: newPaymentMethod.cardNumber.slice(-4),
        expMonth: Number.parseInt(newPaymentMethod.expiry.split("/")[0]),
        expYear: Number.parseInt(`20${newPaymentMethod.expiry.split("/")[1]}`),
        isDefault: false,
      },
    ])
    setNewPaymentMethod({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    })
    setIsAddingPaymentMethod(false)
  }

  // Handle set default payment method
  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    )
  }

  // Handle remove payment method
  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id))
  }

  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle change password
  const handleChangePassword = async () => {
    setIsChangingPassword(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsChangingPassword(false)
  }

  // Handle change subscription plan
  const handleChangePlan = async (planId: string) => {
    setIsChangingPlan(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const newPlan = mockSubscriptionPlans.find((plan) => plan.id === planId)
    if (newPlan) {
      setUser((prev) => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          plan: newPlan.name,
          price: newPlan.price,
        },
      }))
    }
    setIsChangingPlan(false)
  }

  // Handle notification setting change
  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Handle security setting change
  const handleSecurityChange = (setting: string, value: boolean | string) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Handle delete account
  const handleDeleteAccount = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <div onClick={() => router.push("/dashboard")} className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </div>
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account preferences and settings</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            {/* Settings Navigation */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden h-fit">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
              </div>
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "profile"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <User className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">Profile</span>
                  {activeTab === "profile" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("subscription")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "subscription"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">Subscription & Billing</span>
                  {activeTab === "subscription" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "security"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Lock className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">Security</span>
                  {activeTab === "security" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "notifications"
                      ? "bg-blue-50 border-l-2 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Bell className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">Notifications</span>
                  {activeTab === "notifications" && <ChevronRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setActiveTab("danger")}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === "danger"
                      ? "bg-red-50 border-l-2 border-red-500 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">Danger Zone</span>
                  {activeTab === "danger" && <ChevronRight className="h-4 w-4" />}
                </button>
              </nav>
            </div>

            {/* Settings Content */}
            <div>
              {/* Profile */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Information</h2>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button
                              size="sm"
                              className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Photo</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              JPG, GIF or PNG. Max size 2MB.
                            </p>
                            <div className="mt-2 flex space-x-2">
                              <Button size="sm" variant="outline">
                                Upload
                              </Button>
                              <Button size="sm" variant="ghost">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-700 dark:text-gray-300">Account Created</Label>
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(user.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Subscription & Billing */}
              {activeTab === "subscription" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Current Subscription */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Subscription</h2>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {user.subscription.plan} Plan
                            </h3>
                            <Badge className="ml-2 bg-green-500">Active</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {formatCurrency(user.subscription.price)}/{user.subscription.billingCycle} · Renews on{" "}
                            {formatDate(user.subscription.renewalDate)}
                          </p>
                        </div>
                        <Button variant="outline">Manage Subscription</Button>
                      </div>
                    </div>
                  </div>

                  {/* Subscription Plans */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Available Plans</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {mockSubscriptionPlans.map((plan) => (
                          <div
                            key={plan.id}
                            className={`border rounded-lg p-6 ${
                              plan.current
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                                <div className="mt-1">
                                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${plan.price}
                                  </span>
                                  {plan.price > 0 && (
                                    <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                                  )}
                                </div>
                              </div>
                              {plan.current && <CheckCircle className="h-5 w-5 text-blue-500" />}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                            <ul className="space-y-2 mb-6">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              className={`w-full ${
                                plan.current
                                  ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-default"
                                  : "bg-blue-500 hover:bg-blue-600 text-white"
                              }`}
                              disabled={plan.current || isChangingPlan}
                              onClick={() => handleChangePlan(plan.id)}
                            >
                              {isChangingPlan ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Changing...
                                </>
                              ) : plan.current ? (
                                "Current Plan"
                              ) : (
                                "Switch Plan"
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Payment Methods</h2>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Payment Method
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Payment Method</DialogTitle>
                              <DialogDescription>Add a new credit or debit card.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="cardName">Name on Card</Label>
                                <Input
                                  id="cardName"
                                  name="cardName"
                                  placeholder="John Doe"
                                  value={newPaymentMethod.cardName}
                                  onChange={handlePaymentMethodChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  value={newPaymentMethod.cardNumber}
                                  onChange={handlePaymentMethodChange}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input
                                    id="expiry"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={newPaymentMethod.expiry}
                                    onChange={handlePaymentMethodChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input
                                    id="cvc"
                                    name="cvc"
                                    placeholder="123"
                                    value={newPaymentMethod.cvc}
                                    onChange={handlePaymentMethodChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={handleAddPaymentMethod}
                                disabled={isAddingPaymentMethod}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                {isAddingPaymentMethod ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                  </>
                                ) : (
                                  "Add Payment Method"
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg gap-4"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-4">
                                {method.brand === "visa" ? (
                                  <span className="text-blue-600 font-bold">VISA</span>
                                ) : (
                                  <span className="text-red-600 font-bold">MC</span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ending in{" "}
                                  {method.last4}
                                  {method.isDefault && (
                                    <Badge variant="outline" className="ml-2 border-blue-500 text-blue-500">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Expires {method.expMonth}/{method.expYear}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 self-end sm:self-auto">
                              {!method.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultPaymentMethod(method.id)}
                                >
                                  Set as Default
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemovePaymentMethod(method.id)}
                                disabled={method.isDefault}
                              >
                                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Billing History</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Description
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Invoice
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {mockBillingHistory.map((invoice) => (
                              <tr key={invoice.id}>
                                <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                                  {formatDate(invoice.date)}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                                  {invoice.description}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                                  {formatCurrency(invoice.amount)}
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  <Badge
                                    className={
                                      invoice.status === "paid"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                    }
                                  >
                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                  </Badge>
                                </td>
                                <td className="px-4 py-4 text-sm text-right">
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Password */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">
                            Current Password
                          </Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">
                            New Password
                          </Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <Button
                        onClick={handleChangePassword}
                        disabled={
                          isChangingPassword ||
                          !passwordForm.currentPassword ||
                          !passwordForm.newPassword ||
                          passwordForm.newPassword !== passwordForm.confirmPassword
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        {isChangingPassword ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Changing...
                          </>
                        ) : (
                          <>
                            <Key className="mr-2 h-4 w-4" />
                            Change Password
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Two-Factor Authentication
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                        />
                      </div>

                      {securitySettings.twoFactorAuth && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Two-Factor Authentication Methods
                          </h3>
                          <div className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Smartphone className="h-5 w-5 text-gray-500 mr-3" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    Authenticator App
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Use an authenticator app to get verification codes
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Set up
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-500 mr-3" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Email</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Get verification codes via email
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Set up
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h2>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Session Timeout</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Automatically log out after a period of inactivity
                            </p>
                          </div>
                          <select
                            value={securitySettings.sessionTimeout}
                            onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="never">Never</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Remember Devices</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Stay logged in on trusted devices
                            </p>
                          </div>
                          <Switch
                            checked={securitySettings.rememberDevices}
                            onCheckedChange={(checked) => handleSecurityChange("rememberDevices", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h2>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                Current Session (Chrome on macOS)
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                San Francisco, CA, USA · Started 2 hours ago
                              </div>
                            </div>
                            <Badge className="bg-green-500">Current</Badge>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                Safari on iPhone 13
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                San Francisco, CA, USA · Started 1 day ago
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                          Revoke All Other Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                        Notification Preferences
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                            Email Notifications
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Email Notifications
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Receive email notifications for important updates
                                </div>
                              </div>
                              <Switch
                                checked={notificationSettings.emailNotifications}
                                onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Marketing Emails
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Receive emails about new features and offers
                                </div>
                              </div>
                              <Switch
                                checked={notificationSettings.marketingEmails}
                                onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Push Notifications
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Receive push notifications on your devices
                                </div>
                              </div>
                              <Switch
                                checked={notificationSettings.pushNotifications}
                                onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                            Notification Categories
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Security Alerts
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Get notified about security-related events
                                </div>
                              </div>
                              <Switch
                                checked={notificationSettings.securityAlerts}
                                onCheckedChange={(checked) => handleNotificationChange("securityAlerts", checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Product Updates
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Get notified about new features and improvements
                                </div>
                              </div>
                              <Switch
                                checked={notificationSettings.productUpdates}
                                onCheckedChange={(checked) => handleNotificationChange("productUpdates", checked)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">Save Preferences</Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Danger Zone */}
              {activeTab === "danger" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-900/30 shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <h2 className="text-lg font-medium text-red-500">Danger Zone</h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Actions in this section can lead to permanent data loss. Please proceed with caution.
                      </p>

                      <div className="space-y-6">
                        <Card className="border-red-200 dark:border-red-900/30">
                          <CardHeader>
                            <CardTitle className="text-red-500">Delete Account</CardTitle>
                            <CardDescription>Permanently delete your account and all associated data.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              This action cannot be undone. All your data, including projects, settings, and billing
                              information will be permanently deleted.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Account
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove
                                    all your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="confirm" className="text-gray-700 dark:text-gray-300">
                                      Type "delete" to confirm
                                    </Label>
                                    <Input id="confirm" placeholder="delete" />
                                  </div>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                  >
                                    Delete Account
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </CardFooter>
                        </Card>

                        <Card className="border-red-200 dark:border-red-900/30">
                          <CardHeader>
                            <CardTitle className="text-red-500">Export All Data</CardTitle>
                            <CardDescription>Download a copy of all your data.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              This will generate a complete export of all your account data, including projects,
                              settings, and usage history.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                              Export All Data
                            </Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-red-200 dark:border-red-900/30">
                          <CardHeader>
                            <CardTitle className="text-red-500">Deactivate Account</CardTitle>
                            <CardDescription>Temporarily deactivate your account.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Your account will be deactivated and hidden from other users. You can reactivate it at any
                              time by logging in again.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                              Deactivate Account
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
