export interface GMPHistoryRecord {
  id: number
  ipo_id: number
  gmp_amount: string
  estimated_listing_price: string | null
  gmp_percentage: string | null
  source_name: string
  observation_timestamp: string
  collection_timestamp: string
  is_verified: boolean
  is_stale: boolean
  is_outlier: boolean
}

export interface GMPSummary {
  ipo_id: number
  company_name: string
  slug: string
  latest_gmp: string | null
  gmp_percentage: string | null
  observation_timestamp: string | null
  source_name: string | null
  disclaimer: string
}
