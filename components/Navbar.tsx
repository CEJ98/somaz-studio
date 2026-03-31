'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const links = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || menuOpen
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos/logo-white.png"
            alt="Somaz Studio"
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
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
                  className={`relative font-sans text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${
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
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/70 hover:border-accent hover:text-accent px-5 py-2 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            >
              Start a Project
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>north_east</span>
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
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
        className={`md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
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
                className={`font-sans text-[10px] tracking-[0.25em] uppercase ${
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
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/70 px-5 py-2.5 font-sans text-[10px] tracking-[0.25em] uppercase"
            >
              Start a Project
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
