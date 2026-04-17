'use client'

import { Link } from '@/i18n/navigation'
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import { team } from '@/data/team'
import { t as tl } from '@/lib/locale'
import { useLocale } from 'next-intl'
import FadeUp from '@/components/FadeUp'

function CounterStat({ value, suffix = '', label }: { value: string; suffix?: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())
  const isNumeric = /^\d+$/.test(value)

  useEffect(() => {
    if (inView && isNumeric) {
      if (reduced) {
        count.set(parseInt(value))
      } else {
        animate(count, parseInt(value), { duration: 1.5, ease: 'easeOut' })
      }
    }
  }, [inView, value, count, isNumeric, reduced])

  return (
    <div ref={ref}>
      <p className="font-serif font-light text-accent" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
        {isNumeric ? <motion.span>{rounded}</motion.span> : value}{suffix}
      </p>
      <p className="font-sans text-[10px] text-foreground/80 tracking-[0.25em] mt-3 uppercase">{label}</p>
    </div>
  )
}

export default function AboutClient() {
  const t = useTranslations('about')
  const locale = useLocale()

  const differentiators = [
    { label: t('diff1Label'), description: t('diff1Desc'), icon: 'arrow_forward' as const },
    { label: t('diff2Label'), description: t('diff2Desc'), icon: 'work' as const },
    { label: t('diff3Label'), description: t('diff3Desc'), icon: 'chat' as const },
  ]

  return (
    <div className="min-h-screen pt-0 pb-24">
      {/* Hero — with background image */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about-hero.jpg"
            alt="Somaz Studio — architectural space with refined materiality"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-10 pb-20 md:pb-28 pt-40">
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              {t('ourStory')}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                <h1
                  className="font-serif leading-[0.9] mb-12"
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
                >
                  <span className="block font-light italic text-foreground/60">{t('heading1')}</span>
                  <span className="block font-semibold text-foreground">{t('heading2')}</span>
                </h1>
                <p className="font-sans font-light text-foreground/55 leading-relaxed max-w-lg">
                  {t('intro')}
                </p>
              </motion.div>

              <motion.div
                className="md:col-span-4 md:col-start-9 flex flex-col justify-end pb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
              >
                <div className="architectural-line mb-8" />
                <blockquote
                  className="font-serif italic text-foreground/70 leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
                >
                  {t('quote')}
                </blockquote>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="px-6 md:px-10 py-28 md:py-40 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-20">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('whySomaz')}</p>
            <h2 className="font-serif font-light italic text-foreground/90" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {t('whySomazSub')}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {differentiators.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.12}>
                <div className="relative border-t border-border/40 pt-10 pb-12 md:pr-16 overflow-hidden">
                  <p className="font-serif font-light text-accent/40 select-none mb-4" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-5">{item.label}</h3>
                  <p className="font-sans font-light text-foreground/85 leading-relaxed">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-6 md:px-10 py-28 md:py-40 border-b border-border/40 overflow-hidden">
        <Image
          src="/backgrounds/about-stats.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="architectural-line mb-20" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: '50', suffix: '+', label: t('stat1Label') },
              { value: '8', suffix: '+', label: t('stat2Label') },
              { value: 'EN/ES', suffix: '', label: t('stat3Label') },
              { value: '100', suffix: '%', label: t('stat4Label') },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <CounterStat value={stat.value} suffix={stat.suffix} label={stat.label} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-border/40 overflow-hidden">
        <FadeUp className="px-6 md:px-10 pt-28 md:pt-40 pb-16 max-w-7xl mx-auto">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('theTeam')}</p>
          <h2 className="font-serif font-light italic text-foreground/70" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t('whoWeAre')}
          </h2>
        </FadeUp>

        {team.map((member, i) => (
          <FadeUp key={member.name} delay={i * 0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Photo — full editorial */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', minHeight: '480px' }}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale-[15%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30 hidden md:block" />
                {/* Name overlay on mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:hidden bg-gradient-to-t from-background/80 to-transparent">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{member.name}</h3>
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent mt-1">{tl(member.role, locale)}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20 bg-surface/20">
                <div className="architectural-line mb-12 hidden md:block" />
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2 hidden md:block">{member.name}</h3>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8 hidden md:block">{tl(member.role, locale)}</p>
                <p className="font-sans font-light text-foreground/65 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>
                  {tl(member.bio, locale)}
                </p>
                <div className="mt-10 pt-8 border-t border-border/30 flex flex-col gap-3">
                  <a
                    href="mailto:hola@somazstudio.com"
                    className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55 hover:text-accent transition-colors duration-300"
                  >
                    <span className="h-px w-5 bg-current" />
                    hola@somazstudio.com
                  </a>
                  <a
                    href="https://instagram.com/somazstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/55 hover:text-accent transition-colors duration-300"
                  >
                    <span className="h-px w-5 bg-current" />
                    @somazstudio
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span
            className="ghost-text font-serif font-bold leading-none"
            style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
          >
            SOMAZ
          </span>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-8">{t('letsBuild')}</p>
            <h2
              className="font-serif font-light text-foreground mb-12 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {t('readyToStart')}<br />
              <span className="italic text-foreground/60">{t('nextProject')}</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              {t('getInTouch')}
              <Icon name="north_east" size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
