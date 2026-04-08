'use client'

function useIsSpanish() {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname
  return path.startsWith('/es') || (!path.startsWith('/en') && !!navigator.language?.startsWith('es'))
}

const copy = {
  en: {
    heading: 'Something went wrong.',
    body: 'An unexpected error occurred. Try again or write to us at hola@somazstudio.com.',
    button: 'Try again',
  },
  es: {
    heading: 'Algo salió mal.',
    body: 'Ocurrió un error inesperado. Intenta de nuevo o escríbenos a hola@somazstudio.com.',
    button: 'Reintentar',
  },
}

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isEs = useIsSpanish()
  const t = isEs ? copy.es : copy.en

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">Error</p>
      <h1
        className="font-serif font-semibold text-foreground mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        {t.heading}
      </h1>
      <p className="font-sans font-light text-foreground/40 mb-10 max-w-md">
        {t.body}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300"
      >
        {t.button}
      </button>
    </div>
  )
}
