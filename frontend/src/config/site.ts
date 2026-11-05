/**
 * Site-wide configuration.
 * Change SITE_NAME here to rebrand the entire platform.
 */
export const siteConfig = {
  name: 'IPO Intelligence',
  tagline: "India's most reliable IPO information platform",
  description:
    'Track Indian IPO Grey Market Premium, subscription data, allotment status, upcoming IPOs and performance analysis in real time.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ipointelligence.in',
  ogImage: '/images/og-image.png',
  links: {
    twitter: '',
    github: '',
  },
  nav: [
    { label: 'IPO GMP Today', href: '/ipo-gmp-today' },
    { label: 'Upcoming IPO', href: '/upcoming-ipo' },
    { label: 'Open IPO', href: '/open-ipo' },
    { label: 'Closed IPO', href: '/closed-ipo' },
    { label: 'IPO Allotment', href: '/ipo-allotment' },
    { label: 'Learn', href: '/learn' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'System Status', href: '/system-status' },
  ],
} as const

export type SiteConfig = typeof siteConfig
