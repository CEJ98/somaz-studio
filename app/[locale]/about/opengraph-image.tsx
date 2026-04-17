import { ImageResponse } from 'next/og'

export const alt = 'About — Somaz Studio'
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
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <div style={{ fontSize: '18px', fontWeight: 300, color: '#8A7A5A', letterSpacing: '6px', textTransform: 'uppercase' as const }}>
            Studio
          </div>
          <div style={{ fontSize: '88px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-2px' }}>
            About
          </div>
          <div style={{ width: '60px', height: '2px', background: '#8A7A5A' }} />
          <div style={{ fontSize: '22px', fontWeight: 300, color: 'rgba(240, 237, 230, 0.65)', letterSpacing: '2px', textAlign: 'center' as const, maxWidth: '900px' }}>
            A boutique design studio crafting precise, photoreal spaces
          </div>
          <div style={{ fontSize: '14px', fontWeight: 300, color: '#8A7A5A', letterSpacing: '6px', textTransform: 'uppercase' as const, marginTop: '24px' }}>
            Somaz Studio · Miami
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
