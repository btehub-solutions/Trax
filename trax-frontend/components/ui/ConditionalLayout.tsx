'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer on /login and any /dashboard route
  const hideNavAndFooter = pathname.startsWith('/login') || pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavAndFooter && <Nav />}
      <main>{children}</main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
