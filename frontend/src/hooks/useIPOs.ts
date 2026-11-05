'use client'

import { useState, useEffect } from 'react'
import { fetchIPOs } from '@/lib/api/ipo'
import type { IPOListItem } from '@/types/ipo'

interface UseIPOsOptions {
  status?: string
  page?: number
  pageSize?: number
}

interface UseIPOsResult {
  ipos: IPOListItem[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useIPOs(options: UseIPOsOptions = {}): UseIPOsResult {
  const [ipos, setIpos] = useState<IPOListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    fetchIPOs({
      status: options.status,
      page: options.page ?? 1,
      page_size: options.pageSize ?? 20,
    })
      .then((data) => {
        if (!cancelled) {
          setIpos(data)
          setIsLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [options.status, options.page, options.pageSize, refreshKey])

  return {
    ipos,
    isLoading,
    error,
    refetch: () => setRefreshKey((k) => k + 1),
  }
}
