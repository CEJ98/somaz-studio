'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

export default function PageFade({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
