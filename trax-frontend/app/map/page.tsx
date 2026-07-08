import type { Metadata } from 'next'
import MapPageLayout from '@/components/ui/MapPageLayout'

export const metadata: Metadata = {
  title: 'Ogun State Tech Map | Trax',
  description:
    'A curated directory of startups, tech hubs, and research labs across Ogun State.',
}

export default function MapPage() {
  return <MapPageLayout />
}
