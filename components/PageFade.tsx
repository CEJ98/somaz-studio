'use client'

import { m, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

export default function PageFade({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <m.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: ease }}
      className={className}
    >
      {children}
    </m.div>
  )
}
