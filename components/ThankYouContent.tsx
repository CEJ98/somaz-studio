'use client'

import { Link } from '@/i18n/navigation'
import { m } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/icons'
import { ease } from '@/lib/motion'

export default function ThankYouContent() {
  const t = useTranslations('thankyou')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Ghost background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="ghost-text font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(8rem, 22vw, 20rem)' }}
        >
          ✓
        </span>
      </div>

      <div className="relative z-10">
        <m.p
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {t('sent')}
        </m.p>

        <m.h1
          className="font-serif font-light text-foreground mb-6 leading-[0.9]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <span className="block italic text-foreground/60">{t('headline1')}</span>
          <span className="block font-semibold">{t('headline2')}</span>
        </m.h1>

        <m.div
          className="architectural-line max-w-xs mx-auto mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          style={{ transformOrigin: 'left' }}
        />

        <m.p
          className="font-sans font-light text-foreground/70 mb-3 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          {t('body')}
        </m.p>

        <m.p
          className="font-sans text-sm text-foreground/55 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          {t('orReachUs')}{' '}
          <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">
            hola@somazstudio.com
          </a>
        </m.p>

        <m.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 group"
          >
            {t('viewWork')}
            <Icon name="north_east" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="https://wa.me/17865377682"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-background px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 transition-all duration-300 group"
          >
            {t('whatsapp')}
            <Icon name="chat" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </m.div>
      </div>
    </div>
  )
}
