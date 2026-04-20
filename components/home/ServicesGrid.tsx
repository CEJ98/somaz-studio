'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { services } from '@/data/services'
import { Icon } from '@/components/icons'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'
import { pickBySlug } from '@/data/imageLibrary'
import AnimatedSection from '@/components/AnimatedSection'

interface Props {
  locale: string
}

// Map each service slug → library image slug
const SERVICE_IMAGES: Record<string, string> = {
  '3d-visualization':  'exterior-modern-01',
  'interior-design':   'interior-living-luxury-01',
  'conceptual-design': 'interior-luxury-01',
  'design-consulting': 'lifestyle-studio-01',
}

export default function ServicesGrid({ locale }: Props) {
  const t = useTranslations('home')
  const reduced = useReducedMotion()

  return (
    <section className="border-t border-border/50 px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-16">
          <AnimatedSection className="md:col-span-5">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{t('ourApproach')}</p>
            <blockquote
              className="font-serif italic text-foreground/70 leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
            >
              {t('designQuote')}
            </blockquote>
          </AnimatedSection>
          <AnimatedSection className="md:col-span-6 md:col-start-7" delay={0.15}>
            <p className="font-sans font-light text-foreground/65 leading-relaxed">
              {t('approachParagraph')}
            </p>
          </AnimatedSection>
        </div>

        <div className="architectural-line mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20">
          {services.map((s, i) => {
            const imgData = pickBySlug(SERVICE_IMAGES[s.slug] ?? '')
            return (
              <motion.div
                key={s.number}
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="relative bg-background p-8 md:p-10 group border border-transparent hover:border-border/40 transition-colors duration-500 overflow-hidden"
              >
                {/* Background image reveal on hover */}
                {imgData && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Image
                      src={imgData.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={imgData.blurDataURL}
                      className="object-cover scale-105 group-hover:scale-100 opacity-0 group-hover:opacity-[0.18] transition-all duration-700"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                )}

                <Link href={`/services#${s.slug}`} className="relative block h-full z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-sans text-[10px] text-foreground/40 tracking-widest">{s.number}</span>
                    <Icon name="north_east" size={16} className="text-foreground/30 group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 group-hover:text-accent/90 transition-colors duration-300">
                    {tl(s.title, locale)}
                  </h3>
                  <p className="font-sans text-sm font-light italic text-foreground/60 mb-4">
                    {tl(s.tagline, locale)}
                  </p>
                  <p className="font-sans text-sm text-foreground/55 leading-relaxed">
                    {tl(s.description, locale)}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <AnimatedSection className="mt-10 flex justify-center" delay={0.3}>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 border border-foreground/30 text-foreground/65 hover:border-accent hover:text-accent px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          >
            {t('exploreServices')}
            <Icon name="north_east" size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
