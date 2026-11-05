import type { GMPHistoryRecord } from '@/types/gmp'
import { cn } from '@/lib/utils'

interface GMPTableProps {
  records: GMPHistoryRecord[]
}

export default function GMPTable({ records }: GMPTableProps) {
  if (records.length === 0) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left px-4 py-3 font-semibold text-slate-600">GMP (₹)</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">GMP %</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Source</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Observed At (IST)</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((rec) => {
            const gmp = Number(rec.gmp_amount)
            const isPositive = gmp > 0
            return (
              <tr key={rec.id} className="hover:bg-slate-50">
                <td
                  className={cn(
                    'px-4 py-3 font-semibold',
                    isPositive ? 'text-positive' : 'text-negative',
                  )}
                >
                  {isPositive ? '+' : ''}₹{gmp}
                </td>
                <td
                  className={cn(
                    'px-4 py-3',
                    isPositive ? 'text-positive' : 'text-negative',
                  )}
                >
                  {rec.gmp_percentage
                    ? `${isPositive ? '+' : ''}${Number(rec.gmp_percentage).toFixed(2)}%`
                    : '—'}
                </td>
                <td className="px-4 py-3 text-slate-600">{rec.source_name}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">
                  {new Date(rec.observation_timestamp).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                  })}
                </td>
                <td className="px-4 py-3">
                  {rec.is_stale ? (
                    <span className="text-amber-600 text-xs font-medium">Stale</span>
                  ) : rec.is_outlier ? (
                    <span className="text-red-500 text-xs font-medium">Outlier</span>
                  ) : (
                    <span className="text-positive text-xs font-medium">Active</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
