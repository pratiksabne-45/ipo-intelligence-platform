import Link from 'next/link'
import { siteConfig } from '@/config/site'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'
import { TrendingUp } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-navy">
          <div className="bg-brand-blue rounded-lg p-1.5">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span>{siteConfig.name}</span>
        </Link>
        <div className="hidden md:flex">
          <Navbar />
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  )
}
