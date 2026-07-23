import type { Metadata } from 'next'
import Link from 'next/link'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'

export const revalidate = 60

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const q = resolvedSearchParams.q?.trim() ?? ''
  return pageMetadata({
    title: q ? `Search results for "${q}"` : 'Search',
    description: q
      ? `Trax articles matching "${q}" · Startups, funding, ecosystem, and tech news from Ogun State.`
      : 'Search stories, startups, founders, and tech news from Ogun State.',
    path: '/search',
  })
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const q = (resolvedSearchParams.q ?? '').trim().toLowerCase()

  // Fetch all articles from the DB (falls back to demo articles automatically)
  const all = await getDbArticles()

  // Server-side filter by title, excerpt, or category
  const results = q
    ? all.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt ?? '').toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      )
    : []

  return (
    <div className="ds-platform-page ds-premium-home">
      <SectionBand variant="default">
        <div className="container">
          <SectionMarker
            title={q ? `Results for "${q}"` : 'Search'}
            subtitle={
              q
                ? `${results.length} article${results.length !== 1 ? 's' : ''} found`
                : 'Enter a search term in the search bar above'
            }
          />

          {q && results.length === 0 && (
            <div className="ds-category-empty">
              <p className="ds-category-empty__eyebrow">No results</p>
              <h2 className="ds-category-empty__title">
                Nothing found for &ldquo;{q}&rdquo;
              </h2>
              <p className="ds-category-empty__desc">
                Try a different keyword, or browse a category from the navigation bar.
              </p>
              <Link href="/" className="ds-category-empty__link">
                Back to Latest
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="ds-article-list">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="ds-article-list__item"
                >
                  <div className="ds-article-list__meta">
                    <span className="ds-category-pill">{article.category}</span>
                    <span className="type-meta">{article.date}</span>
                  </div>
                  <h2 className="ds-article-list__title">{article.title}</h2>
                  {article.excerpt && (
                    <p className="type-excerpt ds-article-list__excerpt">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </SectionBand>
    </div>
  )
}
