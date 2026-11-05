import { GMP_DISCLAIMER } from '@/lib/constants'
import { AlertCircle } from 'lucide-react'

interface GMPSummaryProps {
  gmpAmount: number | null
  gmpPercentage: number | null
  estimatedListingPrice: number | null
  sourceCount: number
}

export default function GMPSummary({
  gmpAmount,
  gmpPercentage,
  estimatedListingPrice,
  sourceCount,
}: GMPSummaryProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
      <h3 className="font-semibold text-brand-navy mb-3">GMP Summary</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Current GMP</p>
          <p className="text-xl font-bold text-brand-navy">
            {gmpAmount != null ? `₹${gmpAmount}` : '—'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">GMP %</p>
          <p className="text-xl font-bold text-brand-navy">
            {gmpPercentage != null ? `${gmpPercentage.toFixed(2)}%` : '—'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Est. Listing*</p>
          <p className="text-xl font-bold text-brand-navy">
            {estimatedListingPrice != null ? `₹${estimatedListingPrice}` : '—'}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
        <span>{GMP_DISCLAIMER}</span>
      </div>
    </div>
  )
}
