'use client'

import { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'

const FRAME_COUNT = 80
const FRAME_PATH = (i: number) => `/library/video/hero-frames/frame-${String(i).padStart(3, '0')}.jpg`

export default function HeroScrollCanvas({
  targetRef,
  className = '',
}: {
  targetRef: React.RefObject<HTMLElement | null>
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT])

  useEffect(() => {
    let cancelled = false
    const imgs: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        if (cancelled) return
        loadedCount++
        if (loadedCount === 1) drawFrame(1)
        if (loadedCount >= FRAME_COUNT * 0.4) setLoaded(true)
      }
      imgs.push(img)
    }
    framesRef.current = imgs
    return () => { cancelled = true }
  }, [])

  function drawFrame(i: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const idx = Math.max(1, Math.min(FRAME_COUNT, Math.round(i)))
    const img = framesRef.current[idx - 1]
    if (!img || !img.complete || !img.naturalWidth) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr
      canvas.height = ch * dpr
    }

    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.max((cw * dpr) / iw, (ch * dpr) / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw * dpr - dw) / 2
    const dy = (ch * dpr - dh) / 2
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  useMotionValueEvent(frameIndex, 'change', (v) => {
    if (reduced) return
    drawFrame(v)
  })

  useEffect(() => {
    const onResize = () => drawFrame(frameIndex.get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [frameIndex])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ${className}`}
    />
  )
}
