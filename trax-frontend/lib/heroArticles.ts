import type { Article } from '@/lib/articles'

export interface HeroStack {
  lead: Article | null
  featured: Article[]
  remaining: Article[]
}

/** Editor-picked lead — first `featured` story, else chronologically first in list. */
export function pickLeadArticle(articles: Article[]): Article | null {
  if (!articles.length) return null
  return articles.find((a) => a.featured) ?? articles[0]
}

/** Split articles into lead, sidebar (next 2), and feed remainder. */
export function resolveHeroStack(articles: Article[]): HeroStack {
  const lead = pickLeadArticle(articles)
  if (!lead) {
    return { lead: null, featured: [], remaining: [] }
  }

  const rest = articles.filter((a) => a.id !== lead.id)
  const featured = rest.slice(0, 4)
  const remaining = rest.slice(4)

  return { lead, featured, remaining }
}
