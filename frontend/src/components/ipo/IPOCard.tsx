import Link from 'next/link'
import type { IPOListItem } from '@/types/ipo'
import IPOStatusBadge from './IPOStatusBadge'
import { formatDate } from '@/lib/utils'

interface IPOCardProps {
  ipo: IPOListItem
}

export default function IPOCard({ ipo }: IPOCardProps) {
  const priceBand =
    ipo.price_band_min && ipo.price_band_max
      ? `₹${ipo.price_band_min} – ₹${ipo.price_band_max}`
      : '—'

  return (
    <Link
      href={`/ipo/${ipo.slug}`}
      className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-blue hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-brand-navy text-base leading-tight pr-2">
          {ipo.company_name}
        </h3>
        <IPOStatusBadge status={ipo.status} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-slate-400 text-xs">Price Band</p>
          <p className="font-medium text-slate-700">{priceBand}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Type</p>
          <p className="font-medium text-slate-700 capitalize">{ipo.ipo_type}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Open Date</p>
          <p className="font-medium text-slate-700">{formatDate(ipo.open_date)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Close Date</p>
          <p className="font-medium text-slate-700">{formatDate(ipo.close_date)}</p>
        </div>
      </div>
    </Link>
  )
}
