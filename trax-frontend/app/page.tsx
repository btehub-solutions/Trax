import TickerBar       from '@/components/ui/TickerBar'
import { BASE_URL } from '@/lib/api'
import LatestStoriesHero from '@/components/ui/LatestStoriesHero'
import TabbedArticlesSection from '@/components/ui/TabbedArticlesSection'
import ArticleGrid     from '@/components/ui/ArticleGrid'
import NewsletterSection from '@/components/ui/NewsletterSection'
import { articles as mockArticles, Article }   from '@/lib/articles'

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${BASE_URL}/articles?limit=50`, {
      next: { revalidate: 10 }, // Cache for 10 seconds
    })
    if (!res.ok) throw new Error('API server returned error')
    const json = await res.json()
    if (json && json.data && json.data.length > 0) {
      return json.data.map((a: any) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category?.name || 'Ecosystem',
        author: a.author?.name || 'Trax Staff',
        authorRole: a.author?.authorRole || 'Reporter',
        date: a.publishedAt
          ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : 'June 5, 2026',
        readTime: a.readTime || '5 min read',
        image: a.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80',
        featured: a.featured,
        breaking: a.breaking,
        trending: a.trending,
      }))
    }
  } catch (err: any) {
    console.warn('Backend API offline, using static mock articles fallback:', err.message || err)
  }
  return mockArticles
}

export default async function HomePage() {
  const allArticles = await getArticles()
  const featuredArticles = allArticles
  const trendingArticles = allArticles.filter((a) => a.trending)

  return (
    <>
      {/* ── Breaking news ticker (sits behind sticky nav, shifts on scroll) ── */}
      <div className="pt-16">
        <TickerBar />
      </div>

      {/* ── Hero: latest stories card grid ── */}
      <LatestStoriesHero articles={allArticles} />

      {/* ── Interactive Category Strip & Filtered Articles Grid ── */}
      <TabbedArticlesSection articles={allArticles} />

      {/* ── Featured + Sidebar layout ── */}
      <ArticleGrid
        id="featured"
        title="Featured Stories"
        subtitle="The most important tech stories from across the state"
        articles={featuredArticles}
        variant="featured-first"
      />

      {/* ── Newsletter banner ── */}
      <NewsletterSection />

      {/* ── Trending ── */}
      <ArticleGrid
        id="trending"
        title="Trending Now"
        subtitle="What the Trax community is reading this week"
        articles={trendingArticles}
        variant="featured-first"
      />
    </>
  )
}
