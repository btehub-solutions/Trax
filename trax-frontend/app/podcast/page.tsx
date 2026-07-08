import type { Metadata } from 'next'
import PodcastPageLayout from '@/components/ui/PodcastPageLayout'

export const metadata: Metadata = {
  title: 'Trax Podcast | Audio Stories',
  description:
    "Conversations with the engineers, founders, and policy analysts building Ogun State's intelligent future.",
}

export default function PodcastPage() {
  return <PodcastPageLayout />
}
