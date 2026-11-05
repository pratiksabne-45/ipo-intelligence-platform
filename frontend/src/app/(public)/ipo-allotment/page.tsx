import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { FileCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IPO Allotment Status',
  description: 'Check Indian IPO share allotment status online across Link Intime, KFintech, and Bigshare.',
}

export default function IPOAllotmentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <FileCheck className="w-8 h-8 text-brand-blue" />
          IPO Allotment Status
        </h1>
        <p className="text-slate-500">
          Verify share allotment allocations by PAN, Application Number, or DP ID.
        </p>
      </div>
      <EmptyState
        title="Allotment lookup coming soon"
        description="Direct registrar integration and status checkers will be active in Milestone 2."
      />
    </div>
  )
}
