import ArticleGrid from '@/components/ui/ArticleGrid'
import type { Article } from '@/lib/articles'

interface TabbedArticlesSectionProps {
  articles: Article[]
}

/** Homepage feed — latest stories; section browsing lives in the red nav */
export default function TabbedArticlesSection({ articles }: TabbedArticlesSectionProps) {
  return (
    <ArticleGrid
      id="latest"
      title="Latest Intelligence"
      subtitle="Fresh reporting from Ogun State and West Africa's startup corridors"
      articles={articles.slice(0, 6)}
      viewAllHref="/news"
      embedded
    />
  )
}
