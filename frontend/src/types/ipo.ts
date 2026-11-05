export type IPOStatus = 'upcoming' | 'open' | 'closed' | 'listed' | 'withdrawn'
export type IPOType = 'mainboard' | 'sme'

export interface IPOListItem {
  id: number
  slug: string
  company_name: string
  ipo_type: IPOType
  status: IPOStatus
  price_band_min: string | null
  price_band_max: string | null
  open_date: string | null
  close_date: string | null
  listing_date: string | null
}

export interface IPODetail extends IPOListItem {
  issue_price: string | null
  lot_size: number | null
  issue_size_cr: string | null
  allotment_date: string | null
  exchange: string | null
  registrar: string | null
  nse_symbol: string | null
  bse_code: string | null
  is_verified: boolean
  created_at: string
  updated_at: string
}
