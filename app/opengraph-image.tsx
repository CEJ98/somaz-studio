import { ImageResponse } from 'next/og'

export const alt = 'Somaz Studio — Architecture, Interiors & Visualization'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const imageUrl = 'https://somazstudio.com/projects/casa-marchetti/cover.jpg'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background image */}
        <img
          src={imageUrl}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(248,246,242,0.95) 0%, rgba(248,246,242,0.5) 50%, transparent 100%)',
          }}
        />
        {/* Content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '48px 60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '1px', background: '#8B6F47' }} />
            <div style={{ fontSize: '12px', fontWeight: 300, color: '#8B6F47', letterSpacing: '5px', textTransform: 'uppercase' }}>
              Architecture · Interiors · Visualization
            </div>
          </div>
          <div style={{ fontSize: '64px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-2px', lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>
            Somaz Studio
          </div>
          <div style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(240,237,230,0.55)', letterSpacing: '1px' }}>
            Miami · Argentina · Global
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
