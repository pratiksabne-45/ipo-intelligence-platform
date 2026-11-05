'use client'

import { useState, useEffect } from 'react'
import { API_BASE_URL } from '@/lib/constants'
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Server, Database } from 'lucide-react'

interface BackendHealth {
  status: string
  app: string
  version: string
  environment: string
  timestamp: string
  database: string
}

export default function SystemStatusPage() {
  const [health, setHealth] = useState<BackendHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkConnection = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/health`, {
        cache: 'no-store',
      })
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
      }
      const data: BackendHealth = await res.json()
      setHealth(data)
      setLastChecked(new Date())
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to reach backend API')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">API Connectivity & System Status</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time verification of frontend-to-backend communication
          </p>
        </div>
        <button
          onClick={checkConnection}
          disabled={loading}
          className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-light transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Recheck
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Frontend Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 font-semibold text-brand-navy">
              <Server className="w-5 h-5 text-brand-blue" />
              Frontend (Next.js 15)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-positive border border-green-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active (Port 3000)
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">Connected API Target:</p>
          <code className="block bg-slate-50 border border-slate-200 rounded p-2 text-xs text-brand-navy font-mono break-all">
            {API_BASE_URL}
          </code>
        </div>

        {/* Backend API Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 font-semibold text-brand-navy">
              <Server className="w-5 h-5 text-brand-blue" />
              Backend (FastAPI)
            </span>
            {loading ? (
              <span className="text-xs text-slate-400">Pinging...</span>
            ) : error ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-negative border border-red-200">
                <XCircle className="w-3.5 h-3.5" />
                Unreachable
              </span>
            ) : health?.status === 'ok' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-positive border border-green-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-warning border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                Degraded
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-2">API Documentation URL:</p>
          <a
            href={`${API_BASE_URL}/api/docs`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-brand-blue hover:underline font-mono"
          >
            {API_BASE_URL}/api/docs ↗
          </a>
        </div>
      </div>

      {/* Response Data Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-slate-600" />
          Live Backend Payload (`GET /api/v1/health`)
        </h2>

        {loading ? (
          <p className="text-slate-400 text-sm">Testing connectivity to backend...</p>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-negative text-sm">
            <p className="font-semibold mb-1">Failed to connect to backend server:</p>
            <p className="font-mono text-xs">{error}</p>
          </div>
        ) : health ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400">Application</p>
                <p className="font-semibold text-slate-800">{health.app}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400">Version</p>
                <p className="font-semibold text-slate-800">v{health.version}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400">Environment</p>
                <p className="font-semibold text-slate-800 capitalize">{health.environment}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-400">Database Engine</p>
                <p className={`font-semibold text-xs truncate ${health.database === 'connected' ? 'text-positive' : 'text-amber-600'}`}>
                  {health.database}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-semibold">Raw JSON Payload:</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
            {lastChecked && (
              <p className="text-xs text-slate-400 mt-3 text-right">
                Last verified: {lastChecked.toLocaleTimeString()}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
