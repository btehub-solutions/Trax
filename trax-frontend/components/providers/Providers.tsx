'use client'

import { ThemeProvider } from 'next-themes'

// Suppress the React 19 / Next.js false-positive "Encountered a script tag" warning
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const origError = console.error
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return
    }
    origError.apply(console, args)
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="trax-theme"
    >
      {children}
    </ThemeProvider>
  )
}
