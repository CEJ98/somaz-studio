'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import Image from 'next/image'

interface HeroSectionProps {
  headline?: { en: string; es: string }
  subline?: { en: string; es: string }
  ctaLabel?: { en: string; es: string }
  ctaHref?: string
  videoSrc?: string
  posterSrc?: string
  locale?: string
}

export default function HeroSection({
  headline,
  subline,
  ctaLabel,
  ctaHref = '/contact',
  videoSrc,
  posterSrc,
  locale = 'en',
}: HeroSectionProps) {
  const [videoReady, setVideoReady] = useState(!videoSrc)
  const [wordRevealed, setWordRevealed] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  useEffect(() => {
    const timer = setTimeout(() => setWordRevealed(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const words = headline
    ? (headline[locale as 'en' | 'es'] ?? headline.en).split(' ')
    : ['We craft spaces', 'that move you.']

  return (
    <section ref={heroRef} className="relative h-[100vh] min-h-[600px] flex items-end overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? {} : { y: bgY }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <Image
            src={posterSrc ?? '/hero-poster.jpg'}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      </motion.div>

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none text-foreground/[3%]"
          style={{ fontSize: 'clamp(6rem, 16vw, 14rem)' }}
        >
          SOMAZ
        </span>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-10 pb-20 md:pb-28"
        style={reduced ? {} : { y: textY }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Pre-heading label */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-accent" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent">
              Miami · Global
            </span>
          </motion.div>

          {/* Headline with word reveal */}
          <h1
            className="font-serif font-light italic text-foreground overflow-hidden"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.05 }}
          >
            {words.map((word, i) => (
              <span key={i} className="relative inline-block mr-[0.25em]">
                <span
                  className={`inline-block overflow-hidden transition-all duration-700 ${
                    wordRevealed ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Subline */}
          {subline && (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease }}
              className="font-sans font-light text-foreground/65 mt-6 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
            >
              {subline[locale as 'en' | 'es'] ?? subline.en}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-10"
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300 group"
            >
              {ctaLabel ? ctaLabel[locale as 'en' | 'es'] ?? ctaLabel.en : 'Start a Project'}
              <Icon name="north_east" size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-foreground/25 text-foreground/70 hover:border-accent/50 hover:text-foreground px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              View our work
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-accent/0 to-accent/40" />
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/40" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  )
}
