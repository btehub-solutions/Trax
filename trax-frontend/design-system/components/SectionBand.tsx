import type { ReactNode } from 'react'

type BandVariant = 'default' | 'tint' | 'muted'

const bandClass: Record<BandVariant, string> = {
  default: 'ds-band',
  tint: 'ds-band-tint',
  muted: 'ds-band-muted',
}

export interface SectionBandProps {
  variant?: BandVariant
  section?: boolean
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionBand({
  variant = 'default',
  section = true,
  children,
  className = '',
  id,
}: SectionBandProps) {
  const Tag = section ? 'section' : 'div'
  return (
    <Tag
      id={id}
      className={`${bandClass[variant]} ${section ? 'ds-section' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
