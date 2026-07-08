import type { Metadata } from 'next'
import DesignSystemPreview from '@/design-system/preview/DesignSystemPreview'

export const metadata: Metadata = {
  title: 'Design System | Trax',
  description: 'Trax design system color tokens preview',
}

export default function DesignSystemPage() {
  return <DesignSystemPreview />
}
