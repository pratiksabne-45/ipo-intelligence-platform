import { siteConfig } from '@/config/site'
import EmptyState from '@/components/common/EmptyState'
import { GMP_DISCLAIMER } from '@/lib/constants'
import Link from 'next/link'
import { TrendingUp, Calendar, BookOpen, Calculator, AlertCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            {siteConfig.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ipo-gmp-today"
              className="bg-brand-blue hover:bg-brand-blue-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View IPO GMP Today
            </Link>
            <Link
              href="/upcoming-ipo"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-white/20"
            >
              Upcoming IPOs
            </Link>
          </div>
        </div>
      </section>

      {/* GMP Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-start gap-2 text-amber-800 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{GMP_DISCLAIMER}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* Latest GMP */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-brand-blue" />
              Latest IPO GMP Today
            </h2>
            <Link href="/ipo-gmp-today" className="text-brand-blue hover:underline text-sm font-medium">
              View All →
            </Link>
          </div>
          <EmptyState
            title="No GMP data available yet"
            description="Grey Market Premium data will appear here once our data collection system is connected to verified sources."
          />
        </section>

        {/* Open IPOs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
              <Calendar className="w-6 h-6 text-positive" />
              Open IPOs
            </h2>
            <Link href="/open-ipo" className="text-brand-blue hover:underline text-sm font-medium">
              View All →
            </Link>
          </div>
          <EmptyState
            title="No open IPOs at this time"
            description="Currently open IPOs will be listed here with subscription data and GMP information."
          />
        </section>

        {/* Upcoming IPOs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
              <Calendar className="w-6 h-6 text-brand-blue" />
              Upcoming IPOs
            </h2>
            <Link href="/upcoming-ipo" className="text-brand-blue hover:underline text-sm font-medium">
              View All →
            </Link>
          </div>
          <EmptyState
            title="No upcoming IPOs listed yet"
            description="Upcoming IPO announcements will appear here as they are confirmed."
          />
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/learn" className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-blue hover:shadow-md transition-all group">
              <BookOpen className="w-8 h-8 text-brand-blue mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-brand-navy mb-1">Learn About IPOs</h3>
              <p className="text-sm text-slate-500">Understand how IPOs work, GMP, allotment and more.</p>
            </Link>
            <Link href="/calculators" className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-blue hover:shadow-md transition-all group">
              <Calculator className="w-8 h-8 text-brand-blue mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-brand-navy mb-1">IPO Calculators</h3>
              <p className="text-sm text-slate-500">Calculate estimated returns, subscription cost and lot requirements.</p>
            </Link>
            <Link href="/ipo-allotment" className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-blue hover:shadow-md transition-all group">
              <TrendingUp className="w-8 h-8 text-brand-blue mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-brand-navy mb-1">IPO Allotment</h3>
              <p className="text-sm text-slate-500">Check your IPO allotment status directly.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
