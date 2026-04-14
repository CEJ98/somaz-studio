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
        heading: 'Algo salió mal.',
        body: 'Ocurrió un error inesperado. Intenta de nuevo o escríbenos a hola@somazstudio.com.',
        button: 'Reintentar',
        home: 'Volver al inicio',
      }
    : {
        heading: 'Something went wrong.',
        body: 'An unexpected error occurred. Try again or write to us at hola@somazstudio.com.',
        button: 'Try again',
        home: 'Back to home',
      }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">Error</p>
      <h1
        className="font-serif font-semibold text-foreground mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        {t.heading}
      </h1>
      <p className="font-sans font-light text-foreground/50 mb-10 max-w-md">
        {t.body}
      </p>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300"
        >
          {t.button}
        </button>
        <Link
          href="/"
          className="font-sans text-xs tracking-widest uppercase text-foreground/50 hover:text-accent transition-colors duration-300"
        >
          {t.home}
        </Link>
      </div>
    </div>
  )
}
