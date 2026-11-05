interface LastUpdatedProps {
  timestamp: string | null | undefined
}

export default function LastUpdated({ timestamp }: LastUpdatedProps) {
  if (!timestamp) return null
  const formatted = new Date(timestamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <p className="text-xs text-slate-400 text-right">
      Last updated: {formatted} IST
    </p>
  )
}
