'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            pathname === item.href || pathname.startsWith(item.href + '/')
              ? 'bg-brand-blue/10 text-brand-blue'
              : 'text-slate-600 hover:text-brand-navy hover:bg-slate-100',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
