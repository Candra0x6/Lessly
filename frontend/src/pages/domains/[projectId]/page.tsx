"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Plus,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  Copy,
  RefreshCw,
  Loader2,
  Globe,
  Shield,
  Clock,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mockProjects } from "@/lib/mock-data"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock domain data
const mockDomains = [
  {
    id: "dom_1",
    domain: "mywebsite.com",
    status: "active",
    primary: true,
    ssl: "active",
    added: "2023-04-15T10:30:00Z",
    lastChecked: "2023-05-16T14:22:00Z",
    dnsRecords: [
      {
        type: "A",
        name: "@",
        value: "76.76.21.21",
        status: "verified",
      },
      {
        type: "CNAME",
        name: "www",
        value: "cname.webcanister.app",
        status: "verified",
      },
    ],
  },
  {
    id: "dom_2",
    domain: "myproject.io",
    status: "pending",
    primary: false,
    ssl: "pending",
    added: "2023-05-10T16:45:00Z",
    lastChecked: "2023-05-16T14:22:00Z",
    dnsRecords: [
      {
        type: "A",
        name: "@",
        value: "76.76.21.21",
        status: "pending",
      },
      {
        type: "CNAME",
        name: "www",
        value: "cname.webcanister.app",
        status: "pending",
      },
    ],
  },
  {
    id: "dom_3",
    domain: "brand-site.com",
    status: "error",
    primary: false,
    ssl: "error",
    added: "2023-05-05T09:15:00Z",
    lastChecked: "2023-05-16T14:22:00Z",
    dnsRecords: [
      {
        type: "A",
        name: "@",
        value: "76.76.21.21",
        status: "error",
      },
      {
        type: "CNAME",
        name: "www",
        value: "cname.webcanister.app",
        status: "pending",
      },
    ],
    error: "DNS records not properly configured",
  },
]

// Domain status component
const DomainStatus = ({ status }: { status: string }) => {
  if (status === "active") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        <Check className="w-3 h-3 mr-1" /> Active
      </Badge>
    )
  } else if (status === "pending") {
    return (
      <Badge variant="outline" className="text-yellow-500 border-yellow-500">
        <Clock className="w-3 h-3 mr-1" /> Pending
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="text-red-500 border-red-500">
        <AlertTriangle className="w-3 h-3 mr-1" /> Error
      </Badge>
    )
  }
}

// SSL status component
const SSLStatus = ({ status }: { status: string }) => {
  if (status === "active") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        <Shield className="w-3 h-3 mr-1" /> Active
      </Badge>
    )
  } else if (status === "pending") {
    return (
      <Badge variant="outline" className="text-yellow-500 border-yellow-500">
        <Clock className="w-3 h-3 mr-1" /> Pending
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="text-red-500 border-red-500">
        <AlertTriangle className="w-3 h-3 mr-1" /> Error
      </Badge>
    )
  }
}

// DNS record status component
const DNSRecordStatus = ({ status }: { status: string }) => {
  if (status === "verified") {
    return <Check className="w-4 h-4 text-green-500" />
  } else if (status === "pending") {
    return <Clock className="w-4 h-4 text-yellow-500" />
  } else {
    return <X className="w-4 h-4 text-red-500" />
  }
}

export default function DomainManagementPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string

  // Find the project from mock data
  const project = mockProjects.find((p) => p.id === projectId) || {
    id: projectId,
    name: "Sample Project",
    description: "A sample project for domain management",
    thumbnail: "/placeholder.svg?height=200&width=400",
    status: "draft" as const,
    lastModified: new Date().toISOString(),
  }

  const [domains, setDomains] = useState(mockDomains)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(domains[0]?.id || null)
  const [newDomain, setNewDomain] = useState("")
  const [isAddingDomain, setIsAddingDomain] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [copied, setCopied] = useState<string | null>(null)

  // Get the selected domain object
  const activeDomain = domains.find((d) => d.id === selectedDomain)

  // Handle add domain
  const handleAddDomain = () => {
    if (!newDomain) return

    setIsAddingDomain(true)
    // Simulate API call
    setTimeout(() => {
      const newId = `dom_${domains.length + 1}`
      const newDomainObj = {
        id: newId,
        domain: newDomain,
        status: "pending",
        primary: domains.length === 0,
        ssl: "pending",
        added: new Date().toISOString(),
        lastChecked: new Date().toISOString(),
        dnsRecords: [
          {
            type: "A",
            name: "@",
            value: "76.76.21.21",
            status: "pending",
          },
          {
            type: "CNAME",
            name: "www",
            value: "cname.webcanister.app",
            status: "pending",
          },
        ],
      }
      setDomains([...domains, newDomainObj])
      setSelectedDomain(newId)
      setNewDomain("")
      setIsAddingDomain(false)
    }, 1000)
  }

  // Handle remove domain
  const handleRemoveDomain = (id: string) => {
    setDomains(domains.filter((d) => d.id !== id))
    if (selectedDomain === id) {
      setSelectedDomain(domains[0]?.id || null)
    }
  }

  // Handle set primary domain
  const handleSetPrimaryDomain = (id: string) => {
    setDomains(
      domains.map((d) => ({
        ...d,
        primary: d.id === id,
      })),
    )
  }

  // Handle verify DNS
  const handleVerifyDNS = () => {
    if (!activeDomain) return

    setIsVerifying(true)
    // Simulate API call
    setTimeout(() => {
      setDomains(
        domains.map((d) => {
          if (d.id === activeDomain.id) {
            return {
              ...d,
              status: Math.random() > 0.3 ? "active" : "pending",
              ssl: Math.random() > 0.3 ? "active" : "pending",
              dnsRecords: d.dnsRecords.map((record) => ({
                ...record,
                status: Math.random() > 0.3 ? "verified" : "pending",
              })),
            }
          }
          return d
        }),
      )
      setIsVerifying(false)
    }, 2000)
  }

  // Handle refresh DNS
  const handleRefreshDNS = () => {
    if (!activeDomain) return

    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setDomains(
        domains.map((d) => {
          if (d.id === activeDomain.id) {
            return {
              ...d,
              lastChecked: new Date().toISOString(),
            }
          }
          return d
        }),
      )
      setIsRefreshing(false)
    }, 1500)
  }

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Domain Management</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage domains for <span className="font-medium">{project.name}</span>
                </p>
              </div>
              <Button onClick={() => router.push(`/preview/${projectId}`)} variant="outline" className="sm:self-end">
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview Project
              </Button>
            </div>
          </div>

          {/* Domain Management Interface */}
          <div className="space-y-6">
            {/* Domain List and Add Domain */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Custom Domains</CardTitle>
                  <CardDescription>Connect your own domains to your website</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Domain
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Custom Domain</DialogTitle>
                      <DialogDescription>Connect your own domain to your website.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="domain" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Domain Name
                        </label>
                        <Input
                          id="domain"
                          placeholder="example.com"
                          value={newDomain}
                          onChange={(e) => setNewDomain(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Enter the root domain without www or http://
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleAddDomain}
                        disabled={isAddingDomain || !newDomain}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        {isAddingDomain ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Domain"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {domains.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Globe className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                    <p className="text-lg font-medium">No domains added yet</p>
                    <p className="text-sm mt-1">Add your first custom domain to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {domains.map((domain) => (
                      <motion.div
                        key={domain.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDomain === domain.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700"
                        }`}
                        onClick={() => setSelectedDomain(domain.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white flex items-center">
                                {domain.domain}
                                {domain.primary && (
                                  <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">Primary</Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Added {formatDate(domain.added)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DomainStatus status={domain.status} />
                            <SSLStatus status={domain.ssl} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Default Domain */}
            <Card>
              <CardHeader>
                <CardTitle>Default Domain</CardTitle>
                <CardDescription>Your project is always accessible via the default domain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{projectId}.webcanister.app</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">System-generated domain</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Check className="w-3 h-3 mr-1" /> Active
                    </Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Shield className="w-3 h-3 mr-1" /> SSL
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Domain Details */}
            {activeDomain && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {activeDomain.domain}
                        {activeDomain.primary && <Badge className="ml-2 bg-blue-500">Primary</Badge>}
                      </CardTitle>
                      <CardDescription>
                        Last checked: {formatDate(activeDomain.lastChecked)}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6 px-2"
                          onClick={handleRefreshDNS}
                          disabled={isRefreshing}
                        >
                          {isRefreshing ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <RefreshCw className="h-3 w-3" />
                          )}
                        </Button>
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {activeDomain.status === "active" && !activeDomain.primary && (
                        <Button variant="outline" size="sm" onClick={() => handleSetPrimaryDomain(activeDomain.id)}>
                          Set as Primary
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-500">
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Domain</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {activeDomain.domain}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveDomain(activeDomain.id)}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Remove Domain
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="dns">DNS Configuration</TabsTrigger>
                        <TabsTrigger value="ssl">SSL Certificate</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview">
                        <div className="space-y-6">
                          {/* Status Overview */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Domain Status
                              </div>
                              <div className="flex items-center space-x-2">
                                <DomainStatus status={activeDomain.status} />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {activeDomain.status === "active"
                                    ? "Domain is properly configured"
                                    : activeDomain.status === "pending"
                                      ? "Waiting for DNS propagation"
                                      : "Configuration error"}
                                </span>
                              </div>
                              {activeDomain.error && (
                                <Alert variant="destructive" className="mt-3">
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertTitle>Error</AlertTitle>
                                  <AlertDescription>{activeDomain.error}</AlertDescription>
                                </Alert>
                              )}
                            </div>

                            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                SSL Certificate
                              </div>
                              <div className="flex items-center space-x-2">
                                <SSLStatus status={activeDomain.ssl} />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {activeDomain.ssl === "active"
                                    ? "SSL certificate is active"
                                    : activeDomain.ssl === "pending"
                                      ? "SSL certificate is being provisioned"
                                      : "SSL certificate error"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex flex-wrap gap-3">
                            <Button
                              onClick={handleVerifyDNS}
                              disabled={isVerifying}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              {isVerifying ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Verify Configuration
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => window.open(`https://${activeDomain.domain}`, "_blank")}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit Website
                            </Button>
                          </div>

                          {/* Next Steps */}
                          {activeDomain.status !== "active" && (
                            <Alert>
                              <Info className="h-4 w-4" />
                              <AlertTitle>Next Steps</AlertTitle>
                              <AlertDescription>
                                <p className="mb-2">
                                  To activate your domain, please configure the DNS records as shown in the DNS
                                  Configuration tab.
                                </p>
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500"
                                  onClick={() => setActiveTab("dns")}
                                >
                                  View DNS Configuration
                                </Button>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="dns">
                        <div className="space-y-6">
                          <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              DNS Configuration Instructions
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              To connect your domain to WebCanister, add the following DNS records at your domain
                              registrar or DNS provider.
                            </p>

                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="bg-gray-100 dark:bg-zinc-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                      Record Type
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                      Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                      Value
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                      Status
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                      Copy
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {activeDomain.dnsRecords.map((record, index) => (
                                    <tr
                                      key={`${record.type}-${record.name}`}
                                      className={`border-t border-gray-200 dark:border-gray-700 ${
                                        index % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-gray-50 dark:bg-zinc-800"
                                      }`}
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{record.type}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{record.name}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-mono">
                                        {record.value}
                                      </td>
                                      <td className="px-4 py-3 text-sm">
                                        <DNSRecordStatus status={record.status} />
                                      </td>
                                      <td className="px-4 py-3 text-sm">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() =>
                                                  copyToClipboard(record.value, `${record.type}-${record.name}`)
                                                }
                                              >
                                                {copied === `${record.type}-${record.name}` ? (
                                                  <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                  <Copy className="h-4 w-4" />
                                                )}
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                {copied === `${record.type}-${record.name}`
                                                  ? "Copied!"
                                                  : "Copy to clipboard"}
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verification Status</h3>
                            <div className="flex items-center space-x-2">
                              <Button
                                onClick={handleVerifyDNS}
                                disabled={isVerifying}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                {isVerifying ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Verify DNS Configuration
                                  </>
                                )}
                              </Button>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Last checked: {formatDate(activeDomain.lastChecked)}
                              </p>
                            </div>
                          </div>

                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>DNS Propagation</AlertTitle>
                            <AlertDescription>
                              DNS changes can take up to 48 hours to propagate worldwide, though they often complete
                              within a few hours. Check back later if your records are not verifying immediately.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </TabsContent>

                      <TabsContent value="ssl">
                        <div className="space-y-6">
                          <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              SSL Certificate Status
                            </h3>
                            <div className="flex items-center space-x-2 mb-4">
                              <SSLStatus status={activeDomain.ssl} />
                              <span className="text-gray-700 dark:text-gray-300">
                                {activeDomain.ssl === "active"
                                  ? "SSL certificate is active and valid"
                                  : activeDomain.ssl === "pending"
                                    ? "SSL certificate is being provisioned"
                                    : "SSL certificate could not be issued"}
                              </span>
                            </div>

                            {activeDomain.ssl === "active" && (
                              <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-700">
                                  <div className="text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Issued to:</span>{" "}
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {activeDomain.domain}, *.{activeDomain.domain}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-700">
                                  <div className="text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Issued by:</span>{" "}
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      Let's Encrypt Authority
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-700">
                                  <div className="text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Valid until:</span>{" "}
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {new Date(
                                        new Date(activeDomain.lastChecked).getTime() + 90 * 24 * 60 * 60 * 1000,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <Badge className="bg-green-500 mt-2 sm:mt-0">Auto-renews</Badge>
                                </div>
                              </div>
                            )}

                            {activeDomain.ssl === "pending" && (
                              <Alert>
                                <Clock className="h-4 w-4" />
                                <AlertTitle>Certificate Provisioning</AlertTitle>
                                <AlertDescription>
                                  We're provisioning an SSL certificate for your domain. This process usually takes 5-15
                                  minutes after your DNS records are properly configured.
                                </AlertDescription>
                              </Alert>
                            )}

                            {activeDomain.ssl === "error" && (
                              <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Certificate Error</AlertTitle>
                                <AlertDescription>
                                  We couldn't issue an SSL certificate for your domain. Please make sure your DNS
                                  records are properly configured and verify them again.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">SSL Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="font-medium text-gray-900 dark:text-white mb-1">Automatic HTTPS</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  All traffic is automatically redirected from HTTP to HTTPS for enhanced security.
                                </p>
                              </div>
                              <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="font-medium text-gray-900 dark:text-white mb-1">Auto-renewal</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  SSL certificates are automatically renewed before they expire.
                                </p>
                              </div>
                            </div>
                          </div>

                          {activeDomain.ssl !== "active" && (
                            <Alert>
                              <Info className="h-4 w-4" />
                              <AlertTitle>SSL Requirements</AlertTitle>
                              <AlertDescription>
                                <p className="mb-2">
                                  To issue an SSL certificate, your domain must be properly configured with the correct
                                  DNS records and be accessible over the internet.
                                </p>
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500"
                                  onClick={() => setActiveTab("dns")}
                                >
                                  View DNS Configuration
                                </Button>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
