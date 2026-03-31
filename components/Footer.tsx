'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

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
      toast.error('Could not subscribe. Please try again or email us at hola@somazstudio.com')
    }
  }

  return (
    <footer className="bg-surface">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logos/logo-white.png"
              alt="Somaz Studio"
              width={130}
              height={40}
              className="h-9 w-auto object-contain mb-3"
              style={{ mixBlendMode: 'screen' }}
            />
            <p className="font-sans text-sm font-light text-foreground/40 leading-relaxed mb-4">
              3D visualization and interior design for the spaces that define culture.
            </p>
            <a
              href="mailto:hola@somazstudio.com"
              className="font-sans text-xs text-foreground/40 hover:text-accent transition-colors duration-300 inline-block"
            >
              hola@somazstudio.com
            </a>
            <p className="font-sans text-xs text-foreground/25 mt-1">Miami, FL — Global</p>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/40 mb-6">
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                { href: '/work', label: 'Work' },
                { href: '/services', label: 'Services' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/40 mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {[
                { href: '/services#3d-visualization', label: '3D Visualization' },
                { href: '/services#interior-design', label: 'Interior Design' },
                { href: '/services#conceptual-design', label: 'Conceptual Design' },
                { href: '/services#design-consulting', label: 'Consulting' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/40 mb-6">
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
                  className="self-start font-sans text-xs tracking-widest uppercase text-accent hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-2"
                >
                  Subscribe
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-xs text-foreground/25">
            © {new Date().getFullYear()} Somaz Studio LLC. Miami, FL.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/somazstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-foreground/25 hover:text-foreground/70 transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/somazstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-foreground/25 hover:text-foreground/70 transition-colors duration-300"
            >
              LinkedIn
            </a>
            <p className="font-sans text-xs text-foreground/25 italic">
              Not a licensed architecture firm.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
