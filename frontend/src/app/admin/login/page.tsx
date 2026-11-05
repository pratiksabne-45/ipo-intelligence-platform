import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  return (
    <div className="max-w-md mx-auto py-16 px-6 bg-slate-800 rounded-xl border border-slate-700">
      <div className="text-center mb-6">
        <Lock className="w-10 h-10 text-brand-blue mx-auto mb-2" />
        <h1 className="text-xl font-bold text-white">Administrator Access</h1>
        <p className="text-slate-400 text-sm mt-1">Authorized personnel only</p>
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 text-center text-sm text-slate-400">
        Authentication endpoints are under development. Use environment credentials in production.
      </div>
    </div>
  )
}
