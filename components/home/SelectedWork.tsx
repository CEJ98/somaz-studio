'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { projects } from '@/data/projects'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import AnimatedSection from '@/components/AnimatedSection'

function ScrollCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], reduced ? [1, 1] : [0, 1])

  return (
    <m.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </m.div>
  )
}

export default function SelectedWork() {
  const t = useTranslations('home')
  const selected = projects.filter(p => p.slug !== 'iron-fitness-gym').slice(0, 4)

  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <AnimatedSection className="flex items-end justify-between mb-16">
        <div>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('selectedWork')}</p>
          <h2 className="font-serif font-light italic text-foreground/80" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t('spacesTagline')}
          </h2>
        </div>
        <Link
          href="/work"
          className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-300"
        >
          {t('allProjects')}
          <Icon name="arrow_right_alt" size={14} />
        </Link>
      </AnimatedSection>

      {/* Row 1: large left + small right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
        {selected[0] && (
          <ScrollCard className="md:col-span-7">
            <Link href={`/work/${selected[0].slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <Image
                  src={selected[0].coverImage}
                  alt={selected[0].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selected[0].category}</p>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selected[0].title}</h3>
                  <p className="font-sans text-[11px] text-foreground/55 mt-1">{selected[0].location} — {selected[0].year}</p>
                </div>
                <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>01</span>
              </div>
            </Link>
          </ScrollCard>
        )}
        {selected[1] && (
          <ScrollCard className="md:col-span-5">
            <Link href={`/work/${selected[1].slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <Image
                  src={selected[1].coverImage}
                  alt={selected[1].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selected[1].category}</p>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selected[1].title}</h3>
                  <p className="font-sans text-[11px] text-foreground/55 mt-1">{selected[1].location} — {selected[1].year}</p>
                </div>
                <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>02</span>
              </div>
            </Link>
          </ScrollCard>
        )}
      </div>

      {/* Row 2: small left + large right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {selected[2] && (
          <ScrollCard className="md:col-span-5">
            <Link href={`/work/${selected[2].slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <Image
                  src={selected[2].coverImage}
                  alt={selected[2].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selected[2].category}</p>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selected[2].title}</h3>
                  <p className="font-sans text-[11px] text-foreground/55 mt-1">{selected[2].location} — {selected[2].year}</p>
                </div>
                <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>03</span>
              </div>
            </Link>
          </ScrollCard>
        )}
        {selected[3] && (
          <ScrollCard className="md:col-span-7">
            <Link href={`/work/${selected[3].slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <Image
                  src={selected[3].coverImage}
                  alt={selected[3].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selected[3].category}</p>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selected[3].title}</h3>
                  <p className="font-sans text-[11px] text-foreground/55 mt-1">{selected[3].location} — {selected[3].year}</p>
                </div>
                <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>04</span>
              </div>
            </Link>
          </ScrollCard>
        )}
      </div>

      <AnimatedSection className="mt-14 flex justify-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
        >
          {t('viewAllProjects')}
          <Icon name="arrow_right_alt" size={14} />
        </Link>
      </AnimatedSection>
    </section>
  )
}
