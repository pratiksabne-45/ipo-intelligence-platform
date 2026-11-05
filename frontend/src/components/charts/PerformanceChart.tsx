'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface PerformanceDataPoint {
  name: string
  value: number
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[]
  title?: string
  valueFormatter?: (value: number) => string
}

export default function PerformanceChart({
  data,
  title = 'Performance',
  valueFormatter = (v) => `${v}%`,
}: PerformanceChartProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      {title && <h3 className="font-semibold text-brand-navy mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={valueFormatter} />
          <Tooltip formatter={(value: number) => [valueFormatter(value), 'Value']} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value >= 0 ? '#16A34A' : '#DC2626'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
