'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Status = 'idle' | 'loading' | 'success' | 'error'

// TODO: Replace with real Formspree endpoint (https://formspree.io)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
          active ? '-top-0 text-accent text-[10px]' : 'top-7 text-foreground/30 text-xs'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
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

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        setMsgLen(0)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-border text-foreground font-sans text-sm py-3 focus:outline-none focus:border-accent transition-colors duration-300'
  const labelClass = 'font-sans text-xs tracking-widest uppercase text-foreground/40 mb-2 block'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FloatingInput id="name" name="name" label="Name" required />
        <div>
          <FloatingInput id="email" name="email" label="Email" type="email" required />
          {emailError && (
            <p className="font-sans text-[10px] text-red-400 mt-1">{emailError}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="project_type" className={labelClass}>Project Type</label>
          <select id="project_type" name="project_type" required className={`${inputClass} appearance-none`}>
            <option value="" disabled>Select a service</option>
            <option>3D Visualization</option>
            <option>Interior Design</option>
            <option>Conceptual Design</option>
            <option>Consulting</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>Budget Range</label>
          <select id="budget" name="budget" required className={`${inputClass} appearance-none`}>
            <option value="" disabled>Select a range</option>
            <option>Under $1,000</option>
            <option>$1,000–$5,000</option>
            <option>$5,000–$15,000</option>
            <option>$15,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your project..."
          className={`${inputClass} resize-none`}
          onChange={(e) => setMsgLen(e.target.value.length)}
        />
        <p className="text-right font-sans text-[10px] text-foreground/20 mt-1">{msgLen} chars</p>
      </div>

      <div>
        {status === 'success' ? (
          <div className="py-4 px-6 border border-accent/40 text-accent font-sans text-sm">
            Message sent. We&apos;ll be in touch shortly.
          </div>
        ) : status === 'error' ? (
          <div className="py-4 px-6 border border-red-500/40 text-red-400 font-sans text-sm">
            Something went wrong. Please email us directly at hola@somazstudio.com
          </div>
        ) : (
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
        )}
      </div>
    </form>
  )
}
