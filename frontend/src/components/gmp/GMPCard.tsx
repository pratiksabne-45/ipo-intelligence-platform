import { cn } from '@/lib/utils'
import type { GMPSummary } from '@/types/gmp'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

interface GMPCardProps {
  summary: GMPSummary
}

export default function GMPCard({ summary }: GMPCardProps) {
  const gmp = summary.latest_gmp ? Number(summary.latest_gmp) : null
  const pct = summary.gmp_percentage ? Number(summary.gmp_percentage) : null
  const isPositive = gmp != null && gmp > 0
  const isNegative = gmp != null && gmp < 0

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="font-semibold text-brand-navy mb-1">{summary.company_name}</h3>
      <div className="flex items-center gap-2 mt-2">
        {gmp != null ? (
          <>
            <span
              className={cn(
                'text-2xl font-bold',
                isPositive ? 'text-positive' : isNegative ? 'text-negative' : 'text-slate-700',
              )}
            >
              {isPositive ? '+' : ''}₹{gmp}
            </span>
            {pct != null && (
              <span
                className={cn(
                  'text-sm font-medium flex items-center gap-1',
                  isPositive ? 'text-positive' : 'text-negative',
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {isPositive ? '+' : ''}
                {pct.toFixed(2)}%
              </span>
            )}
          </>
        ) : (
          <span className="text-slate-400 text-sm">GMP data not available</span>
        )}
      </div>
      <p className="text-slate-400 text-xs mt-3 flex items-start gap-1">
        <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
        Unofficial estimate — not a guaranteed listing price.
      </p>
    </div>
  )
}
