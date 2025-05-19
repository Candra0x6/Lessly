interface TopPagesProps {
  data: any[]
}

export function TopPages({ data }: TopPagesProps) {
  const pages = [
    { path: "/", views: 12543, percent: 35 },
    { path: "/products", views: 5432, percent: 15 },
    { path: "/about", views: 3210, percent: 9 },
    { path: "/blog", views: 2876, percent: 8 },
    { path: "/contact", views: 1543, percent: 4 },
  ]

  return (
    <div className="space-y-3">
      {pages.map((page) => (
        <div key={page.path} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium truncate max-w-[150px]">{page.path}</span>
            <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${page.percent}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}
