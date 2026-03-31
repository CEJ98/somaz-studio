'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

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

const MARQUEE_TEXT =
  'CONSULT\u2003—\u2003COLLABORATE\u2003—\u2003CREATE\u2003—\u2003CONSULT\u2003—\u2003COLLABORATE\u2003—\u2003CREATE\u2003—\u2003CONSULT\u2003—\u2003COLLABORATE\u2003—\u2003CREATE\u2003—\u2003'

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
  const [status, setStatus] = useState<Status>('idle')
  const [msgLen, setMsgLen] = useState(0)
  const [emailError, setEmailError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    if (!EMAIL_RE.test(email)) {
      setEmailError('Please enter a valid email address.')
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
        toast.error('Something went wrong. Email us at hola@somazstudio.com')
      }
    } catch {
      toast.error('Something went wrong. Email us at hola@somazstudio.com')
    }
    setStatus('idle')
  }

  const inputClass =
    'w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-3 focus:outline-none focus:border-accent transition-colors duration-300'
  const labelClass = 'font-sans text-xs tracking-widest uppercase text-foreground/40 mb-2 block'

  return (
    <div>
      {/* Marquee header */}
      <div className="overflow-hidden border-b border-border/40 mb-12 -mx-6 md:-mx-10">
        <div className="marquee-track py-3">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/25 shrink-0 px-4"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput id="name" name="name" label="Name" required />
          <div>
            <FloatingInput id="email" name="email" label="Email" type="email" required />
            <div aria-live="polite">
              {emailError && (
                <p className="font-sans text-[10px] text-red-400 mt-1">{emailError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Phone + Project Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput id="phone" name="phone" label="Phone (optional)" type="tel" />
          <FloatingInput id="sqft" name="sqft" label="Project Size (sqft, optional)" />
        </div>

        {/* Row 3: Project Type + Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingSelect id="project_type" name="project_type" label="Project Type" required>
            <option>3D Visualization</option>
            <option>Interior Design</option>
            <option>Conceptual Design</option>
            <option>Consulting</option>
            <option>Full-Studio Partnership</option>
            <option>Other</option>
          </FloatingSelect>
          <FloatingSelect id="budget" name="budget" label="Budget Range" required>
            <option>Under $5K</option>
            <option>$5K – $15K</option>
            <option>$15K – $50K</option>
            <option>$50K+</option>
          </FloatingSelect>
        </div>

        {/* Row 4: Message */}
        <div>
          <label htmlFor="message" className={labelClass}>Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={2000}
            placeholder="Tell us about your project..."
            className={`${inputClass} resize-none`}
            onChange={(e) => setMsgLen(e.target.value.length)}
          />
          {msgLen > 0 && (
            <p className="text-right font-sans text-[10px] text-foreground/25 mt-1">{msgLen} chars</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center gap-3 bg-accent text-background px-10 py-5 font-sans text-sm tracking-widest uppercase hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 group"
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
                Send Message
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
