'use client'

import { useRef, useEffect, useState } from 'react'
import { m, useInView, useReducedMotion, type Variants } from 'framer-motion'

export function useReducedMotionOption() {
  return useReducedMotion()
}

export function useFadeUpVariants(delay = 0) {
  const reduced = useReducedMotion()
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  } as const
}

export function useTextRevealVariants(delay = 0) {
  const reduced = useReducedMotion()
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  } as const
}

export function useClipRevealVariants(delay = 0) {
  const reduced = useReducedMotion()
  return {
    hidden: reduced ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 100% 0)' },
    visible: { clipPath: 'inset(0 0 0% 0)' },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  } as const
}

export function useParallaxValue(scrollY: number, speed = 0.3) {
  return scrollY * speed
}

export function useStaggerContainerVariants() {
  const reduced = useReducedMotion()
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.1,
        delayChildren: reduced ? 0 : 0.2,
      },
    },
  } as const
}

export function useStaggerItemVariants() {
  const reduced = useReducedMotion()
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  } as const
}
