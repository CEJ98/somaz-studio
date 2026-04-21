'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { byCategory } from '@/data/imageLibrary'

const SELECTION = [
  'interior-luxury-01',
  'interior-luxury-02',
  'interior-luxury-03',
  'interior-luxury-04',
  'interior-luxury-05',
  'interior-luxury-06',
  'interior-modern-01',
  'interior-modern-02',
]

export default function HorizontalScrollGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const t = useTranslations('home')

  const items = SELECTION.map(slug =>
    byCategory.interiors.find(i => i.slug === slug)
  ).filter((x): x is NonNullable<typeof x> => Boolean(x))

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // total horizontal travel: -(N-1) * cardWidth
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['8%', `-${(items.length - 1) * 70}%`]
  )

  return (
    <section
      ref={ref}
      className="relative border-t border-border/50 bg-surface/20"
      style={{ height: reduced ? 'auto' : `${items.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-10 left-6 md:left-10 z-10">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-2">
            {t('selectedSpaces') || 'Selected Spaces'}
          </p>
          <h2
            className="font-serif italic font-light text-foreground/70"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {t('crafted') || 'A studio of crafted interiors'}
          </h2>
        </div>

        <m.div
          className="flex gap-6 md:gap-10 px-6 md:px-10"
          style={{ x }}
        >
          {items.map((img, i) => (
            <div
              key={img.slug}
              className="relative shrink-0 overflow-hidden bg-surface"
              style={{
                width: 'clamp(280px, 60vw, 760px)',
                height: 'clamp(360px, 70vh, 580px)',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 80vw, 60vw"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="object-cover"
                priority={i < 2}
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-background/90 bg-foreground/40 backdrop-blur-sm px-3 py-1.5">
                  {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
