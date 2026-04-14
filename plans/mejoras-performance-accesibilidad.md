# Plan de Mejoras para SomazStudio - Performance y Accesibilidad

## Objetivo
Mejorar el rendimiento y accesibilidad de las animaciones y micro-interacciones del proyecto SomazStudio.

## Métricas de Éxito
- Reducir LCP (Largest Contentful Paint) en un 20%
- Eliminar layout shifts causados por animaciones
- Mejorar puntuación de accesibilidad en Lighthouse a 95+
- Mantener animaciones suaves en dispositivos móviles

---

## Fase 1: Optimización de Performance (Alta Prioridad)

### 1.1 Optimizar Video Hero
**Archivo:** `components/HomePageClient.tsx`
**Acciones:**
- [ ] Cambiar `preload="auto"` a `preload="metadata"` en el video hero
- [ ] Añadir `poster` attribute con imagen optimizada
- [ ] Implementar lazy loading para video en móviles

**Código a modificar:**
```typescript
// Línea 83-88
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata" // Cambiar de "auto"
  className="absolute inset-0 h-full w-full object-cover"
>
```

### 1.2 Debounce Scroll Events
**Archivo:** `components/Navbar.tsx`
**Acciones:**
- [ ] Implementar debounce en el handler de scroll
- [ ] Reducir frecuencia de actualización de estado

**Código a modificar:**
```typescript
// Líneas 31-35
useEffect(() => {
  let timeout: NodeJS.Timeout
  const handleScroll = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setScrolled(window.scrollY > 40)
    }, 10)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => {
    window.removeEventListener('scroll', handleScroll)
    clearTimeout(timeout)
  }
}, [])
```

### 1.3 Añadir GPU Acceleration
**Archivos:** `components/CustomCursor.tsx`, `components/ProjectCard.tsx`
**Acciones:**
- [ ] Añadir `transform: translateZ(0)` a animaciones
- [ ] Usar `will-change` estratégicamente

**Código a modificar (CustomCursor.tsx):**
```typescript
// Líneas 84-91
<div
  ref={dotRef}
  className="..."
  style={{ 
    willChange: 'transform',
    transform: 'translateZ(0)'
  }}
/>
```

### 1.4 Optimizar BeforeAfterSlider
**Archivo:** `components/BeforeAfterSlider.tsx`
**Acciones:**
- [ ] Usar `transform` en lugar de `clip-path` para mejor performance
- [ ] Añadir `will-change: transform` al slider

**Código a modificar:**
```typescript
// Línea 114
// Cambiar de clip-path a transform
style={{ transform: `translateX(${position}%)` }}
```

---

## Fase 2: Mejoras de Accesibilidad (Alta Prioridad)

### 2.1 Mejorar Reduced Motion Support
**Archivo:** `lib/motion.ts`
**Acciones:**
- [ ] Crear hook personalizado `useReducedMotion`
- [ ] Añadir soporte para `prefers-contrast: high`

**Nuevo archivo:** `lib/useReducedMotion.ts`
```typescript
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

export function useReducedMotion() {
  const reduced = useFramerReducedMotion()
  
  // Soporte para testing
  if (typeof window !== 'undefined' && window.__REDUCED_MOTION_TEST__) {
    return true
  }
  
  return reduced
}
```

### 2.2 Mejorar ARIA Labels Dinámicos
**Archivo:** `components/BeforeAfterSlider.tsx`
**Acciones:**
- [ ] Añadir descripción dinámica del slider
- [ ] Mejorar navegación por teclado

**Código a modificar:**
```typescript
// Línea 147
aria-label={`Comparación: ${Math.round(position)}% antes, ${Math.round(100 - position)}% después`}
```

### 2.3 Focus Management Mejorado
**Archivo:** `components/Navbar.tsx`
**Acciones:**
- [ ] Añadir focus al primer elemento al abrir menú móvil
- [ ] Mejorar trap de focus

**Código a modificar:**
```typescript
// Añadir después de setMenuOpen(true)
useEffect(() => {
  if (menuOpen && mobileMenuRef.current) {
    const firstFocusable = mobileMenuRef.current.querySelector('a, button')
    if (firstFocusable) {
      (firstFocusable as HTMLElement).focus()
    }
  }
}, [menuOpen])
```

### 2.4 Contrast en Cursor Personalizado
**Archivo:** `components/CustomCursor.tsx`
**Acciones:**
- [ ] Añadir soporte para alto contraste
- [ ] Usar colores con ratio de contraste 4.5:1

**Código a modificar:**
```typescript
// Añadir en styles
'@media (prefers-contrast: high)': {
  backgroundColor: '#FFFFFF',
  border: '2px solid #000000'
}
```

---

## Fase 3: Optimizaciones Adicionales (Media Prioridad)

### 3.1 Reducir Repaints en Hover Effects
**Archivo:** `components/ProjectCard.tsx`
**Acciones:**
- [ ] Usar `transform` en lugar de `scale` en className
- [ ] Optimizar transiciones de grayscale

**Código a modificar:**
```typescript
// Líneas 46-50
className={`object-cover transition-all duration-700 ease-out ${
  hovered
    ? 'scale-[1.04] grayscale-0'
    : 'scale-100 grayscale-[35%]'
}`}
```

### 3.2 Optimizar Animaciones de Entrada
**Archivo:** `components/HomePageClient.tsx`
**Acciones:**
- [ ] Añadir `transform: translateZ(0)` a AnimatedSection
- [ ] Reducir duración de animaciones en reduced motion

**Código a modificar:**
```typescript
// En AnimatedSection
style={{ transform: 'translateZ(0)' }}
```

### 3.3 Performance Monitoring
**Archivo:** `lib/performance.ts` (nuevo)
**Acciones:**
- [ ] Crear hook para monitorear Web Vitals
- [ ] Añadir logging de performance

**Nuevo archivo:**
```typescript
import { useEffect } from 'react'

export function usePerformanceMetrics() {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Performance entry:', entry)
        }
      })
      observer.observe({ entryTypes: ['layout-shift', 'largest-contentful-paint'] })
    }
  }, [])
}
```

---

## Fase 4: Testing y Validación

### 4.1 Testing de Performance
**Herramientas:**
- [ ] Lighthouse CI en cada PR
- [ ] WebPageTest para métricas detalladas
- [ ] Chrome DevTools Performance Panel

### 4.2 Testing de Accesibilidad
**Herramientas:**
- [ ] axe-core en tests E2E
- [ ] Testing con screen readers (NVDA, VoiceOver)
- [ ] Testing de navegación por teclado

### 4.3 Testing de Animaciones
**Acciones:**
- [ ] Probar en dispositivos móviles reales
- [ ] Testear con `prefers-reduced-motion: reduce`
- [ ] Validar FPS en animaciones complejas

---

## Cronograma Estimado

| Fase | Duración | Responsable |
|------|----------|-------------|
| Fase 1: Performance | 2-3 días | Desarrollador |
| Fase 2: Accesibilidad | 2 días | Desarrollador + QA |
| Fase 3: Optimizaciones | 1-2 días | Desarrollador |
| Fase 4: Testing | 1-2 días | QA |

**Total estimado:** 6-9 días

---

## Archivos a Modificar

1. `components/HomePageClient.tsx` - Video hero y animaciones
2. `components/Navbar.tsx` - Scroll events y focus management
3. `components/CustomCursor.tsx` - GPU acceleration y contrast
4. `components/BeforeAfterSlider.tsx` - ARIA labels y performance
5. `components/ProjectCard.tsx` - Hover effects
6. `lib/motion.ts` - Curva de easing
7. `lib/useReducedMotion.ts` - Nuevo archivo
8. `lib/performance.ts` - Nuevo archivo

---

## Métricas de Success

- [ ] LCP reducido en 20%
- [ ] CLS eliminado en animaciones
- [ ] Puntuación Lighthouse Accessibility > 95
- [ ] FPS > 60 en animaciones complejas
- [ ] Sin regressions en navegación por teclado

---

## Notas Adicionales

- Todas las animaciones deben respetar `prefers-reduced-motion`
- Usar `transform` en lugar de `top/left` para mejor performance
- Añadir `will-change` solo cuando sea necesario
- Testear en dispositivos móviles reales
- Documentar cambios en el changelog
