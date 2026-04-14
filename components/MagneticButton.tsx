'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({ children, strength = 0.4, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isPointerFine, setIsPointerFine] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    setIsPointerFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  if (!isPointerFine || reduced) {
    return <div className={className}>{children}</div>
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
