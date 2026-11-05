import { ShieldCheck } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
      <ShieldCheck className="w-16 h-16 text-brand-blue mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">Administrative Console</h1>
      <p className="text-slate-400 max-w-md mx-auto">
        Authentication, data source verification controls, and manual audit overrides will be enabled in Milestone 3.
      </p>
    </div>
  )
}
