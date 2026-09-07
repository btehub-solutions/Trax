import type { Metadata } from 'next'
import PodcastPageLayout from '@/components/ui/PodcastPageLayout'

export const metadata: Metadata = {
  title: 'Trax Podcast | Voices of African & Global Tech',
  description:
    'Conversations with the founders, operators, investors, and engineers building the future of technology across Africa and the world.',
}

export default function PodcastPage() {
  return <PodcastPageLayout />
}
