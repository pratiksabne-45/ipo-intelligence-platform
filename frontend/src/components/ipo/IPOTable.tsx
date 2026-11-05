import Link from 'next/link'
import type { IPOListItem } from '@/types/ipo'
import IPOStatusBadge from './IPOStatusBadge'
import { formatDate } from '@/lib/utils'

interface IPOTableProps {
  ipos: IPOListItem[]
}

export default function IPOTable({ ipos }: IPOTableProps) {
  if (ipos.length === 0) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Company</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Type</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Price Band</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Open</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Close</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {ipos.map((ipo) => (
            <tr key={ipo.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3">
                <Link
                  href={`/ipo/${ipo.slug}`}
                  className="font-medium text-brand-navy hover:text-brand-blue transition-colors"
                >
                  {ipo.company_name}
                </Link>
              </td>
              <td className="px-4 py-3 capitalize text-slate-600">{ipo.ipo_type}</td>
              <td className="px-4 py-3 text-slate-600">
                {ipo.price_band_min && ipo.price_band_max
                  ? `₹${ipo.price_band_min}–₹${ipo.price_band_max}`
                  : '—'}
              </td>
              <td className="px-4 py-3 text-slate-600">{formatDate(ipo.open_date)}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(ipo.close_date)}</td>
              <td className="px-4 py-3">
                <IPOStatusBadge status={ipo.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
