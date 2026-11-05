import { InboxIcon } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
      <div className="flex justify-center mb-4 text-slate-300">
        {icon ?? <InboxIcon className="w-12 h-12" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 text-sm max-w-sm mx-auto">{description}</p>
      )}
    </div>
  )
}
