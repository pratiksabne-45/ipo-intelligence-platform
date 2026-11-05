import { cn, getIPOStatusColor } from '@/lib/utils'
import type { IPOStatus } from '@/types/ipo'

interface IPOStatusBadgeProps {
  status: IPOStatus
  className?: string
}

const STATUS_LABELS: Record<IPOStatus, string> = {
  upcoming: 'Upcoming',
  open: 'Open',
  closed: 'Closed',
  listed: 'Listed',
  withdrawn: 'Withdrawn',
}

export default function IPOStatusBadge({ status, className }: IPOStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        getIPOStatusColor(status),
        className,
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}
