'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/icons'
import { trackCtaClick } from '@/components/Analytics'

export default function StickyCta() {
  const t = useTranslations('home')
  const locale = useLocale()
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const dismissedKey = sessionStorage.getItem('somaz-sticky-dismissed')
    if (dismissedKey === '1') {
      setDismissed(true)
      return
    }
    const onScroll = () => {
      const scrolled = window.scrollY
      const threshold = window.innerHeight * 0.8
      const nearBottom = window.innerHeight + scrolled >= document.body.scrollHeight - 600
      setVisible(scrolled > threshold && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed) return null

  const label = locale === 'es' ? 'Iniciar proyecto' : 'Start a project'
  const dismiss = locale === 'es' ? 'Cerrar' : 'Dismiss'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-40 hidden md:flex items-center gap-2"
        >
          <Link
            href="/contact"
            onClick={() => trackCtaClick('sticky', 'start_project')}
            className="inline-flex items-center gap-3 bg-accent text-background px-6 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase shadow-lg hover:bg-accent/90 transition-colors duration-300"
          >
            {label}
            <Icon name="north_east" size={14} />
          </Link>
          <button
            onClick={() => {
              sessionStorage.setItem('somaz-sticky-dismissed', '1')
              setDismissed(true)
            }}
            aria-label={dismiss}
            className="bg-foreground/80 text-background w-9 h-9 inline-flex items-center justify-center hover:bg-foreground transition-colors duration-300"
          >
            <Icon name="close" size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
