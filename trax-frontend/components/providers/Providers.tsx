'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const origError = console.error
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
        return
      }
      origError.apply(console, args)
    }

    return () => {
      console.error = origError
    }
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="trax-theme"
      themes={['light', 'dark']}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
