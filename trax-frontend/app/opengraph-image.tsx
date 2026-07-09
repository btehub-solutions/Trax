import { ImageResponse } from 'next/og'

export const alt = "Trax — Tracking Ogun State's Tech Movement"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#09090b',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#E7040D',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 72,
            right: 80,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#E7040D',
          }}
        >
          Tech newsroom
        </div>
        <div
          style={{
            fontSize: 112,
            fontWeight: 800,
            color: '#fafafa',
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            marginBottom: 24,
          }}
        >
          Trax
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: '#a1a1aa',
            lineHeight: 1.35,
            maxWidth: 820,
          }}
        >
          Tracking Ogun State's tech movement — startups, funding, people, and policy.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            fontWeight: 600,
            color: '#71717a',
          }}
        >
          trax.ng
        </div>
      </div>
    ),
    { ...size },
  )
}
