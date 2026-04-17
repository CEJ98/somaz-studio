'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'

export default function Footer() {
  const tf = useTranslations('footer')
  const tn = useTranslations('nav')
  const tform = useTranslations('form')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    { href: '/services#3d-visualization', label: tform('opt3dViz') },
    { href: '/services#interior-design', label: tform('optInterior') },
    { href: '/services#conceptual-design', label: tform('optConceptual') },
    { href: '/services#design-consulting', label: tform('optConsulting') },
  ]

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || isLoading) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok || res.status === 409) {
        setSubscribed(true)
        setEmail('')
      }
    } catch {
      window.location.href = `mailto:hola@somazstudio.com?subject=Newsletter&body=I'd like to subscribe: ${encodeURIComponent(email)}`
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="bg-surface relative overflow-hidden">
      {/* Ghost text background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 16rem)' }}
        >
          SOMAZ
        </span>
      </div>

      <div className="architectural-line" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <motion.div
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
            <p className="font-sans text-sm font-light text-foreground/65 leading-relaxed mb-6">
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
              className="font-sans text-xs text-foreground/65 hover:text-accent transition-colors duration-300 inline-block mt-1"
            >
              +1 786 537 7682
            </a>
            <p className="font-sans text-xs text-foreground/50 mt-1">{tf('location')}</p>
          </motion.div>

          {/* Col 2 — Navigate */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/55 mb-6">
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
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/55 mb-6">
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
          </motion.div>

          {/* Col 4 — Newsletter */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/55 mb-6">
              {tf('newsletter')}
            </p>
            <p className="font-sans text-sm font-light text-foreground/65 leading-relaxed mb-5">
              {tf('newsletterCopy')}
            </p>
            {subscribed ? (
              <p className="font-sans text-xs text-accent tracking-wide">
                ✓ {tf('subscribed')}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tf('emailPlaceholder')}
                  aria-label={tf('emailPlaceholder')}
                  required
                  className="w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-2 focus:outline-none focus:border-accent transition-colors duration-300"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="self-start font-sans text-[10px] tracking-[0.25em] uppercase text-accent hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="inline-flex gap-1">
                      <span className="animate-pulse">.</span>
                      <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                      <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                    </span>
                  ) : (
                    <>
                      {tf('subscribe')}
                      <Icon name="north_east" size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
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
              <p className="font-sans text-[10px] text-foreground/55 italic">
                {tf('disclaimer')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
