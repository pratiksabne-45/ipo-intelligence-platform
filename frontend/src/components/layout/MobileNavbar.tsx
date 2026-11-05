'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-4 py-2.5 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-brand-blue/10 text-brand-blue'
                  : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
