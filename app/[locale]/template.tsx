'use client'

import { m, useReducedMotion } from 'framer-motion'
import { usePathname } from '@/i18n/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const pathname = usePathname()
  return (
    <m.div
      key={pathname}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}