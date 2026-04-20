'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { byCategory, pickBySlug } from '@/data/imageLibrary'

// Curated mix of textures + interior details for a tactile strip
const SELECTION = [
  'material-texture-01',
  'interior-detail-warm-01',
  'material-texture-02',
  'interior-detail-warm-02',
  'material-texture-03',
  'interior-detail-warm-03',
  'interior-bath-stone-01',
  'exterior-detail-01',
  'exterior-detail-02',
  'exterior-detail-03',
]

const LABELS: Record<string, string> = {
  'material-texture-01': 'Stone',
  'material-texture-02': 'Marble',
  'material-texture-03': 'Concrete',
  'interior-detail-warm-01': 'Warm Wood',
  'interior-detail-warm-02': 'Soft Linen',
  'interior-detail-warm-03': 'Plaster',
  'interior-bath-stone-01': 'Travertine',
  'exterior-detail-01': 'Facade',
  'exterior-detail-02': 'Patina',
  'exterior-detail-03': 'Cladding',
}

export default function TextureMarquee() {
  const reduced = useReducedMotion()
  const items = SELECTION.map(slug => pickBySlug(slug)).filter(Boolean)
  // fallback if any missing
  const safeItems = items.length >= 6 ? items : byCategory.interiors.slice(0, 10)
  const loop = [...safeItems, ...safeItems]

  return (
    <div className="border-t border-b border-border/30 py-6 md:py-8 overflow-hidden bg-background">
      <div
        className="marquee-track flex items-center gap-6 md:gap-10"
        style={reduced ? { animationPlayState: 'paused' } : undefined}
      >
        {loop.map((img, i) => (
          <div
            key={`${img!.slug}-${i}`}
            className="group relative shrink-0 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative w-[140px] h-[100px] md:w-[180px] md:h-[120px] overflow-hidden bg-surface">
              <Image
                src={img!.src}
                alt={img!.alt}
                fill
                sizes="180px"
                placeholder="blur"
                blurDataURL={img!.blurDataURL}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <span className="block mt-2 font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/55 text-center">
              {LABELS[img!.slug] || 'Detail'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
