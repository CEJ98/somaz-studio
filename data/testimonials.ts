import type { LocaleString } from '@/lib/locale'

export interface Testimonial {
  quote: LocaleString
  name: string
  role: LocaleString
  location: string
  projectSlug?: string
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: 'Somaz Studio turned our blueprints into renders so realistic that investors thought we were showing photos of a finished project. We closed funding two months ahead of schedule.',
      es: 'Somaz Studio convirtió nuestros planos en renders tan realistas que los inversores pensaron que les estábamos mostrando fotos de un proyecto terminado. Cerramos el financiamiento dos meses antes de lo previsto.',
    },
    name: 'Michael Kriger',
    role: { en: 'Real Estate Developer', es: 'Desarrollador Inmobiliario' },
    location: 'Miami, FL',
    projectSlug: 'casa-kriger-miami',
  },
  {
    quote: {
      en: "They redesigned our penthouse remotely — every material, every detail felt intentional. The finished space matched the renders almost perfectly. I still can't believe it was done from another country.",
      es: 'Rediseñaron nuestro penthouse de forma remota — cada material, cada detalle se sentía intencional. El espacio terminado coincidió con los renders casi a la perfección. Todavía no puedo creer que se hizo desde otro país.',
    },
    name: 'Paula Marchetti',
    role: { en: 'Private Client', es: 'Cliente Privada' },
    location: 'Buenos Aires, Argentina',
    projectSlug: 'casa-marchetti',
  },
  {
    quote: {
      en: 'Fast, precise, and incredibly professional. Our gym rebranding needed photorealistic visuals in under a week — Somaz delivered in four days and nailed the industrial aesthetic we were after.',
      es: 'Rápidos, precisos e increíblemente profesionales. El rebranding de nuestro gimnasio necesitaba visuales fotorrealistas en menos de una semana — Somaz los entregó en cuatro días y clavaron la estética industrial que buscábamos.',
    },
    name: 'Tomás Mazzucco',
    role: { en: 'Founder, Iron Fitness', es: 'Fundador, Iron Fitness' },
    location: 'Córdoba, Argentina',
    projectSlug: 'iron-fitness-gym',
  },
  {
    quote: {
      en: 'Working with Somaz felt like they were right next to us despite being thousands of miles away. The 3D visualization helped us sell 60% of units before breaking ground.',
      es: 'Trabajar con Somaz se sintió como si estuvieran a nuestro lado a pesar de estar a miles de kilómetros. La visualización 3D nos ayudó a vender el 60% de las unidades antes de iniciar obra.',
    },
    name: 'Rodrigo Estévez',
    role: { en: 'Project Director, Estévez Group', es: 'Director de Proyecto, Grupo Estévez' },
    location: 'Montevideo, Uruguay',
  },
  {
    quote: {
      en: 'Their conceptual design process helped us discover possibilities we never considered. What started as a simple renovation became the home we always dreamed of.',
      es: 'Su proceso de diseño conceptual nos ayudó a descubrir posibilidades que nunca habíamos considerado. Lo que empezó como una simple renovación se convirtió en la casa que siempre soñamos.',
    },
    name: 'Carolina Vega',
    role: { en: 'Homeowner', es: 'Propietaria' },
    location: 'Santiago, Chile',
  },
  {
    quote: {
      en: 'The attention to lighting in their renders is unmatched. Every scene looked like a photograph from a design magazine. Our clients were blown away.',
      es: 'La atención a la iluminación en sus renders no tiene igual. Cada escena parecía una fotografía de una revista de diseño. Nuestros clientes quedaron impactados.',
    },
    name: 'Diego Ferraro',
    role: { en: 'Architect', es: 'Arquitecto' },
    location: 'Bogotá, Colombia',
  },
]
