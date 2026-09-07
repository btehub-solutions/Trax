import type { Metadata } from 'next'
import PressPageLayout from '@/components/ui/PressPageLayout'
import { fetchPressPageData } from '@/lib/server-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Press Room & Partner Statements',
  description:
    'Official partner statements, corporate tech announcements, and startup press releases from across Africa and global markets.',
  path: '/press',
})

export default async function PressRoomPage() {
  const { articles, partners } = await fetchPressPageData()

  return (
    <PressPageLayout
      description="Partner stories, sponsored dispatches, and official announcements shaping technology markets."
      articles={articles}
      partners={partners}
    />
  )
}
