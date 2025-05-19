interface GeographicDataProps {
  data: any[]
}

export function GeographicData({ data }: GeographicDataProps) {
  const countries = [
    { name: "United States", value: 35, flag: "🇺🇸" },
    { name: "United Kingdom", value: 15, flag: "🇬🇧" },
    { name: "Germany", value: 12, flag: "🇩🇪" },
    { name: "France", value: 8, flag: "🇫🇷" },
    { name: "Canada", value: 7, flag: "🇨🇦" },
  ]

  return (
    <div className="space-y-3">
      {countries.map((country) => (
        <div key={country.name} className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-lg">{country.flag}</span>
            <span className="text-sm font-medium">{country.name}</span>
          </div>
          <span className="text-sm font-medium">{country.value}%</span>
        </div>
      ))}
    </div>
  )
}
