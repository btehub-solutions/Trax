import type { Metadata } from 'next'
import AdvertisePageLayout from '@/components/ui/AdvertisePageLayout'

export const metadata: Metadata = {
  title: 'Advertise with Trax | Reach Tech Leaders & Decision Makers',
  description:
    'Partner with Trax to reach influential founders, venture capitalists, corporate leaders, and engineers across Nigeria, Africa, and global tech ecosystems.',
}

export default function AdvertisePage() {
  return <AdvertisePageLayout />
}
