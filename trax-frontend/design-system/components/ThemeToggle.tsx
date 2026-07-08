'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export interface ThemeToggleProps {
  id?: string
  className?: string
  style?: React.CSSProperties
}

function isDarkMode() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function ThemeToggle({
  id = 'theme-toggle',
  className = '',
  style,
}: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(isDarkMode())
  }, [])

  // Keep icon in sync when next-themes or the blocking script updates <html>
  useEffect(() => {
    if (!mounted) return
    setIsDark(isDarkMode())
  }, [mounted, theme, resolvedTheme])

  const toggle = useCallback(() => {
    const next = isDarkMode() ? 'light' : 'dark'
    setTheme(next)
    setIsDark(next === 'dark')
  }, [setTheme])

  if (!mounted) {
    return (
      <button
        type="button"
        id={id}
        aria-label="Toggle theme"
        className={`ds-theme-toggle inline-flex items-center justify-center ${className}`.trim()}
        style={style}
        disabled
      >
        <MoonIcon />
      </button>
    )
  }

  return (
    <button
      type="button"
      id={id}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className={`ds-theme-toggle inline-flex items-center justify-center ${className}`.trim()}
      style={style}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
