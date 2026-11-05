import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Upcoming IPOs',
  description: 'Track upcoming Indian mainboard and SME initial public offerings.',
}

export default function UpcomingIPOPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-brand-blue" />
          Upcoming IPOs
        </h1>
        <p className="text-slate-500">
          Scheduled initial public offerings awaiting open subscription dates.
        </p>
      </div>
      <EmptyState
        title="No upcoming IPOs listed yet"
        description="Official dates and price bands will be populated once filing dates are verified."
      />
    </div>
  )
}
