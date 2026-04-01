'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/icons'

type Status = 'idle' | 'loading'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FloatingSelect({
  id,
  name,
  label,
  required,
  children,
}: {
  id: string
  name: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-0 font-sans tracking-widest uppercase transition-all duration-200 pointer-events-none ${
          hasValue ? '-top-0 text-accent text-[10px]' : 'top-7 text-foreground/25 text-xs'
        }`}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        aria-label={label}
        defaultValue=""
        onChange={(e) => setHasValue(e.target.value !== '')}
        className="w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-3 focus:outline-none focus:border-accent transition-colors duration-300 appearance-none"
      >
        <option value="" disabled />
        {children}
      </select>
    </div>
  )
}

function FloatingInput({
  id,
  name,
  label,
  type = 'text',
  required,
}: {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const active = focused || hasValue

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-0 font-sans tracking-widest uppercase transition-all duration-200 pointer-events-none ${
          active ? '-top-0 text-accent text-[10px]' : 'top-7 text-foreground/25 text-xs'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-label={label}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        className="w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-3 focus:outline-none focus:border-accent transition-colors duration-300"
      />
      {hasValue && !focused && (
        <span className="absolute right-0 top-7 text-accent text-xs">✓</span>
      )}
    </div>
  )
}

export default function ContactForm() {
  const router = useRouter()
  const tf = useTranslations('form')
  const [status, setStatus] = useState<Status>('idle')
  const [msgLen, setMsgLen] = useState(0)
  const [emailError, setEmailError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    if (!EMAIL_RE.test(email)) {
      setEmailError(tf('emailError'))
      return
    }
    setEmailError('')
    setStatus('loading')
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        router.push('/contact/thank-you')
        return
      } else {
        toast.error(tf('errorToast'))
      }
    } catch {
      toast.error(tf('errorToast'))
    }
    setStatus('idle')
  }

  const inputClass =
    'w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-3 focus:outline-none focus:border-accent transition-colors duration-300'
  const labelClass = 'font-sans text-xs tracking-widest uppercase text-foreground/40 mb-2 block'

  return (
    <div className="relative">
      {/* Marquee header */}
      <div className="overflow-hidden border-b border-border/40 mb-12 -mx-6 md:-mx-10">
        <div className="marquee-track py-3">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/25 shrink-0 px-4"
            >
              {tf('marquee')}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput id="name" name="name" label={tf('name')} required />
          <div>
            <FloatingInput id="email" name="email" label={tf('email')} type="email" required />
            <div aria-live="polite">
              {emailError && (
                <p className="font-sans text-[10px] text-red-400 mt-1">{emailError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Phone + Project Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput id="phone" name="phone" label={tf('phone')} type="tel" />
          <FloatingInput id="sqft" name="sqft" label={tf('sqft')} />
        </div>

        {/* Row 3: Project Type + Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingSelect id="project_type" name="project_type" label={tf('projectType')} required>
            <option value="3d-visualization">{tf('opt3dViz')}</option>
            <option value="interior-design">{tf('optInterior')}</option>
            <option value="conceptual-design">{tf('optConceptual')}</option>
            <option value="consulting">{tf('optConsulting')}</option>
            <option value="full-studio-partnership">{tf('optPartnership')}</option>
            <option value="other">{tf('optOther')}</option>
          </FloatingSelect>
          <FloatingSelect id="budget" name="budget" label={tf('budgetRange')} required>
            <option value="under-5k">{tf('budgetUnder5k')}</option>
            <option value="5k-15k">{tf('budget5to15k')}</option>
            <option value="15k-50k">{tf('budget15to50k')}</option>
            <option value="50k-plus">{tf('budget50kplus')}</option>
          </FloatingSelect>
        </div>

        {/* Row 4: Message */}
        <div>
          <label htmlFor="message" className={labelClass}>{tf('message')}</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={2000}
            placeholder={tf('messagePlaceholder')}
            className={`${inputClass} resize-none`}
            onChange={(e) => setMsgLen(e.target.value.length)}
          />
          {msgLen > 0 && (
            <p className="text-right font-sans text-[10px] text-foreground/25 mt-1">{msgLen} {tf('chars')}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center gap-3 bg-accent text-background px-10 py-5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 group"
          >
            {status === 'loading' ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1 h-1 rounded-full bg-background inline-block"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </span>
            ) : (
              <>
                {tf('send')}
                <Icon name="north_east" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
