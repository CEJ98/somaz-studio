'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Ghost background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(8rem, 22vw, 20rem)' }}
        >
          ✓
        </span>
      </div>

      <div className="relative z-10">
        <motion.p
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Message Sent
        </motion.p>

        <motion.h1
          className="font-serif font-light text-foreground mb-6 leading-[0.9]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <span className="block italic text-foreground/60">We&apos;ll be</span>
          <span className="block font-semibold">in touch.</span>
        </motion.h1>

        <motion.div
          className="architectural-line max-w-xs mx-auto mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.p
          className="font-sans font-light text-foreground/40 mb-3 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          We&apos;ve received your message and will get back to you within 24–48 hours.
        </motion.p>

        <motion.p
          className="font-sans text-sm text-foreground/25 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          Or reach us at{' '}
          <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">
            hola@somazstudio.com
          </a>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 group"
          >
            View Our Work
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontSize: '14px' }}>north_east</span>
          </Link>
          <a
            href="https://wa.me/17865377682"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300 group"
          >
            WhatsApp Us
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontSize: '14px' }}>chat</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
