import TickerBar       from '@/components/ui/TickerBar'
import { BASE_URL } from '@/lib/api'
import { mapApiArticle } from '@/lib/mapArticle'
import LatestStoriesHero from '@/components/ui/LatestStoriesHero'
import TabbedArticlesSection from '@/components/ui/TabbedArticlesSection'
import ArticleGrid     from '@/components/ui/ArticleGrid'
import NewsletterSection from '@/components/ui/NewsletterSection'
import { articles as mockArticles, Article }   from '@/lib/articles'
import AdSlot          from '@/components/AdSlot'

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${BASE_URL}/articles?limit=50`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('API server returned error')
    const json = await res.json()
    if (json && json.data && json.data.length > 0) {
      return json.data.map(mapApiArticle)
    }
  } catch (err: any) {
    console.warn('Backend API offline, using static mock articles fallback:', err.message || err)
  }
  return mockArticles
}

export default async function HomePage() {
  const allArticles = await getArticles()
  const featuredArticles = allArticles.filter((a) => a.featured)
  const trendingArticles = allArticles.filter((a) => a.trending)

  return (
    <>
      {/* ── Breaking news ticker (sits behind sticky nav, shifts on scroll) ── */}
      <div className="pt-16">
        <TickerBar />
      </div>

      {/* ── Homepage Leaderboard Ad Banner ── */}
      <div className="container py-4 flex justify-center">
        <AdSlot size="leaderboard" label="Top Advertisement" />
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
