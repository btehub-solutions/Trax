import type { Metadata } from 'next'
import Script from 'next/script'
import { Oxanium, DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import ConditionalLayout from '@/components/ui/ConditionalLayout'

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
  title: "TRAX | Tracking Ogun State's Tech Movement",
  description:
    "Ogun State's tech news and startup media platform, covering startups, funding rounds, research breakthroughs, and the people building Ogun State's tech future.",
  keywords: [
    'Ogun State Tech',
    'Nigeria tech',
    'Ogun State startups',
    'technology Ogun State',
    'Abeokuta tech',
    'tech media Ogun State',
  ],
  openGraph: {
    title: "TRAX | Tracking Ogun State's Tech Movement",
    description: "Tracking Ogun State's Tech Movement",
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TRAX | Tracking Ogun State's Tech Movement",
    description: "Ogun State's tech news and startup media platform.",
    site: '@traxnewsng',
    creator: '@traxnewsng',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${oxanium.variable} ${dmSans.variable}`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}

        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}
