import { Laptop, Smartphone, Tablet } from "lucide-react"

interface DeviceBreakdownProps {
  data: {
    desktop: number
    mobile: number
    tablet: number
  }
}

export function DeviceBreakdown({ data }: DeviceBreakdownProps) {
  const devices = [
    {
      name: "Desktop",
      value: 45,
      icon: Laptop,
      color: "bg-blue-500",
    },
    {
      name: "Mobile",
      value: 40,
      icon: Smartphone,
      color: "bg-purple-500",
    },
    {
      name: "Tablet",
      value: 15,
      icon: Tablet,
      color: "bg-pink-500",
    },
  ]

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <div key={device.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <device.icon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">{device.name}</span>
            </div>
            <span className="text-sm font-medium">{device.value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-2 rounded-full ${device.color}`} style={{ width: `${device.value}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}
