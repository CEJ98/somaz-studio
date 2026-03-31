'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { href: '/services#3d-visualization', label: '3D Visualization' },
  { href: '/services#interior-design', label: 'Interior Design' },
  { href: '/services#conceptual-design', label: 'Conceptual Design' },
  { href: '/services#design-consulting', label: 'Consulting' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0, ease }}
          >
            <Image
              src="/logos/logo-white.png"
              alt="Somaz Studio"
              width={170}
              height={40}
              className="h-10 w-auto object-contain mb-3"
              style={{ mixBlendMode: 'screen' }}
            />
            <p className="font-sans text-sm font-light text-foreground/35 leading-relaxed mb-6">
              3D visualization and interior design for the spaces that define culture.
            </p>
            <a
              href="mailto:hola@somazstudio.com"
              className="font-sans text-xs text-foreground/35 hover:text-accent transition-colors duration-300 inline-block"
            >
              hola@somazstudio.com
            </a>
            <p className="font-sans text-xs text-foreground/20 mt-1">Miami, FL — Global</p>
          </motion.div>

          {/* Col 2 — Navigate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/25 mb-6">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-block font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300 relative"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/25 mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-block font-sans text-sm text-foreground/55 hover:text-foreground transition-colors duration-300 relative"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/25 mb-6">
              Newsletter
            </p>
            <p className="font-sans text-sm font-light text-foreground/40 leading-relaxed mb-5">
              Studio updates, project reveals, and design thinking — straight to your inbox.
            </p>
            {subscribed ? (
              <p className="font-sans text-xs text-accent tracking-wide">
                ✓ You&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-2 focus:outline-none focus:border-accent transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="self-start font-sans text-[10px] tracking-[0.25em] uppercase text-accent hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-2"
                >
                  Subscribe
                  <span className="material-symbols-outlined group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontSize: '12px' }}>north_east</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <div className="architectural-line mt-16 mb-8" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-sans text-[10px] tracking-[0.2em] text-foreground/20">
              © {new Date().getFullYear()} Somaz Studio LLC. Miami, FL.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/somazstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/20 hover:text-accent transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/somazstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/20 hover:text-accent transition-colors duration-300"
              >
                LinkedIn
              </a>
              <Link
                href="/privacy"
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/20 hover:text-accent transition-colors duration-300"
              >
                Privacy
              </Link>
              <p className="font-sans text-[10px] text-foreground/15 italic">
                Not a licensed architecture firm.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
