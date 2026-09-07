import type { Metadata } from 'next'
import MapPageLayout from '@/components/ui/MapPageLayout'

export const metadata: Metadata = {
  title: 'Tech Ecosystem Map | Trax',
  description:
    'An interactive directory mapping startups, tech hubs, research labs, and investment corridors across Nigeria, Africa, and global networks.',
}

export default function MapPage() {
  return <MapPageLayout />
}
