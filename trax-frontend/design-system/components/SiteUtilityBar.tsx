'use client'

import { useEffect, useState, type ReactNode } from 'react'

export interface SiteUtilityBarProps {
  dateLabel?: string
  locationLabel?: string
  weatherLabel?: string
  center?: ReactNode
  /** Right-side actions (theme toggle, etc.) */
  actions?: ReactNode
}

function formatUtilityDateTime(dateLabel?: string) {
  const now = new Date()
  const date =
    dateLabel ??
    now.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
    })
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return { date, time }
}

/** newsflash-style top utility row — date | masthead | location/weather */
export default function SiteUtilityBar({
  dateLabel,
  locationLabel = 'Abeokuta, NG',
  weatherLabel,
  center,
  actions,
}: SiteUtilityBarProps) {
  const [clock, setClock] = useState<{ date: string; time: string } | null>(null)

  useEffect(() => {
    const update = () => setClock(formatUtilityDateTime(dateLabel))
    update()
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [dateLabel])

  return (
    <div className="ds-utility-bar border-b" style={{ borderColor: 'var(--neutral-border)' }}>
      <div className="container ds-utility-bar__inner">
        <div className="ds-utility-bar__meta">
          <span suppressHydrationWarning className="ds-utility-bar__datetime">
            {clock ? `${clock.date} - ${clock.time}` : '\u00A0'}
          </span>
        </div>

        <div className="ds-utility-bar__center">{center}</div>

        <div className="ds-utility-bar__meta ds-utility-bar__meta--end">
          <span className="ds-utility-bar__location">
            {locationLabel}
            {weatherLabel && `: ${weatherLabel}`}
          </span>
          {actions && <div className="ds-utility-bar__actions">{actions}</div>}
        </div>
      </div>
    </div>
  )
}
