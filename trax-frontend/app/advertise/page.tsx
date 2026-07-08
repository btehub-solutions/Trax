import type { Metadata } from 'next'
import AdvertisePageLayout from '@/components/ui/AdvertisePageLayout'

export const metadata: Metadata = {
  title: 'Advertise with Trax | Partnerships',
  description:
    'Partner with Trax to reach founders, VCs, and developers across Ogun State and Nigeria.',
}

export default function AdvertisePage() {
  return <AdvertisePageLayout />
}
