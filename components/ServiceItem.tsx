'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Service } from '@/data/services'

const ease = [0.22, 1, 0.36, 1] as const

const serviceIcons: Record<string, React.JSX.Element> = {
  '3d-visualization': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
      <path d="M3 17 Q3 9 10 5 Q17 9 17 17" />
      <line x1="3" y1="17" x2="17" y2="17" />
    </svg>
  ),
  'conceptual-design': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
      <circle cx="10" cy="8" r="4.5" />
      <line x1="10" y1="12.5" x2="10" y2="17" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </svg>
  ),
  'design-consulting': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
      <rect x="2" y="3" width="16" height="11" rx="2" />
      <path d="M7 14 L5 18" />
      <path d="M13 14 L15 18" />
    </svg>
  ),
}

export default function ServiceItem({ service }: { service: Service }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: ease }}
      className="border-t border-border pt-12 pb-16 group relative"
    >
      {/* Ghost number */}
      <span
        className="absolute right-0 top-8 font-serif font-semibold text-foreground select-none pointer-events-none opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500"
        style={{ fontSize: '8rem', lineHeight: 1 }}
        aria-hidden="true"
      >
        {service.number}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* Left */}
        <div>
          <div className="flex items-start gap-6 mb-6">
            <span className="font-sans text-sm text-foreground/30 font-medium tracking-wider mt-1 group-hover:text-accent transition-colors duration-300">
              {service.number}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-2">
                {serviceIcons[service.slug] ?? null}
                <p className="font-sans text-xs tracking-widest uppercase text-accent">
                  {service.tagline}
                </p>
              </div>
              <div className="relative inline-block">
                <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                  {service.title}
                </h2>
                <span className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-500 w-0 group-hover:w-full" />
              </div>
            </div>
          </div>
          <p className="font-sans font-light text-foreground/60 text-lg leading-relaxed ml-12 md:ml-14">
            {service.description}
          </p>
          <div className="ml-12 md:ml-14 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 group"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Right — packages */}
        <div className="space-y-4">
          {service.packages.map((pkg, i) => (
            <div
              key={i}
              className="flex items-start justify-between py-4 border-b border-border/50 border-l-2 border-l-transparent hover:border-l-accent hover:bg-surface/50 pl-4 -ml-4 hover:border-b-accent/30 transition-all duration-300 group"
            >
              <div>
                <p className="font-sans font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {pkg.name}
                </p>
                {pkg.description && (
                  <p className="font-sans text-sm text-foreground/40 mt-0.5">{pkg.description}</p>
                )}
              </div>
              <p className="font-sans text-sm text-accent font-medium ml-4 shrink-0">{pkg.price}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
