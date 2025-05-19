// This is a simplified implementation of charts
// In a real application, you would use a library like Recharts, Chart.js, or D3.js

export function AreaChart({ data }: { data: any }) {
  return (
    <div className="w-full h-[300px] relative">
      {/* Simplified area chart visualization */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/5 rounded-md"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>

      {/* Sample data points */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M0,100 L0,80 C10,75 20,40 30,45 C40,50 50,20 60,25 C70,30 80,10 90,15 L100,20 L100,100 Z"
          fill="url(#blue-gradient)"
          stroke="rgb(59, 130, 246)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* X-axis labels */}
      <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-xs text-gray-500">
        <span>May 1</span>
        <span>May 8</span>
        <span>May 15</span>
        <span>May 22</span>
        <span>May 29</span>
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-[-30px] top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
        <span>5K</span>
        <span>4K</span>
        <span>3K</span>
        <span>2K</span>
        <span>1K</span>
        <span>0</span>
      </div>
    </div>
  )
}

export function LineChart({ data }: { data: any }) {
  return (
    <div className="w-full h-[250px] relative">
      {/* Simplified line chart visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>

      {/* Sample data points */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M0,80 C10,75 20,40 30,45 C40,50 50,20 60,25 C70,30 80,10 90,15 L100,20"
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
        />
      </svg>

      {/* X-axis labels */}
      <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-xs text-gray-500">
        <span>Home</span>
        <span>About</span>
        <span>Products</span>
        <span>Blog</span>
        <span>Contact</span>
      </div>
    </div>
  )
}

export function BarChart({ data, horizontal = false }: { data: any; horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className="w-full h-[200px] flex items-end space-x-2">
        {[65, 40, 85, 30, 55].map((value, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div className="h-6 bg-blue-500 rounded" style={{ width: `${value}%` }}></div>
            <span className="ml-2 text-xs">
              {i === 0 ? "18-24" : i === 1 ? "25-34" : i === 2 ? "35-44" : i === 3 ? "45-54" : "55+"}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-[200px] flex items-end space-x-2">
      {[65, 40, 85, 30, 55].map((value, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div className="w-full bg-blue-500 rounded-t" style={{ height: `${value}%` }}></div>
          <span className="mt-2 text-xs">
            {i === 0 ? "Mon" : i === 1 ? "Tue" : i === 2 ? "Wed" : i === 3 ? "Thu" : "Fri"}
          </span>
        </div>
      ))}
    </div>
  )
}

export function DonutChart({ data }: { data: any }) {
  // Sample data
  const segments = [
    { color: "rgb(59, 130, 246)", percent: 45 }, // Blue
    { color: "rgb(99, 102, 241)", percent: 30 }, // Indigo
    { color: "rgb(139, 92, 246)", percent: 25 }, // Purple
  ]

  // Calculate stroke-dasharray and stroke-dashoffset
  const radius = 40
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex justify-center items-center h-[150px]">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {segments.map((segment, i) => {
            const dashArray = (segment.percent / 100) * circumference
            const dashOffset = offset
            offset += dashArray

            return (
              <circle
                key={i}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="15"
                strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                strokeDashoffset={-dashOffset}
                transform="rotate(-90 60 60)"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold">45%</div>
            <div className="text-xs text-gray-500">Desktop</div>
          </div>
        </div>
      </div>

      <div className="ml-4 space-y-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-xs">Desktop (45%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
          <span className="text-xs">Mobile (30%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
          <span className="text-xs">Tablet (25%)</span>
        </div>
      </div>
    </div>
  )
}

export function GeoMap({ data }: { data: any }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-6 border border-dashed rounded-lg">
        <p className="text-muted-foreground">Geographic map visualization</p>
        <p className="text-xs text-muted-foreground mt-2">
          (In a real implementation, this would be an interactive world map showing visitor distribution)
        </p>
      </div>
    </div>
  )
}
