interface StatCardProps {
  label: string
  value: string
  subtext?: string
}

function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-brand-navy">{value}</p>
      {subtext && <p className="text-slate-400 text-xs mt-1">{subtext}</p>}
    </div>
  )
}

interface IPOStatsProps {
  stats: { label: string; value: string; subtext?: string }[]
}

export default function IPOStats({ stats }: IPOStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
