import { ImageResponse } from 'next/og'
import { posts } from '@/data/posts'
import { t } from '@/lib/locale'

export const alt = 'Somaz Studio Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F8F6F2', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', fontSize: 48 }}>
        Somaz Studio
      </div>,
      { ...size }
    )
  }

  const title = t(post.title, locale)
  const excerpt = t(post.excerpt, locale)
  const imageUrl = `https://somazstudio.com${post.coverImage}`

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#F8F6F2' }}>
      {/* Background image */}
      { }
      <img
        src={imageUrl}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, opacity: 0.4 }}
      />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(to top, rgba(28,28,26,0.95) 0%, rgba(28,28,26,0.7) 100%)' }} />
      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '60px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '32px', height: '2px', background: '#8A7A5A' }} />
          <span style={{ fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A7A5A' }}>
            {post.category}
          </span>
        </div>
        <h1 style={{ fontFamily: 'serif', fontSize: '52px', fontWeight: 300, fontStyle: 'italic', color: '#1A1A1A', lineHeight: 1.1, margin: '0 0 20px', maxWidth: '900px' }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: '18px', color: 'rgba(240,237,230,0.45)', margin: '0 0 28px', maxWidth: '650px', lineHeight: 1.6 }}>
          {excerpt.slice(0, 140)}{excerpt.length > 140 ? '…' : ''}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'rgba(240,237,230,0.3)' }}>
            {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '0.2em', color: '#8A7A5A' }}>
            SOMAZ STUDIO
          </span>
        </div>
      </div>
    </div>,
    { ...size }
  )
}
