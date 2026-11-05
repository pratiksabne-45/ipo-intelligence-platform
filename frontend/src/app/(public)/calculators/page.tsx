import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IPO Calculators',
  description: 'Calculate IPO investment sizing, expected listing gains, and bidding lot multiples.',
}

export default function CalculatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <Calculator className="w-8 h-8 text-brand-blue" />
          IPO Financial Calculators
        </h1>
        <p className="text-slate-500">
          Tools for estimating allotment probabilities, capital requirements, and return on investment.
        </p>
      </div>
      <EmptyState
        title="Interactive calculators in preparation"
        description="Calculators for GMP expected gain, HNI funding interest, and lot multipliers are being finalized."
      />
    </div>
  )
}
