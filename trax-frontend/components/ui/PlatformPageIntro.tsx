import { SectionBand } from '@/design-system/components'

interface PlatformPageIntroProps {
  label: string
  title: string
  description?: string
  aside?: React.ReactNode
  variant?: 'default' | 'tint' | 'muted'
}

export default function PlatformPageIntro({
  label,
  title,
  description,
  aside,
  variant = 'default',
}: PlatformPageIntroProps) {
  return (
    <SectionBand variant={variant}>
      <div className="container ds-platform-page__intro">
        <div className="ds-platform-page__intro-copy">
          <p className="ds-category-label">{label}</p>
          <h1 className="ds-platform-page__title">{title}</h1>
          {description && (
            <p className="type-excerpt ds-platform-page__desc">{description}</p>
          )}
        </div>
        {aside}
      </div>
    </SectionBand>
  )
}
