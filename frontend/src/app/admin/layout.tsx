import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal | IPO Intelligence',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-lg font-bold text-slate-200">Admin Portal</h2>
          <p className="text-slate-400 text-sm">IPO Intelligence Platform — Management Console</p>
        </div>
        {children}
      </div>
    </div>
  )
}
