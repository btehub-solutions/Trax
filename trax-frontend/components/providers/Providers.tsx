'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
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
