import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { GMP_DISCLAIMER } from '@/lib/constants'
import { TrendingUp, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IPO GMP Today',
  description: 'Live Grey Market Premium (GMP) updates for all active Indian IPOs.',
}

export default function IPOGMPTodayPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-brand-blue" />
          IPO GMP Today
        </h1>
        <p className="text-slate-500">
          Daily Grey Market Premium (GMP) price observations, estimated listing calculations, and market trends.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start gap-2.5 text-amber-800 text-sm mb-8">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{GMP_DISCLAIMER}</span>
      </div>

      <EmptyState
        title="No GMP observations reported yet"
        description="GMP observations from verified market sources will be published here once data collection begins."
      />
    </div>
  )
}
