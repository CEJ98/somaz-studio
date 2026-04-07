'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

const CONSENT_KEY = 'somaz_cookie_consent'

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONSENT_KEY) === 'accepted'
}

export default function CookieConsent({ onAccept }: { onAccept?: () => void }) {
  const t = useTranslations('cookie')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hasConsent()) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
    onAccept?.()
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-[90] bg-surface border border-border/60 px-6 py-5 backdrop-blur-sm"
          role="dialog"
          aria-live="polite"
          aria-label={t('ariaLabel')}
        >
          <p className="font-sans text-xs text-foreground/70 leading-relaxed mb-5">
            {t('message')}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={accept}
              className="font-sans text-[10px] tracking-[0.2em] uppercase bg-accent text-background px-5 py-2 hover:bg-accent/90 transition-colors duration-300"
            >
              {t('accept')}
            </button>
            <button
              onClick={decline}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors duration-300"
            >
              {t('decline')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
