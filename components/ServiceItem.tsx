'use client'

import { Link } from '@/i18n/navigation'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import type { Service } from '@/data/services'
import { Icon } from '@/components/icons'
import { t as tl } from '@/lib/locale'
import { ease } from '@/lib/motion'
import Image from 'next/image'
import PricingTable from '@/components/PricingTable'

const serviceImages: Record<string, string> = {
  '3d-visualization': '/services/3d-visualization.jpg',
  'interior-design': '/services/interior-design.jpg',
  'conceptual-design': '/services/conceptual-design.jpg',
  'design-consulting': '/services/consulting.jpg',
}

const serviceIcons: Record<string, React.ReactNode> = {
  '3d-visualization': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17 Q3 9 10 5 Q17 9 17 17" />
      <line x1="3" y1="17" x2="17" y2="17" />
    </svg>
  ),
  'conceptual-design': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="4.5" />
      <line x1="10" y1="12.5" x2="10" y2="17" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </svg>
  ),
  'design-consulting': (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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

  return (
    <motion.div
      id={service.slug}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/60 hover:text-accent border-b border-foreground/30 pb-0.5 hover:border-accent transition-all duration-300"
          >
            {ts('startProject')}
            <Icon name="north_east" size={14} />
          </Link>
        </div>

        {/* Right — image + packages */}
        <div className="md:col-span-6 md:col-start-7 relative z-10">
          {serviceImages[service.slug] && (
            <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden">
              <Image
                src={serviceImages[service.slug]}
                alt={tl(service.title, locale)}
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          )}
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/50 mb-4">{ts('packages')}</p>
          <PricingTable packages={service.packages} locale={locale} />
          <Link
            href="/contact?type=consult"
            className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] tracking-[0.25em] uppercase text-accent/80 hover:text-accent border-b border-accent/30 pb-0.5 hover:border-accent transition-all duration-300"
          >
            {ts('freeConsult')}
            <Icon name="north_east" size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
