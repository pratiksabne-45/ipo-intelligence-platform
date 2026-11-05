import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learn About IPOs',
  description: 'Comprehensive guides to Indian primary markets, Grey Market Premium, ASBA bidding, and allotment.',
}

export default function LearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-brand-blue" />
          IPO Education & Knowledge Base
        </h1>
        <p className="text-slate-500">
          Educational resources, glossary terms, and step-by-step guides for primary market investors.
        </p>
      </div>
      <EmptyState
        title="Knowledge base articles coming soon"
        description="Comprehensive guides covering DRHP analysis, anchor investors, and GMP interpretation are underway."
      />
    </div>
  )
}
