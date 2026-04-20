'use client'

import { useReducedMotion } from 'framer-motion'

const ITEMS = [
  'Where Space Becomes Vision',
  '3D Visualization',
  'Interior Design',
  'Miami · Worldwide',
  'Est. 2022',
]

const allItems = [...ITEMS, ...ITEMS]

export default function MarqueeStrip() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="border-t border-b border-border/30 py-4 overflow-hidden">
      <div
        className="marquee-track flex"
        style={prefersReducedMotion ? { animationPlayState: 'paused' } : undefined}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/50 whitespace-nowrap px-6"
          >
            {item}
            <span className="text-accent mx-3">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
