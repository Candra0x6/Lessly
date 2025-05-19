import { DataTable } from "./data-table"
import { Badge } from "@/components/ui/badge"

interface PagePerformanceProps {
  data: any[]
}

export function PagePerformance({ data }: PagePerformanceProps) {
  const columns = [
    {
      key: "page",
      label: "Page",
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: "loadTime",
      label: "Load Time",
      render: (value: number) => <div className="font-medium">{value.toFixed(2)}s</div>,
    },
    {
      key: "performance",
      label: "Performance",
      render: (value: string) => {
        const color =
          value === "Excellent"
            ? "bg-green-500"
            : value === "Good"
              ? "bg-blue-500"
              : value === "Average"
                ? "bg-yellow-500"
                : "bg-red-500"

        return <Badge className={color}>{value}</Badge>
      },
    },
    {
      key: "size",
      label: "Page Size",
      render: (value: number) => <div>{(value / 1024).toFixed(2)} KB</div>,
    },
    {
      key: "requests",
      label: "Requests",
      render: (value: number) => <div>{value}</div>,
    },
  ]

  const mockData = [
    { page: "/", loadTime: 1.2, performance: "Excellent", size: 245760, requests: 12 },
    { page: "/about", loadTime: 1.8, performance: "Good", size: 389120, requests: 18 },
    { page: "/products", loadTime: 2.5, performance: "Average", size: 512000, requests: 24 },
    { page: "/blog", loadTime: 3.2, performance: "Poor", size: 768000, requests: 32 },
    { page: "/contact", loadTime: 1.5, performance: "Good", size: 307200, requests: 15 },
  ]

  return <DataTable data={mockData} columns={columns} />
}
