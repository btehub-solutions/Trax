import type { Metadata } from 'next'
import { Oxanium, DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'

const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-oxanium',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Trax | Tracking Ogun State's Tech Movement",
  description:
    "Ogun State's tech news and startup media platform, covering startups, funding rounds, research breakthroughs, and the people building the Ogun State's tech future.",
  keywords: [
    'Ogun State Tech',
    'Nigeria tech',
    'Ogun State startups',
    'technology Ogun State',
    'Abeokuta tech',
    'tech media Ogun State',
  ],
  openGraph: {
    title: 'Trax',
    description: "Tracking Ogun State's Tech Movement",
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trax | Tracking Ogun State's Tech Movement",
    description: "Ogun State's tech news and startup media platform.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${oxanium.variable} ${dmSans.variable}`}>
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
