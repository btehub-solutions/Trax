import HomeHero from '@/components/ui/HomeHero'
import LatestStoriesHero from '@/components/ui/LatestStoriesHero'
import ArticleGrid from '@/components/ui/ArticleGrid'
import NewsletterSection from '@/components/ui/NewsletterSection'
import PressRoomSection from '@/components/ui/PressRoomSection'
import { SectionBand } from '@/design-system/components'
import { resolveHomeArticles } from '@/lib/demoArticles'
import { resolveHeroStack } from '@/lib/heroArticles'
import { fetchArticles, fetchPressArticles, REVALIDATE_SECONDS } from '@/lib/server-api'

export const revalidate = REVALIDATE_SECONDS

export default async function HomePage() {
  const [rawArticles, press] = await Promise.all([
    fetchArticles({ limit: 50 }),
    fetchPressArticles(6),
  ])

  const { articles: allArticles, isPreview } = resolveHomeArticles(rawArticles)
  const { remaining: feedArticles } = resolveHeroStack(allArticles)
  const featuredArticles = allArticles.filter((a) => a.featured)

  return (
    <div className="ds-home ds-premium-home">
        <SectionBand variant="default" section={false}>
          <HomeHero articles={allArticles} isPreview={isPreview} />
        </SectionBand>

        <SectionBand variant="tint" section={false}>
          <LatestStoriesHero articles={feedArticles} isPreview={isPreview} />
        </SectionBand>

        <SectionBand variant="default">
          <ArticleGrid
            id="featured"
            title="Editor's Briefing"
            subtitle="The most important local intelligence from Ogun State and West Africa"
            articles={featuredArticles.length ? featuredArticles : allArticles}
            variant="featured-first"
            viewAllHref="/news"
            embedded
          />
        </SectionBand>

        <SectionBand variant="tint">
          <PressRoomSection articles={press.articles} isDemo={press.isDemo} />
        </SectionBand>

        <SectionBand variant="muted">
          <NewsletterSection />
        </SectionBand>
    </div>
  )
}
