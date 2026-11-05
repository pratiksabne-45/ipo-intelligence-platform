import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { Archive } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Closed IPOs',
  description: 'Recently closed Indian initial public offerings awaiting listing or allotment.',
}

export default function ClosedIPOPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <Archive className="w-8 h-8 text-slate-500" />
          Closed IPOs
        </h1>
        <p className="text-slate-500">
          IPOs whose bidding windows have concluded. Track allotment basis and listing performance.
        </p>
      </div>
      <EmptyState
        title="No closed IPO records yet"
        description="Historical issues will populate as they complete their bidding period."
      />
    </div>
  )
}
