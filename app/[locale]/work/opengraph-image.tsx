import { ImageResponse } from 'next/og'

export const alt = 'Somaz Studio — Portfolio · Architecture, Interiors and Visualization'
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
            Portfolio
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
              color: 'rgba(240, 237, 230, 0.5)',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
            }}
          >
            Residential · Hospitality · Commercial
          </div>
        </div>

        <div
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(240, 237, 230, 0.3)',
            letterSpacing: '4px',
            textTransform: 'uppercase' as const,
          }}
        >
          Miami · Global · 40+ Projects
        </div>
      </div>
    ),
    { ...size }
  )
}
