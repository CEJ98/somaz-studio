'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">Error</p>
      <h1
        className="font-serif font-semibold text-foreground mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        Something went wrong.
      </h1>
      <p className="font-sans font-light text-foreground/40 mb-10 max-w-md">
        An unexpected error occurred. Please try again or contact us at hola@somazstudio.com.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-3 border border-foreground/25 text-foreground px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  )
}
