'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { GMPHistoryRecord } from '@/types/gmp'

interface GMPHistoryChartProps {
  records: GMPHistoryRecord[]
}

export default function GMPHistoryChart({ records }: GMPHistoryChartProps) {
  const data = records
    .slice()
    .reverse()
    .map((rec) => ({
      date: new Date(rec.observation_timestamp).toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
      }),
      gmp: Number(rec.gmp_amount),
    }))

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="font-semibold text-brand-navy mb-4">GMP History</h3>
      <p className="text-xs text-slate-400 mb-4">
        Each point is an individual observation. Historical data is preserved and never overwritten.
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `₹${v}`} />
          <Tooltip
            formatter={(value: number) => [`₹${value}`, 'GMP']}
            labelStyle={{ color: '#1e293b' }}
          />
          <Line
            type="monotone"
            dataKey="gmp"
            stroke="#1D4ED8"
            strokeWidth={2}
            dot={{ r: 3, fill: '#1D4ED8' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
