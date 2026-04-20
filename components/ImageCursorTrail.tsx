'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

interface ImageCursorTrailProps {
  src: string | null
}

export default function ImageCursorTrail({ src }: ImageCursorTrailProps) {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[200]"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-60%',
      }}
    >
      <AnimatePresence mode="wait">
        {src && (
          <motion.div
            key={src}
            className="w-44 h-32 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="176px"
              className="object-cover"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
