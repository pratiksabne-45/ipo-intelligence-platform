import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-brand-navy mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-600 mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-light transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
