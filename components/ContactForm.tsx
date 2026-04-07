'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { m } from 'framer-motion'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/icons'
import { trackLead } from '@/components/Analytics'

type Status = 'idle' | 'loading'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FloatingSelect({
  id,
  name,
  label,
  required,
  defaultValue: initialValue = '',
  children,
}: {
  id: string
  name: string
  label: string
  required?: boolean
  defaultValue?: string
  children: React.ReactNode
}) {
  const [value, setValue] = useState(initialValue)
  const hasValue = value !== ''

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-0 font-sans tracking-widest uppercase transition-all duration-200 pointer-events-none ${
          hasValue ? '-top-0 text-accent text-[10px]' : 'top-7 text-foreground/50 text-xs'
        }`}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        aria-label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
          active ? '-top-0 text-accent text-[10px]' : 'top-7 text-foreground/50 text-xs'
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
  const searchParams = useSearchParams()
  const preselectedType = searchParams.get('type') === 'consult' ? 'consulting' : ''
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
    const utms: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = sessionStorage.getItem(key)
      if (v) utms[key] = v
    }
    const payload = { ...Object.fromEntries(data.entries()), ...utms }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        trackLead({
          project_type: payload.project_type,
          budget: payload.budget,
          ...utms,
        })
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
  const labelClass = 'font-sans text-xs tracking-widest uppercase text-foreground/65 mb-2 block'

  return (
    <div className="relative">
      {/* Marquee header */}
      <div className="overflow-hidden border-b border-border/40 mb-12 -mx-6 md:-mx-10">
        <div className="marquee-track py-3">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/50 shrink-0 px-4"
            >
              {tf('marquee')}
            </span>
          ))}
        </div>
      </div>

      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/65 mb-4">{tf('formTime')}</p>
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
          <FloatingSelect id="project_type" name="project_type" label={tf('projectType')} required defaultValue={preselectedType}>
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
            <option value="not-sure">{tf('budgetNotSure')}</option>
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
            <p className="text-right font-sans text-[10px] text-foreground/50 mt-1">{msgLen} {tf('chars')}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="self-start inline-flex items-center gap-3 bg-accent text-background px-10 py-5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 group"
          >
            {status === 'loading' ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <m.span
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
          <p className="font-sans text-[10px] text-foreground/55 tracking-wide">
            {tf('trustCopy')}
          </p>
        </div>
      </form>
    </div>
  )
}
