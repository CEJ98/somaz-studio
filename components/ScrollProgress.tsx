'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        setProgress(pct)
        setVisible(scrollTop > 100)
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (reduced) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-accent/20 origin-left"
      style={{ width: `${progress}%`, opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    />
  )
}
