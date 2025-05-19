import { ArrowDown, ArrowUp, Users, Clock, MousePointer, Globe } from "lucide-react"

interface AnalyticsSummaryProps {
  data: {
    visitors: {
      value: number
      change: number
    }
    sessions: {
      value: number
      change: number
    }
    pageviews: {
      value: number
      change: number
    }
    avgTime: {
      value: string
      change: number
    }
  }
}

export function AnalyticsSummary({ data }: AnalyticsSummaryProps) {
  const metrics = [
    {
      title: "Total Visitors",
      value: "12,543",
      change: "+12.3%",
      icon: Users,
      positive: true,
    },
    {
      title: "Total Sessions",
      value: "18,219",
      change: "+8.7%",
      icon: MousePointer,
      positive: true,
    },
    {
      title: "Page Views",
      value: "45,662",
      change: "+23.5%",
      icon: Globe,
      positive: true,
    },
    {
      title: "Avg. Session Duration",
      value: "3m 24s",
      change: "-2.1%",
      icon: Clock,
      positive: false,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center justify-between">
            <metric.icon className="h-4 w-4 text-muted-foreground" />
            <div className={`flex items-center text-xs ${metric.positive ? "text-green-500" : "text-red-500"}`}>
              {metric.positive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              <span>{metric.change}</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
