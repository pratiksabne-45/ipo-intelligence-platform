import type { Metadata } from 'next'
import EmptyState from '@/components/common/EmptyState'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Article | Learn',
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/learn" className="text-sm text-brand-blue hover:underline mb-4 inline-block">
        ← Back to Knowledge Base
      </Link>
      <h1 className="text-3xl font-bold text-brand-navy mb-4 capitalize">
        {slug.replace(/-/g, ' ')}
      </h1>
      <EmptyState
        title="Article under preparation"
        description="Our research team is compiling this educational resource."
      />
    </div>
  )
}
