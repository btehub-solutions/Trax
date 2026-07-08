import type { Metadata } from 'next'
import PressPageLayout from '@/components/ui/PressPageLayout'
import { fetchPressPageData } from '@/lib/server-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Press Room',
  description:
    'Official partner statements, startup press releases, and sponsored dispatches from Ogun State tech.',
  path: '/press',
})

export default async function PressRoomPage() {
  const { articles, partners } = await fetchPressPageData()

  return (
    <PressPageLayout
      description="Partner stories, sponsored dispatches, and official announcements from across Ogun State tech."
      articles={articles}
      partners={partners}
    />
  )
}
