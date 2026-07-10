import type { ReactNode } from 'react'

export interface SectionMarkerProps {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

/** newsflash / The NEWS* — vertical red bar + section title */
export default function SectionMarker({
  title,
  subtitle,
  action,
  className = '',
}: SectionMarkerProps) {
  return (
    <div className={`ds-section-marker ${className}`.trim()}>
      <span className="ds-section-marker__bar" aria-hidden />
      <div className="ds-section-marker__content">
        <div className="ds-section-marker__title-row">
          <h2 className="ds-section-marker__title">{title}</h2>
          {action}
        </div>
        {subtitle && <p className="ds-section-marker__subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
