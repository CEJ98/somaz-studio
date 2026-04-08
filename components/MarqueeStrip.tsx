'use client'

import { useReducedMotion } from 'framer-motion'

const ITEMS = [
  '3D Visualization',
  'Interior Design',
  'Conceptual Design',
  'Design Consulting',
  'Miami · Global',
  'Est. 2022',
  'Photorealistic Renders',
  'Spaces That Define Culture',
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
