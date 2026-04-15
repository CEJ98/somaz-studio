'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isEs] = useState(() => {
    if (typeof window === 'undefined') return false
    const path = window.location.pathname
    return path.startsWith('/es') || (!path.startsWith('/en') && !!navigator.language?.startsWith('es'))
  })

  const t = isEs
    ? {
        label: 'Error inesperado',
        heading1: 'Algo salió',
        heading2: 'mal.',
        body: 'Ocurrió un error inesperado. Intenta de nuevo o escríbenos a hola@somazstudio.com.',
        button: 'Reintentar',
        home: 'Volver al inicio',
      }
    : {
        label: 'Unexpected error',
        heading1: 'Something went',
        heading2: 'wrong.',
        body: 'An unexpected error occurred. Try again or write to us at hola@somazstudio.com.',
        button: 'Try again',
        home: 'Back to home',
      }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
        >
          !
        </span>
      </div>

      <div className="relative z-10">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
          {t.label}
        </p>

        <h1
          className="font-serif font-light text-foreground mb-6 leading-[0.9]"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
        >
          <span className="block italic text-foreground/60">{t.heading1}</span>
          <span className="block font-semibold">{t.heading2}</span>
        </h1>

        <div className="architectural-line max-w-xs mx-auto mb-8" />

        <p className="font-sans font-light text-foreground/35 mb-12 max-w-sm leading-relaxed">
          {t.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
          >
            {t.button}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-accent text-background px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  )
}
