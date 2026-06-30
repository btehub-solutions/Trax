import TickerBar       from '@/components/ui/TickerBar'
import { BASE_URL } from '@/lib/api'
import { mapApiArticle } from '@/lib/mapArticle'
import LatestStoriesHero from '@/components/ui/LatestStoriesHero'
import TabbedArticlesSection from '@/components/ui/TabbedArticlesSection'
import ArticleGrid     from '@/components/ui/ArticleGrid'
import NewsletterSection from '@/components/ui/NewsletterSection'
import PressRoomSection from '@/components/ui/PressRoomSection'
import { articles as mockArticles, Article }   from '@/lib/articles'
import AdSlot          from '@/components/AdSlot'

export const dynamic = 'force-dynamic';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${BASE_URL}/articles?limit=50`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('API server returned error')
    const json = await res.json()
    if (json && json.data) {
      return json.data.map(mapApiArticle)
    }
  } catch (err: any) {
    console.warn('Backend API offline, using static mock articles fallback:', err.message || err)
    return mockArticles
  }
  return mockArticles
}

export default async function HomePage() {
  const allArticles = await getArticles()
  const featuredArticles = allArticles.filter((a) => a.featured)
  const trendingArticles = allArticles.filter((a) => a.trending)
  const fundingArticles = allArticles.filter((a) => a.category.toLowerCase() === 'funding')
  const builderArticles = allArticles.filter((a) => ['people', 'profiles', 'interview'].includes(a.category.toLowerCase()))
  const ecosystemArticles = allArticles.filter((a) => ['ecosystem', 'events', 'policy'].includes(a.category.toLowerCase()))
  const breakingTitles = allArticles.filter((a) => a.breaking).map((a) => a.title)

  return (
    <>
      {/* ── Breaking news ticker (sits behind sticky nav, shifts on scroll) ── */}
      <div className="pt-16">
        <TickerBar headlines={breakingTitles} />
      </div>

      {/* ── Homepage Leaderboard Ad Banner ── */}
      <div className="container py-6 flex justify-center">
        <AdSlot size="leaderboard" label="Top Advertisement" />
      </div>

      {/* ── Hero: latest stories card grid ── */}
      <LatestStoriesHero articles={allArticles} />

      {/* ── Press Room: sponsored partner content ── */}
      <PressRoomSection />

      {/* ── Interactive Category Strip & Filtered Articles Grid ── */}
      <TabbedArticlesSection articles={allArticles} />

      {/* ── Local Intelligence ── */}
      <ArticleGrid
        id="featured"
        title="Editor’s Briefing"
        subtitle="The most important local intelligence from Ogun State and West Africa"
        articles={featuredArticles}
        variant="featured-first"
      />

      <ArticleGrid
        id="funding-watch"
        title="Funding Watch"
        subtitle="Capital flows, startup deals, and investor moves shaping the region"
        articles={fundingArticles.slice(0, 6)}
        viewAllHref="/funding"
      />

      <ArticleGrid
        id="builder-spotlight"
        title="Builder Spotlight"
        subtitle="Founders, operators, researchers, and teams building from the ground up"
        articles={builderArticles.length ? builderArticles.slice(0, 6) : trendingArticles.slice(0, 6)}
        viewAllHref="/people"
      />

      {/* ── Newsletter banner ── */}
      <NewsletterSection />

      <ArticleGrid
        id="ecosystem-radar"
        title="Ecosystem Radar"
        subtitle="Policy, events, infrastructure, and community signals worth tracking"
        articles={ecosystemArticles.length ? ecosystemArticles.slice(0, 6) : trendingArticles.slice(0, 6)}
        variant="featured-first"
        viewAllHref="/ecosystem"
      />
    </>
  )
}
