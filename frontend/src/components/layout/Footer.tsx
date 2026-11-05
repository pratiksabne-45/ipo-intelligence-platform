import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { TrendingUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="bg-brand-blue rounded-lg p-1.5">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-slate-200">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.nav.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3 text-slate-200">Resources</h3>
            <ul className="space-y-2">
              {siteConfig.nav.slice(4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-700 pt-6 mb-6">
          <p className="text-slate-400 text-xs leading-relaxed">
            <strong className="text-slate-300">Disclaimer:</strong> {siteConfig.name} provides
            IPO information for educational and informational purposes only. Grey Market Premium
            (GMP) data is unofficial and does not guarantee actual listing prices. This platform
            is not SEBI-registered. Always consult a qualified financial advisor before making
            investment decisions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>Data is for informational purposes only. Not investment advice.</p>
        </div>
      </div>
    </footer>
  )
}
