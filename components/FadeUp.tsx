'use client'

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  margin?: string
  className?: string
  clipPath?: boolean
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  once = true,
  margin = '-60px',
  className,
  clipPath = false,
}: FadeUpProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin })
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  if (clipPath) {
    return (
      <div ref={ref} className={className}>
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
          transition={{ duration, delay, ease }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  )
}
