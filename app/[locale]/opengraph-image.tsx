import { ImageResponse } from 'next/og'

export const alt = 'Somaz Studio — Architecture, Interiors and Visualization · Miami'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F8F6F2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#8B6F47',
            letterSpacing: '6px',
            textTransform: 'uppercase' as const,
          }}
        >
          SOMAZ STUDIO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            Architecture
          </div>
          <div
            style={{
              width: '48px',
              height: '2px',
              background: '#8B6F47',
            }}
          />
          <div
            style={{
              fontSize: '18px',
              fontWeight: 300,
              color: 'rgba(26, 26, 26, 0.55)',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
            }}
          >
            Interiors · Visualization · Hospitality
          </div>
        </div>

        <div
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(26, 26, 26, 0.4)',
            letterSpacing: '4px',
            textTransform: 'uppercase' as const,
          }}
        >
          Miami · Global · 50+ Projects
        </div>
      </div>
    ),
    { ...size }
  )
}
