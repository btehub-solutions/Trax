'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import MastheadLabelBand from '@/design-system/components/MastheadLabelBand'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideNavAndFooter =
    pathname.startsWith('/login') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/design-system')

  const showMasthead =
    !hideNavAndFooter &&
    !pathname.startsWith('/articles/')

  return (
    <>
      {!hideNavAndFooter && <Nav />}
      <div className="ds-site-body">
        {showMasthead && <MastheadLabelBand />}
        <main className="ds-site-main">{children}</main>
      </div>
      {!hideNavAndFooter && <Footer />}
    </>
  )
}
