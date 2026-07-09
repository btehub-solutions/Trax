import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          borderRadius: 36,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            backgroundColor: '#E7040D',
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
          }}
        />
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: '#fafafa',
            letterSpacing: '-0.04em',
            marginTop: 8,
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size },
  )
}
