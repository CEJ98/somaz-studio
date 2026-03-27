'use client'

import Link from 'next/link'
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

const letters = ['S', 'O', 'M', 'A', 'Z']

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-[0.3em] text-foreground hover:text-accent transition-colors duration-300 flex"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              animate={logoHovered ? { y: -3 } : { y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: ease }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative font-sans text-sm tracking-widest uppercase font-medium transition-colors duration-300 group inline-flex items-center gap-1.5 ${
                    isActive ? 'text-accent' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
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
        className={`md:hidden bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-6 gap-6">
          {links.map(({ href, label }, i) => (
            <motion.li
              key={href}
              initial={{ opacity: 0, x: -16 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: ease }}
            >
              <Link
                href={href}
                className={`font-sans text-sm tracking-widest uppercase font-medium ${
                  pathname === href ? 'text-accent' : 'text-foreground/70'
                }`}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  )
}
