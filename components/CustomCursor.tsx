'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on pointer-capable devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    let raf: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      dot.classList.add('scale-[2]')
      ring.classList.add('opacity-0')
    }
    const onLeaveLink = () => {
      dot.classList.remove('scale-[2]')
      ring.classList.remove('opacity-0')
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    const bound = new WeakSet<Element>()

    const bindHovers = () => {
      document.querySelectorAll('a, button, [data-cursor-grow]').forEach((el) => {
        if (bound.has(el)) return
        bound.add(el)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    bindHovers()
    const observer = new MutationObserver(bindHovers)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-accent transition-transform duration-150 ease-out hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-accent/40 transition-opacity duration-200 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
