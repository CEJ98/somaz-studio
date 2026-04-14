# Somaz Studio — Mejora completa de la web

**Fecha:** 2026-04-14  
**Objetivo:** Aumentar la conversión de visitantes a clientes que contactan. La web ya tiene base técnica sólida; el trabajo es editorial, visual y de copy — con cambios técnicos focalizados.

---

## Contexto

La web de somazstudio.com es un sitio de estudio de diseño (3D visualization, interior design, conceptual design) con sede en Miami que trabaja globalmente. El objetivo principal es conseguir que potenciales clientes hagan contacto. Problemas identificados:

1. Los renders reales de alta calidad no son el protagonista absoluto que deberían ser.
2. Los precios visibles en la página de servicios frenan la venta antes de generar deseo.
3. El portfolio no aprovecha al máximo el impacto visual de los renders.
4. La jerarquía de CTAs no es clara en todas las páginas.
5. Algunos assets de imagen están sin optimizar (sliders ~500KB cada uno).

---

## Alcance

### 1. Homepage (`app/[locale]/page.tsx` + `components/HomePageClient.tsx`)

**Video hero:** Mantener el video existente. Verificar tamaño del mobile video y comprimir si supera 2MB.

**Selected Work:** Pasar de grilla fija a layout editorial más generoso — imágenes más grandes, menos texto alrededor. En mobile: scroll horizontal o stack full-width.

**Stats:** Mover antes del fold o integrar como overlay sutil en el hero para que se vean sin hacer scroll.

**CTAs:** Jerarquía clara — "Ver nuestro trabajo" como acción primaria, "Iniciar proyecto" como secundaria con menor peso visual. El orden actual los equipara incorrectamente.

**Before/After slider:** Eliminar de la homepage. Mueve el foco a técnica en lugar de resultado. El componente `BeforeAfterSlider` puede quedar disponible para usarse en páginas de servicios si se quiere en el futuro.

**Secciones a mantener sin cambios:** MarqueeStrip, TestimonialsSection, FAQSection, CTA final.

---

### 2. Work / Portfolio (`app/[locale]/work/page.tsx` + `components/WorkClient.tsx`)

**Layout de grilla:** Rediseñar con alternancia editorial — proyectos full-width intercalados con grilla de 2 columnas, como revista de arquitectura. Los renders deben dominar visualmente.

**Hover state:** Overlay minimalista con nombre del proyecto y categoría. Efecto de escala sutil ya existe — mantenerlo.

**Filtros:** Agregar filtros por categoría (3D Visualization, Interior Design, Conceptual Design) simples — sin tabs aparatosas, preferiblemente como pills de texto.

**Página de proyecto individual** (`app/[locale]/work/[slug]/page.tsx` + `components/ProjectPageClient.tsx`):
- Render principal full-screen al entrar (hero de imagen, no de texto).
- Galería de imágenes sin distracciones — grid limpio.
- Descripción del proyecto corta enfocada en resultado obtenido, no en proceso técnico.
- CTA al final: "¿Tenés un proyecto similar? Hablemos."

---

### 3. Servicios (`app/[locale]/services/page.tsx` + `components/ServiceItem.tsx`)

**Eliminar precios:** Quitar toda mención de precios y estructura de paquetes (Essential $350, Standard, Premium) de `ServiceItem` y de `data/services.ts`. Reemplazar con descripción del beneficio para el cliente.

**Eliminar `PricingTable` component:** El componente `components/PricingTable.tsx` queda sin uso — eliminarlo.

**Copy de servicios:** Reescribir cada servicio con foco en resultado/beneficio. Ejemplo: en lugar de "5 photorealistic views + revisions", algo como "Tu proyecto presentado con renders que hacen que los clientes digan sí antes de que empieces a construir."

**Proceso detallado:** Expandir la sección de proceso a 4-5 pasos con más detalle que el homepage. Genera confianza antes del contacto.

**CTAs:** Cada servicio termina con "Hablemos de tu proyecto" → link a `/contact`.

**Mantener:** Testimonios y FAQ existentes.

---

### 4. Contacto (`app/[locale]/contact/page.tsx` + `components/ContactForm.tsx`)

**Formulario simplificado:** Reducir campos a: nombre, email, tipo de proyecto (dropdown: 3D Visualization / Interior Design / Conceptual Design / Consulting / Other), mensaje (opcional). Eliminar campos que generen fricción innecesaria.

**WhatsApp como alternativa igual de prominente:** El componente `WhatsAppButton` existe pero es flotante — agregar también una opción de contacto por WhatsApp dentro del cuerpo de la página de contacto, al mismo nivel de jerarquía que el formulario.

**Hero de contacto:** Cambiar el copy del encabezado por algo que genere deseo ("Contanos tu proyecto") en lugar de algo funcional/genérico.

**Página thank-you** (`app/[locale]/contact/thank-you/page.tsx` + `components/ThankYouContent.tsx`): Agregar paso siguiente claro — "Te contactamos en menos de 24 horas." Reducir la ansiedad post-envío.

---

### 5. About (`app/[locale]/about/page.tsx` + `components/AboutClient.tsx`)

**Reordenar contenido:** 
1. Diferenciador principal ("Estudio de diseño global con base en Miami")
2. Logros/prueba social (proyectos, países, años)
3. Equipo (`data/team.ts`)
4. Historia/filosofía

**Logos de clientes:** Si hay disponibles, agregar una sección de logos o menciones de proyectos destacados.

**CTA al final:** Directo a `/contact` — "¿Querés trabajar con nosotros?"

---

### 6. Blog (`app/[locale]/blog/` + `app/[locale]/blog/[slug]/`)

**Sistema actual:** Mantener `data/posts.ts` — no migrar a CMS.

**Mejora de artículos individuales:** Tipografía más generosa (line-height, tamaño de cuerpo), imágenes más grandes, mejor espaciado.

**CTA contextual al final de cada post:** Relacionado con el contenido del artículo. Ejemplo en un post sobre renders: "¿Necesitás renders para tu proyecto? Hablemos."

---

### 7. Técnico / Performance

**Imágenes sin optimizar:**
- `public/slider-blueprint.jpg` (484KB) → usar `slider-blueprint.avif` o `slider-blueprint.webp` si se crean, o comprimir el JPG.
- `public/slider-render.jpg` (566KB) → ídem.
- En el componente `BeforeAfterSlider`, usar `next/image` con las variantes AVIF/WebP si están disponibles, o agregar atributo `quality={75}`.

**Video mobile:** Verificar tamaño de `public/media/hero-home-mobile.mp4`. Si supera 2MB, comprimir con ffmpeg a ~1-1.5MB manteniendo calidad aceptable.

**PricingTable:** Eliminar `components/PricingTable.tsx` una vez confirmado que no se usa en ninguna página.

**Accesibilidad:** Auditar que todos los botones interactivos (`MagneticButton`, CTAs, filtros de Work) tengan `aria-label` cuando no tienen texto visible.

---

## Archivos críticos a modificar

| Archivo | Cambio |
|---|---|
| `components/HomePageClient.tsx` | Quitar BeforeAfterSlider, ajustar jerarquía CTAs, mejorar grilla de proyectos, mover stats |
| `components/ServiceItem.tsx` | Eliminar precios y paquetes, nuevo copy de beneficios |
| `data/services.ts` | Eliminar campos de precios/paquetes |
| `components/PricingTable.tsx` | **Eliminar** |
| `components/WorkClient.tsx` | Layout editorial, agregar filtros por categoría |
| `components/ProjectPageClient.tsx` | Hero full-screen, galería limpia, CTA al final |
| `components/ContactForm.tsx` | Simplificar campos del formulario |
| `components/ThankYouContent.tsx` | Agregar "Te contactamos en menos de 24h" |
| `components/AboutClient.tsx` | Reordenar secciones, agregar CTA |
| `app/[locale]/contact/page.tsx` | Hero copy, agregar WhatsApp inline |
| `app/[locale]/blog/[slug]/page.tsx` | CTA contextual al final |
| `components/BeforeAfterSlider.tsx` | Optimizar imágenes con next/image quality |

---

## Assets disponibles

Carpeta: `/Users/jorgecostilla/Downloads/somaz-imagenes/`
- **48 fotos** de interiores y arquitectura (Unsplash/Pexels, alta resolución)
- **3 videos 4K** (Pexels stock): `5384976-uhd_4096_2160_30fps.mp4` (31MB), `6615051-uhd_3840_2160_25fps.mp4` (10MB), `6615508-uhd_3840_2160_25fps.mp4` (15MB)

**Uso planificado:**
- Videos: evaluar para reemplazar o complementar el hero video actual. Comprimir a H.264/H.265 antes de subir a `public/media/`.
- Fotos: usar en blog posts, páginas de servicios, About, y como covers de proyectos donde no haya render propio disponible.
- Todas las imágenes deben convertirse a AVIF/WebP con `sharp` antes de moverlas a `public/`.

---

## Orden de implementación recomendado

1. **Servicios** — quitar precios (impacto inmediato en conversión, cambio quirúrgico)
2. **Homepage** — jerarquía CTAs + grilla de proyectos + quitar Before/After
3. **Work** — layout editorial + filtros
4. **Proyecto individual** — hero + galería + CTA
5. **Contacto** — simplificar formulario + WhatsApp inline
6. **About** — reordenar + CTA
7. **Blog** — CTA contextual en posts
8. **Técnico** — optimizar imágenes, verificar video mobile, eliminar PricingTable

---

## Verificación

- `npm run build` sin errores después de cada paso.
- `npx tsc --noEmit` para verificar tipos.
- Revisar visualmente en mobile (375px) y desktop (1440px) las páginas modificadas.
- Verificar que el formulario de contacto sigue enviando emails correctamente después de simplificarlo.
- Confirmar que no quedan referencias a `PricingTable` antes de eliminarlo.
