'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { projects } from '@/data/projects'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'
import AnimatedSection from '@/components/AnimatedSection'

export default function SelectedWork() {
  const t = useTranslations('home')
  const reduced = useReducedMotion()
  const selected = projects.slice(0, 4)

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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-12">
        {selected[0] && (
          <motion.div
            className="md:col-span-8"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
          >
            <Link href={`/work/${selected[0].slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[4/5] mb-5">
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
                <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '3rem', lineHeight: 1 }}>01</span>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="md:col-span-4 flex flex-col gap-12">
          {[selected[1], selected[2]].map((proj, i) => proj && (
            <motion.div
              key={proj.slug}
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: (i + 1) * 0.1 }}
            >
              <Link href={`/work/${proj.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <Image
                    src={proj.coverImage}
                    alt={proj.title}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{proj.category}</p>
                    <h3 className="font-serif text-lg text-foreground group-hover:text-accent/80 transition-colors duration-300">{proj.title}</h3>
                    <p className="font-sans text-[11px] text-foreground/55 mt-1">{proj.location} — {proj.year}</p>
                  </div>
                  <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>0{i + 2}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {selected[3] && (
          <motion.div
            className="md:col-start-3 md:col-span-8"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            <Link href={`/work/${selected[3].slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[16/7] mb-5">
                <Image
                  src={selected[3].coverImage}
                  alt={selected[3].title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 67vw"
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent/70 mb-1">{selected[3].category}</p>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent/80 transition-colors duration-300">{selected[3].title}</h3>
                  <p className="font-sans text-[11px] text-foreground/55 mt-1">{selected[3].location} — {selected[3].year}</p>
                </div>
                <span className="font-serif font-light text-accent/10 select-none shrink-0 mt-1" style={{ fontSize: '3rem', lineHeight: 1 }}>04</span>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      <AnimatedSection className="mt-10 flex justify-center">
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
