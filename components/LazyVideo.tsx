'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  webmSrc?: string
  className?: string
  poster?: string
}

export default function LazyVideo({ src, webmSrc, className, poster }: LazyVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="w-full h-full">
      {visible && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className={className}
          aria-hidden="true"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
