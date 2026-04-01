'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: '/work', label: t('work') },
    { href: '/services', label: t('services') },
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('notes') },
    { href: '/contact', label: t('contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Escape key + focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab' || !mobileMenuRef.current) return
      const focusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>('a, button')
      ).filter((el) => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function toggleLocale() {
    router.replace(pathname, { locale: locale === 'en' ? 'es' : 'en' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || menuOpen
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-18 md:h-22 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos/logo-white.png"
            alt="Somaz Studio"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative font-sans text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-accent/40" />
                  )}
                </Link>
              </li>
            )
          })}
          <li>
            <button
              onClick={toggleLocale}
              className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/40 hover:text-accent transition-colors duration-300"
              aria-label="Switch language"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>
          </li>
          <li>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/70 hover:border-accent hover:text-accent px-5 py-2 font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300"
            >
              {t('startProject')}
              <Icon name="north_east" size={14} />
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={t('toggleMenu')}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2.5' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-8 gap-6">
          {links.map(({ href, label }, i) => (
            <motion.li
              key={href}
              initial={{ opacity: 0, x: -16 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: ease }}
            >
              <Link
                href={href}
                className={`font-sans text-xs tracking-[0.25em] uppercase ${
                  pathname === href ? 'text-accent' : 'text-foreground/60'
                }`}
              >
                {label}
              </Link>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.3, delay: links.length * 0.06, ease: ease }}
          >
            <button
              onClick={toggleLocale}
              className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/40 hover:text-accent transition-colors duration-300"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.3, delay: (links.length + 1) * 0.06, ease: ease }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/70 px-5 py-2.5 font-sans text-xs tracking-[0.25em] uppercase"
            >
              {t('startProject')}
            </Link>
          </motion.li>
        </ul>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent/60 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  )
}
