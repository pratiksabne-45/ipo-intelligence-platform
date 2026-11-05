export interface APIHealthResponse {
  status: 'ok' | 'degraded' | 'down'
  app: string
  version: string
  environment: string
  timestamp: string
  database: string
}

export interface PaginatedResponse<T> {
  total: number
  page: number
  page_size: number
  items: T[]
}

export interface APIErrorDetail {
  detail: string
  error_type: string
}
