'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import MagneticButton from '@/components/MagneticButton'
import { trackCtaClick } from '@/components/Analytics'

export default function Hero() {
  const t = useTranslations('home')
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 500], [1, 1])
  const heroBorderRadius = useTransform(scrollY, [0, 300], [0, 0])
  const heroOpacity = useTransform(scrollY, [0, 500], reduced ? [1, 1] : [1, 0])
  const titleY = useTransform(scrollY, [0, 600], reduced ? ['0%', '0%'] : ['0%', '14%'])
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], reduced ? [1, 1] : [1, 0])

  const [videoReady, setVideoReady] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVideoReady(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[100svh] min-h-[700px] overflow-hidden flex flex-col justify-end">
      <m.div className="absolute inset-0" style={{ scale: heroScale, borderRadius: heroBorderRadius }}>
        <Image
          src="/library/video/hero-penthouse-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
        {videoReady && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/library/video/hero-penthouse.mp4" type="video/mp4" />
          </video>
        )}
      </m.div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/15" />

      <m.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 md:pb-28"
        style={{ opacity: heroOpacity }}
      >
        <m.p
          className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          {t('badge')}
        </m.p>

        <m.div
          role="heading"
          aria-level={1}
          aria-hidden="true"
          className="font-serif leading-[0.9] tracking-tight mb-8"
          style={{ y: titleY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
          }}
        >
          <div className="overflow-hidden" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 7rem)' }}>
            {t('heroLine1').split(' ').map((word, i) => (
              <m.span
                key={i}
                className="inline-block mr-[0.25em] font-light text-foreground/60 italic"
                variants={reduced ? {} : {
                  hidden: { y: '110%', opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease } },
                }}
              >
                {word}
              </m.span>
            ))}
          </div>
          <div className="overflow-hidden" style={{ fontSize: 'clamp(4rem, 9.5vw, 11rem)' }}>
            {t('heroLine2').split(' ').map((word, i) => (
              <m.span
                key={i}
                className="inline-block mr-[0.25em] font-semibold text-foreground"
                variants={reduced ? {} : {
                  hidden: { y: '110%', opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease } },
                }}
              >
                {word}
              </m.span>
            ))}
          </div>
        </m.div>

        <m.p
          className="font-sans text-sm font-light text-foreground/75 leading-relaxed mb-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.58 }}
        >
          {t('heroSubline')}
        </m.p>

        <m.div
          className="flex flex-col items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.65 }}
        >
          <MagneticButton>
            <Link
              href="/contact"
              onClick={() => trackCtaClick('hero', 'start_project')}
              className="inline-flex items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              {t('startProject')}
              <Icon name="north_east" size={16} />
            </Link>
          </MagneticButton>
        </m.div>
      </m.div>

      <m.div
        className="absolute bottom-8 right-8 md:right-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <m.div
          className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent"
          animate={reduced ? {} : { scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </m.div>
    </section>
  )
}
