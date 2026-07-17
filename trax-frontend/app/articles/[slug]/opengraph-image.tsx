import { ImageResponse } from 'next/og'
import { fetchArticleBySlug } from '@/lib/server-api'
import { siteConfig } from '@/lib/seo'

export const alt = 'Trax Article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 3600

export default async function ArticleOGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)

  const title = article?.title ?? siteConfig.title
  const category = article?.category ?? ''
  const author = article?.author ?? 'Trax'
  const excerpt = article?.excerpt ?? siteConfig.description

  // Truncate title if too long
  const displayTitle = title.length > 72 ? title.slice(0, 69) + '...' : title
  const displayExcerpt = excerpt.length > 120 ? excerpt.slice(0, 117) + '...' : excerpt

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          padding: '0',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Red accent bar top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: '#E7040D',
          }}
        />

        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231,4,13,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 72px',
            height: '100%',
          }}
        >
          {/* Top row: logo + category badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#fafafa',
                letterSpacing: '-0.03em',
              }}
            >
              Trax
            </div>
            {category && (
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#E7040D',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(231,4,13,0.4)',
                  borderRadius: 6,
                  padding: '6px 14px',
                }}
              >
                {category}
              </div>
            )}
          </div>

          {/* Main title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                fontSize: title.length > 55 ? 42 : 52,
                fontWeight: 800,
                color: '#fafafa',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {displayTitle}
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#71717a',
                lineHeight: 1.45,
                maxWidth: 820,
              }}
            >
              {displayExcerpt}
            </div>
          </div>

          {/* Bottom row: author + site */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              paddingTop: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#E7040D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {author[0]?.toUpperCase() ?? 'T'}
              </div>
              <div style={{ fontSize: 16, color: '#a1a1aa', fontWeight: 600 }}>
                {author}
              </div>
            </div>
            <div style={{ fontSize: 16, color: '#52525b', fontWeight: 600 }}>
              trax.ng
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
