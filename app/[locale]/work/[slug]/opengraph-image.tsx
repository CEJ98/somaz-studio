import { ImageResponse } from 'next/og'
import { projects } from '@/data/projects'
import { t } from '@/lib/locale'

export const alt = 'Somaz Studio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#1C1C1A', alignItems: 'center', justifyContent: 'center', color: '#F0EDE6', fontSize: 48 }}>
        Somaz Studio
      </div>,
      { ...size }
    )
  }

  const brief = t(project.brief, locale)
  const imageUrl = `https://somazstudio.com${project.coverImage}`

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#1C1C1A' }}>
      {/* Background image */}
      { }
      <img
        src={imageUrl}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
      />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(to top, rgba(28,28,26,0.92) 0%, rgba(28,28,26,0.5) 50%, rgba(28,28,26,0.2) 100%)' }} />
      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '60px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '2px', background: '#C9A96E' }} />
          <span style={{ fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A96E' }}>
            {project.category}
          </span>
        </div>
        <h1 style={{ fontFamily: 'serif', fontSize: '64px', fontWeight: 600, color: '#F0EDE6', lineHeight: 1, margin: '0 0 16px' }}>
          {project.title}
        </h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: '20px', color: 'rgba(240,237,230,0.55)', margin: '0 0 24px', maxWidth: '700px', lineHeight: 1.5 }}>
          {brief.slice(0, 120)}{brief.length > 120 ? '…' : ''}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'rgba(240,237,230,0.35)' }}>
            {project.location} — {project.year}
          </span>
          <span style={{ fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '0.2em', color: '#C9A96E' }}>
            SOMAZ STUDIO
          </span>
        </div>
      </div>
    </div>,
    { ...size }
  )
}
