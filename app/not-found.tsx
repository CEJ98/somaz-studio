'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Ghost 404 background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
        >
          404
        </span>
      </div>

      <div className="relative z-10">
        <motion.p
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Page not found
        </motion.p>

        <motion.h1
          className="font-serif font-light text-foreground mb-6 leading-[0.9]"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <span className="block italic text-foreground/60">Nothing here</span>
          <span className="block font-semibold">but space.</span>
        </motion.h1>

        <motion.div
          className="architectural-line max-w-xs mx-auto mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.p
          className="font-sans font-light text-foreground/35 mb-12 max-w-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          The page you&apos;re looking for doesn&apos;t exist. Let us help you find your way.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 group"
          >
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-0.5" style={{ fontSize: '14px' }}>arrow_back</span>
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300 group"
          >
            Start a Project
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontSize: '14px' }}>north_east</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
