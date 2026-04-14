'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from '@/i18n/navigation'
import { Icon } from '@/components/icons'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full border border-border/40 bg-surface/80 backdrop-blur flex items-center justify-center hover:border-accent transition-colors duration-300"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduced ? undefined : { scale: 1.08 }}
        >
          <Icon name="north" size={18} className="text-foreground/60" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}