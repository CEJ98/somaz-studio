'use client'

import { useState } from 'react'
import { useRouter, Link } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { m, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { useLocale, useTranslations } from 'next-intl'
import { Icon } from '@/components/icons'
import { trackEvent, trackLead } from '@/components/Analytics'

type Status = 'idle' | 'loading'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-\s]{7,}$/

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
        className={`absolute left-0 font-sans uppercase transition-all duration-200 pointer-events-none ${
          hasValue ? '-top-0 text-accent text-[11px] tracking-[0.12em]' : 'top-7 text-foreground/50 text-[13px] tracking-[0.08em]'
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
  maxLength,
  validate,
}: {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  maxLength?: number
  validate?: (value: string) => string
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [error, setError] = useState('')
  const active = focused || hasValue

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setHasValue(v.length > 0)
    if (validate && v.length > 0) setError(validate(v))
    else setError('')
  }

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-0 font-sans uppercase transition-all duration-200 pointer-events-none ${
          active ? '-top-0 text-[11px] tracking-[0.12em] ' + (error ? 'text-red-400' : 'text-accent') : 'top-7 text-foreground/50 text-[13px] tracking-[0.08em]'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        aria-label={label}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={handleChange}
        className={`w-full bg-transparent border-b text-foreground font-sans text-sm py-3 focus:outline-none transition-colors duration-300 ${
          error ? 'border-red-400/60 focus:border-red-400' : 'border-border focus:border-accent'
        }`}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="font-sans text-[10px] text-red-400 mt-1">{error}</p>
      ) : hasValue && !focused ? (
        <span className="absolute right-0 top-7 text-accent text-xs">✓</span>
      ) : null}
    </div>
  )
}

export default function ContactForm() {
  const router = useRouter()
  const tf = useTranslations('form')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const VALID_TYPES = ['architecture', '3d-visualization', 'interior-design', 'conceptual-design', 'consulting', 'other']
  const rawType = searchParams.get('type') ?? ''
  const preselectedType = VALID_TYPES.includes(rawType) ? rawType : (rawType === 'consult' ? 'consulting' : rawType === 'quote' ? '3d-visualization' : '')
  const [status, setStatus] = useState<Status>('idle')
  const [msgLen, setMsgLen] = useState(0)
  const reduced = useReducedMotion()
  const labels = locale === 'es'
    ? {
        phone: 'Telefono / WhatsApp',
        location: 'Ubicacion del proyecto (opcional)',
        serviceNeeded: 'Tipo de proyecto (opcional)',
      }
    : {
        phone: 'Phone / WhatsApp',
        location: 'Project location (optional)',
        serviceNeeded: 'Project type (optional)',
      }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    trackEvent('lead_form_started', { form: 'contact' })
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value
    if (!EMAIL_RE.test(email)) return
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
        trackEvent('contact_form_submitted', {
          project_type: payload.project_type || 'not-specified',
        })
        trackLead({
          project_type: payload.project_type || 'not-specified',
          location: payload.location || '',
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
  const labelClass = 'font-sans text-[11px] tracking-[0.12em] uppercase text-foreground/65 mb-2 block'

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

      <p className="font-sans text-[11px] tracking-[0.12em] uppercase text-foreground/65 mb-4">{tf('formTime')}</p>
      <form onSubmit={handleSubmit} className="space-y-10" data-testid="contact-form">
        {/* Honeypot anti-spam: invisible para humanos, atractivo para bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0 }}>
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-label="Do not fill this field"
          />
        </div>
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput id="name" name="name" label={tf('name')} required />
          <div>
            <FloatingInput
              id="email"
              name="email"
              label={tf('email')}
              type="email"
              required
              validate={(v) => (EMAIL_RE.test(v) ? '' : tf('emailError'))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput
            id="phone"
            name="phone"
            label={labels.phone}
          />
          <FloatingInput id="location" name="location" label={labels.location} />
        </div>

        <FloatingSelect id="project_type" name="project_type" label={labels.serviceNeeded} defaultValue={preselectedType}>
          <option value="other">{locale === 'es' ? 'No estoy seguro aun' : 'Not sure yet'}</option>
          <option value="architecture">{tf('optArchitecture')}</option>
          <option value="3d-visualization">{tf('opt3dViz')}</option>
          <option value="interior-design">{tf('optInterior')}</option>
          <option value="conceptual-design">{tf('optConceptual')}</option>
          <option value="consulting">{tf('optConsulting')}</option>
          <option value="other">{tf('optOther')}</option>
        </FloatingSelect>

        {/* Row 4: Message (opcional) */}
        <div>
          <label htmlFor="message" className={labelClass}>{tf('message')}</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder={tf('messagePlaceholder')}
            required
            className={`${inputClass} resize-none min-h-32`}
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
            className="self-start inline-flex min-h-12 items-center gap-3 bg-accent text-background px-10 py-4 font-sans text-[11px] tracking-[0.14em] uppercase hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 group"
          >
            {status === 'loading' ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  reduced ? (
                    <span key={i} className="w-1 h-1 rounded-full bg-background inline-block opacity-60" />
                  ) : (
                    <m.span
                      key={i}
                      className="w-1 h-1 rounded-full bg-background inline-block"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  )
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
          <p className="font-sans text-[10px] text-foreground/50 leading-relaxed">
            {locale === 'es'
              ? <><span>Al enviar aceptás nuestra </span><Link href="/privacy" className="underline underline-offset-2 hover:text-accent transition-colors">política de privacidad</Link>.</>
              : <><span>By submitting you agree to our </span><Link href="/privacy" className="underline underline-offset-2 hover:text-accent transition-colors">privacy policy</Link>.</>
            }
          </p>
        </div>
      </form>
    </div>
  )
}
