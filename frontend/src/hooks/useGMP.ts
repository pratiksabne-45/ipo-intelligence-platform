'use client'

import { useState, useEffect } from 'react'
import { fetchGMPHistory } from '@/lib/api/gmp'
import type { GMPHistoryRecord } from '@/types/gmp'

interface UseGMPResult {
  history: GMPHistoryRecord[]
  isLoading: boolean
  error: string | null
}

export function useGMP(ipoId: number | null): UseGMPResult {
  const [history, setHistory] = useState<GMPHistoryRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ipoId) return
    let cancelled = false
    setIsLoading(true)
    setError(null)

    fetchGMPHistory(ipoId)
      .then((data) => {
        if (!cancelled) {
          setHistory(data)
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
  }, [ipoId])

  return { history, isLoading, error }
}
