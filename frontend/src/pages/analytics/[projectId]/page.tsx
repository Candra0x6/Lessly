import { ArrowDown, Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AreaChart, BarChart, DonutChart, GeoMap, LineChart } from "@/components/analytics/charts"
import { DateRangePicker } from "@/components/analytics/date-range-picker"
import { AnalyticsSummary } from "@/components/analytics/analytics-summary"
import { DeviceBreakdown } from "@/components/analytics/device-breakdown"
import { PagePerformance } from "@/components/analytics/page-performance"
import { TrafficSources } from "@/components/analytics/traffic-sources"
import { GeographicData } from "@/components/analytics/geographic-data"
import { TopPages } from "@/components/analytics/top-pages"
import { mockAnalyticsData } from "@/lib/mock-analytics-data"

export default function AnalyticsDashboard({ params }: { params: { projectId: string } }) {
  const { projectId } = params
  const data = mockAnalyticsData

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Insights and performance metrics for your website</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <AnalyticsSummary data={data.summary} />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Visitor count and trends over time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <AreaChart data={data.trafficOverview} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitors by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <DeviceBreakdown data={data.deviceBreakdown} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <TrafficSources data={data.trafficSources} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your site</CardDescription>
              </CardHeader>
              <CardContent>
                <TopPages data={data.topPages} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Geographic Data</CardTitle>
                <CardDescription>Visitor locations worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <GeographicData data={data.geographicData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Page Load Times</CardTitle>
                <CardDescription>Average load times across your site</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={data.pageLoadTimes} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>Bandwidth and resource consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={data.resourceUsage} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
              <CardDescription>Loading times and resource usage by page</CardDescription>
            </CardHeader>
            <CardContent>
              <PagePerformance data={data.pagePerformance} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Visitors by country and region</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GeoMap data={data.geographicDistribution} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device & Browser</CardTitle>
                <CardDescription>Breakdown by technology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Devices</h4>
                    <DonutChart data={data.deviceBreakdown} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Browsers</h4>
                    <DonutChart data={data.browserBreakdown} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Visitor Demographics</CardTitle>
              <CardDescription>Age, gender, and interests (if available)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-3">Age Groups</h4>
                  <BarChart data={data.ageGroups} horizontal />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Gender</h4>
                  <DonutChart data={data.genderBreakdown} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Interests</h4>
                  <BarChart data={data.interests} horizontal />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Flow</CardTitle>
                <CardDescription>How visitors navigate through your site</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center p-6 border border-dashed rounded-lg w-full">
                  <p className="text-muted-foreground">User flow visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
                <CardDescription>Time on site and pages per session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Avg. Time on Site</h4>
                      <span className="text-2xl font-bold">3:24</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground flex justify-between">
                      <span>0:00</span>
                      <span>10:00</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Pages per Session</h4>
                      <span className="text-2xl font-bold">2.8</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground flex justify-between">
                      <span>0</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Visitor progression through key steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pt-8">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Visit", value: 10000, percent: "100%" },
                    { label: "Sign Up", value: 2500, percent: "25%" },
                    { label: "Create Project", value: 1200, percent: "12%" },
                    { label: "Publish", value: 800, percent: "8%" },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="h-40 w-full bg-blue-100 dark:bg-blue-950/30 rounded-lg relative overflow-hidden">
                        <div
                          className="absolute bottom-0 w-full bg-blue-500 dark:bg-blue-600 transition-all duration-500"
                          style={{ height: step.percent }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <span className="font-bold text-lg">{step.value.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">{step.percent}</span>
                        </div>
                      </div>
                      <span className="mt-2 text-sm font-medium">{step.label}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-0 left-0 right-0 flex justify-between">
                  {[
                    { label: "Visit → Sign Up", value: "-75%" },
                    { label: "Sign Up → Create", value: "-52%" },
                    { label: "Create → Publish", value: "-33%" },
                  ].map((drop, i) => (
                    <div
                      key={i}
                      className="flex items-center text-red-500 text-xs"
                      style={{ marginLeft: `${i * 33 + 12}%` }}
                    >
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span>{drop.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
