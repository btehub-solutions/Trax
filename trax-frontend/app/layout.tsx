import type { Metadata } from 'next'
import Script from 'next/script'
import { Fraunces, Instrument_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import ConditionalLayout from '@/components/ui/ConditionalLayout'
import JsonLd from '@/components/seo/JsonLd'
import { defaultMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
export const revalidate = 60

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-KC611DM9ZN'
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${fraunces.variable} ${instrumentSans.variable} ${spaceMono.variable} font-ui antialiased`}>
        <Script
          id="trax-theme-init"
          strategy="beforeInteractive"
        >{`(function(){try{var t=localStorage.getItem('trax-theme');var d=t==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('light',!d);}catch(e){}})();`}</Script>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

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
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        {clarityId && (
          <Script id="microsoft-clarity" strategy="lazyOnload">
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
        <Analytics />
      </body>
    </html>
  )
}
