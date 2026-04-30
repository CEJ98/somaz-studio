'use client'

import Image from 'next/image'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ease } from '@/lib/motion'

export default function Footer() {
  const tf = useTranslations('footer')
  const tn = useTranslations('nav')
  const tform = useTranslations('form')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  const navLinks = [
    { href: '/work', label: tn('work') },
    { href: '/services', label: tn('services') },
    { href: '/about', label: tn('about') },
    { href: '/contact', label: tn('contact') },
  ]

  const serviceLinks = [
    { href: '/services/architecture', label: tform('optArchitecture') },
    { href: '/services#3d-visualization', label: tform('opt3dViz') },
    { href: '/services#interior-design', label: tform('optInterior') },
    { href: '/services#conceptual-design', label: tform('optConceptual') },
    { href: '/services#design-consulting', label: tform('optConsulting') },
  ]

  return (
    <footer className="bg-surface relative overflow-hidden">
      {/* Ghost text background */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 16rem)' }}
        >
          SOMAZ
        </span>
      </div>

      <div className="architectural-line" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <m.div
            className="md:col-span-1"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0, ease }}
          >
            <Image
              src="/logos/logo-smz.png"
              alt="Somaz Studio"
              width={170}
              height={40}
              className="h-10 w-auto object-contain mb-3"
            />
            <p className="font-sans text-[16px] text-foreground/65 leading-relaxed mb-6">
              {tf('tagline')}
            </p>
            <a
              href="mailto:hola@somazstudio.com"
              className="font-sans text-xs text-foreground/65 hover:text-accent transition-colors duration-300 inline-block"
            >
              hola@somazstudio.com
            </a>
            <a
              href="https://wa.me/17865377682"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-foreground/65 hover:text-accent transition-colors duration-300 block mt-1"
            >
              +1 786 537 7682
            </a>
            <p className="font-sans text-xs text-foreground/50 mt-1">{tf('location')}</p>
          </m.div>

          {/* Col 2 — Navigate */}
          <m.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-foreground/55 mb-6">
              {tf('navigate')}
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-block font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300 relative"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Col 3 — Services */}
          <m.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-foreground/55 mb-6">
              {tf('services')}
            </p>
            <ul className="space-y-3">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-block font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300 relative"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

        </div>

        {/* Bottom bar */}
        <m.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView || reduced ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <div className="architectural-line mt-16 mb-8" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-sans text-[10px] tracking-[0.2em] text-foreground/50">
              © {new Date().getFullYear()} {tf('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/somazstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-accent transition-colors duration-300"
              >
                {tf('instagram')}
              </a>
              <a
                href="https://linkedin.com/company/somazstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-accent transition-colors duration-300"
              >
                {tf('linkedin')}
              </a>
              <a
                href="https://tiktok.com/@somazstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-accent transition-colors duration-300"
              >
                TikTok
              </a>
              <Link
                href="/privacy"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-accent transition-colors duration-300"
              >
                {tf('privacy')}
              </Link>
              <Link
                href="/terms"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-accent transition-colors duration-300"
              >
                {tf('terms')}
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </footer>
  )
}
