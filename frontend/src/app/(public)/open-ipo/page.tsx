import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Open IPOs',
  description: 'Currently open Indian IPOs accepting investor subscription bids.',
}

export default function OpenIPOPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-8 h-8 text-positive" />
          Currently Open IPOs
        </h1>
        <p className="text-slate-500">
          IPOs currently open for bidding across retail, HNI/NII, and QIB categories.
        </p>
      </div>
      <EmptyState
        title="No open IPOs at this time"
        description="Check upcoming IPOs to see when future subscription windows open."
      />
    </div>
  )
}
