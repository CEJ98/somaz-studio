'use client'

import { m } from 'framer-motion'
import { ease } from '@/lib/motion'

export default function PageFade({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: ease }}
      className={className}
    >
      {children}
    </m.div>
  )
}
