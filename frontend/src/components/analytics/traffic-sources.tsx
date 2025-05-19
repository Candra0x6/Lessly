interface TrafficSourcesProps {
  data: any[]
}

export function TrafficSources({ data }: TrafficSourcesProps) {
  const sources = [
    { name: "Direct", value: 35, color: "bg-blue-500" },
    { name: "Organic Search", value: 25, color: "bg-purple-500" },
    { name: "Social Media", value: 20, color: "bg-pink-500" },
    { name: "Referral", value: 15, color: "bg-yellow-500" },
    { name: "Email", value: 5, color: "bg-green-500" },
  ]

  return (
    <div className="space-y-4">
      {sources.map((source) => (
        <div key={source.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{source.name}</span>
            <span className="text-sm font-medium">{source.value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-2 rounded-full ${source.color}`} style={{ width: `${source.value}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}
