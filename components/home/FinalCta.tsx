'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/icons'
import MagneticButton from '@/components/MagneticButton'
import AnimatedSection from '@/components/AnimatedSection'

export default function FinalCta() {
  const t = useTranslations('home')
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVideoReady(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="border-t border-border/50 relative overflow-hidden" style={{ minHeight: '80vh' }}>
      {/* Video backdrop */}
      {videoReady && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          poster="/library/video/cta-loop-poster.jpg"
        >
          <source src="/library/video/cta-loop-720.webm" type="video/webm" />
          <source src="/library/video/cta-loop-1080.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay: lighter top, heavier bottom so text is always legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/92 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/[0.04] via-transparent to-transparent z-[1]" />

      {/* Ghost SOMAZ text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-[2]" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
        >
          SOMAZ
        </span>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 px-6 md:px-10 py-32 md:py-48">
        <AnimatedSection>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8">{t('startConversation')}</p>
          <h2
            className="font-serif font-light text-foreground leading-tight mb-12"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            {t('readyToBring')}<br />
            <span className="italic text-foreground/60">{t('visionToLife')}</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
              >
                {t('startProject')}
                <Icon name="north_east" size={16} />
              </Link>
            </MagneticButton>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 border border-foreground/30 text-foreground/75 hover:border-accent hover:text-accent px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              {t('viewOurWorkCta')}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
