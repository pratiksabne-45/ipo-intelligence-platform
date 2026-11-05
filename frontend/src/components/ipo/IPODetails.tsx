import type { IPODetail } from '@/types/ipo'
import IPOStatusBadge from './IPOStatusBadge'
import { formatDate, formatCrores } from '@/lib/utils'

interface IPODetailsProps {
  ipo: IPODetail
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="font-medium text-slate-800 text-sm text-right">{value ?? '—'}</span>
    </div>
  )
}

export default function IPODetails({ ipo }: IPODetailsProps) {
  const priceBand =
    ipo.price_band_min && ipo.price_band_max
      ? `₹${ipo.price_band_min} – ₹${ipo.price_band_max}`
      : null

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">{ipo.company_name}</h1>
          <p className="text-slate-500 text-sm mt-1 capitalize">{ipo.ipo_type} IPO</p>
        </div>
        <IPOStatusBadge status={ipo.status} />
      </div>

      <div className="divide-y divide-slate-100">
        <DetailRow label="Price Band" value={priceBand} />
        <DetailRow label="Lot Size" value={ipo.lot_size ? `${ipo.lot_size} shares` : null} />
        <DetailRow
          label="Issue Size"
          value={ipo.issue_size_cr ? formatCrores(Number(ipo.issue_size_cr)) : null}
        />
        <DetailRow label="Open Date" value={formatDate(ipo.open_date)} />
        <DetailRow label="Close Date" value={formatDate(ipo.close_date)} />
        <DetailRow label="Allotment Date" value={formatDate(ipo.allotment_date)} />
        <DetailRow label="Listing Date" value={formatDate(ipo.listing_date)} />
        <DetailRow label="Exchange" value={ipo.exchange} />
        <DetailRow label="Registrar" value={ipo.registrar} />
      </div>
    </div>
  )
}
