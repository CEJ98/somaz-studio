'use client'

import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({ children, strength = 0.4, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return

    function handleMouseMove(e: MouseEvent) {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }

    function handleMouseLeave() {
      if (el) el.style.transform = ''
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, reduced])

  return (
    <div ref={ref} className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>
      {children}
    </div>
  )
}
