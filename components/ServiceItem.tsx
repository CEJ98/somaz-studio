'use client'

import { Link } from '@/i18n/navigation'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import type { Service } from '@/data/services'
import { Icon } from '@/components/icons'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'
import Image from 'next/image'
import { pickBySlug } from '@/data/imageLibrary'
import { trackEvent } from '@/components/Analytics'

const slugToProjectType: Record<string, string> = {
  architecture: 'architecture',
  '3d-visualization': '3d-visualization',
  'interior-design': 'interior-design',
  'conceptual-design': 'conceptual-design',
  'design-consulting': 'consulting',
}

const SERVICE_LIBRARY_IMAGES: Record<string, string> = {
  architecture: 'exterior-modern-01',
  '3d-visualization':  'exterior-modern-02',
  'interior-design':   'interior-living-luxury-01',
  'conceptual-design': 'interior-luxury-02',
  'design-consulting': 'lifestyle-studio-02',
}

const serviceIcons: Record<string, React.ReactNode> = {
  architecture: (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent/60" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 16.5h15" />
      <path d="M4.5 16.5V9l5.5-5 5.5 5v7.5" />
      <path d="M7.5 16.5v-3.5h5v3.5" />
    </svg>
  ),
  '3d-visualization': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent/60" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="10,2 18,6 18,14 10,18 2,14 2,6" />
      <line x1="10" y1="2" x2="10" y2="18" />
      <line x1="2" y1="6" x2="18" y2="6" />
      <line x1="2" y1="14" x2="10" y2="10" />
      <line x1="18" y1="14" x2="10" y2="10" />
      <line x1="2" y1="6" x2="10" y2="10" />
      <line x1="18" y1="6" x2="10" y2="10" />
    </svg>
  ),
  'interior-design': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent/60" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17 Q3 9 10 5 Q17 9 17 17" />
      <line x1="3" y1="17" x2="17" y2="17" />
    </svg>
  ),
  'conceptual-design': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent/60" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="4.5" />
      <line x1="10" y1="12.5" x2="10" y2="17" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </svg>
  ),
  'design-consulting': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent/60" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="16" height="11" rx="2" />
      <path d="M7 14 L5 18" />
      <path d="M13 14 L15 18" />
    </svg>
  ),
}

export default function ServiceItem({ service, locale }: { service: Service; locale: string }) {
  const ts = useTranslations('services')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const libImg = pickBySlug(SERVICE_LIBRARY_IMAGES[service.slug] ?? '')

  return (
    <m.div
      id={service.slug}
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease }}
      className="border-t border-border/40 pt-14 pb-20 group relative overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        {/* Left — service info */}
        <div className="md:col-span-5 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/65 group-hover:text-accent transition-colors duration-300">
              {service.number}
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            {serviceIcons[service.slug] ?? null}
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent">
              {tl(service.tagline, locale)}
            </p>
          </div>

          <div className="relative inline-block mb-8">
            <h2 className="font-serif font-light text-foreground" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}>
              {tl(service.title, locale)}
            </h2>
            <span className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-500 w-0 group-hover:w-full" />
          </div>

          <p className="font-sans font-light text-foreground/70 leading-relaxed mb-8">
            {tl(service.description, locale)}
          </p>

          <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-foreground/55 mb-3">
            {locale === 'es' ? 'Ideal para' : 'Ideal for'}
          </p>
          <p className="font-sans text-[16px] leading-relaxed text-foreground/75 mb-8">
            {tl(service.idealFor, locale)}
          </p>

          <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-foreground/55 mb-3">
            {locale === 'es' ? 'Entregables clave' : 'Key deliverables'}
          </p>
          <div className="space-y-2 mb-8">
            {service.deliverables.map((item) => (
              <p key={item.en} className="font-sans text-[14px] leading-relaxed text-foreground/70">
                {tl(item, locale)}
              </p>
            ))}
          </div>

          <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-foreground/55 mb-3">
            {locale === 'es' ? 'Modelo de entrega' : 'Delivery model'}
          </p>
          <p className="font-sans text-[14px] leading-relaxed text-foreground/70">
            {tl(service.deliveryModel, locale)}
          </p>

        </div>

        {/* Right — image + CTA */}
        <div className="md:col-span-6 md:col-start-7 relative z-10">
          {libImg && (
            <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden">
              <Image
                src={libImg.src}
                alt={libImg.alt}
                fill
                placeholder="blur"
                blurDataURL={libImg.blurDataURL}
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          )}
          <div className="flex flex-col items-start gap-4">
            <Link
              href={`/contact?type=${slugToProjectType[service.slug] ?? 'other'}`}
              onClick={() => trackEvent('service_interest', { service: service.slug, entrypoint: 'services_page_cta' })}
              className="inline-flex min-h-12 items-center gap-3 bg-accent text-background px-8 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase hover:bg-accent/90 transition-all duration-300"
            >
              {ts('startProject')}
              <Icon name="north_east" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </m.div>
  )
}
