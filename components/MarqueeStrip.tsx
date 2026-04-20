'use client'

import { useReducedMotion } from 'framer-motion'

const ITEMS = [
  'Where Space Becomes Vision',
  '3D Architectural Visualization',
  'Interior Design',
  '48–72h Delivery',
  'Starting at USD $350',
  'Miami · Worldwide',
  '50+ Projects · 8+ Countries',
  '5★ · Verified Reviews',
  'Remote-First Studio · Est. 2022',
  'Design Is the Language Space Speaks',
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
