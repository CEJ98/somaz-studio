'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import LazyVideo from '@/components/LazyVideo'

export default function ContactParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '18%'])

  return (
    <div ref={ref} className="absolute inset-0">
      <m.div className="absolute inset-0" style={{ y }}>
        <LazyVideo
          src="/media/contact-hero.mp4"
          webmSrc="/media/contact-hero.webm"
          className="w-full h-full object-cover opacity-28 saturate-[0.85]"
        />
      </m.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/72 to-background/42" />
    </div>
  )
}
