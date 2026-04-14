import { ImageResponse } from 'next/og'

export const alt = 'Somaz Studio — 3D Visualization & Interior Design · Miami'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1C1C1A',
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
            color: '#C9A96E',
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
              color: '#F0EDE6',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            Design Studio
          </div>
          <div
            style={{
              width: '48px',
              height: '2px',
              background: '#C9A96E',
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
            3D Visualization · Interior Design · Conceptual Design
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
          Miami · Global · 50+ Projects
        </div>
      </div>
    ),
    { ...size }
  )
}
