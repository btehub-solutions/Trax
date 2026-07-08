'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  Search01Icon,
  Menu01Icon,
  Cancel01Icon,
  Sun01Icon,
  Moon02Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  ArrowDown01Icon,
  Mail01Icon,
  CheckmarkCircle02Icon,
  Globe02Icon,
  Calendar03Icon,
  Location01Icon,
  Clock01Icon,
  CloudIcon,
  NewTwitterIcon,
} from '@hugeicons/core-free-icons'
import type { CSSProperties } from 'react'
import { iconSizes, iconTokens, type IconName, type IconSize } from './icons'

const iconMap = {
  search: Search01Icon,
  menu: Menu01Icon,
  close: Cancel01Icon,
  sun: Sun01Icon,
  moon: Moon02Icon,
  'arrow-right': ArrowRight01Icon,
  'arrow-left': ArrowLeft01Icon,
  'chevron-down': ArrowDown01Icon,
  mail: Mail01Icon,
  'check-circle': CheckmarkCircle02Icon,
  globe: Globe02Icon,
  calendar: Calendar03Icon,
  location: Location01Icon,
  clock: Clock01Icon,
  temperature: CloudIcon,
  twitter: NewTwitterIcon,
} as const

export interface IconProps {
  name: IconName
  size?: IconSize | number
  className?: string
  style?: CSSProperties
  strokeWidth?: number
  'aria-hidden'?: boolean
  'aria-label'?: string
}

export function Icon({
  name,
  size = 'md',
  className = '',
  style,
  strokeWidth = iconTokens.strokeWidth,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: IconProps) {
  const px = typeof size === 'number' ? size : iconSizes[size]
  const glyph = iconMap[name]

  return (
    <span
      className={`ds-icon ${className}`.trim()}
      style={{ '--icon-size': `${px}px`, ...style } as CSSProperties}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    >
      <HugeiconsIcon
        icon={glyph}
        size={px}
        color="currentColor"
        strokeWidth={strokeWidth}
      />
    </span>
  )
}

export { iconSizes, iconTokens, iconNames } from './icons'
export type { IconName, IconSize } from './icons'
