'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, useReducedMotion, animate, motion } from 'framer-motion'

interface Props {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      motionValue.set(value)
      return
    }
    const controls = animate(motionValue, value, { duration, ease: 'easeOut' })
    return () => controls.stop()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, value, duration, prefersReducedMotion])

  return (
    <span
      ref={ref}
      className="font-serif font-light text-accent leading-none"
      style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
