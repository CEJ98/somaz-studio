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
      en: 'We sent the renders to the bank and they approved the financing on the first submission. The images spoke for themselves.',
      es: 'Enviamos los renders al banco y aprobaron el financiamiento en la primera presentación. Las imágenes hablaron por sí solas.',
    },
    name: 'Michael Kriger',
    role: { en: 'Real Estate Developer', es: 'Desarrollador Inmobiliario' },
    location: 'Miami, FL',
    projectSlug: 'casa-kriger-miami',
  },
  {
    quote: {
      en: 'Sofía understood exactly what we wanted from the very first call. The renders were so precise that we barely changed anything once construction started.',
      es: 'Sofía entendió exactamente lo que queríamos desde la primera llamada. Los renders fueron tan precisos que casi no cambiamos nada cuando empezó la obra.',
    },
    name: 'Paula Marchetti',
    role: { en: 'Private Client', es: 'Cliente Privada' },
    location: 'Buenos Aires, Argentina',
    projectSlug: 'casa-marchetti',
  },
  {
    quote: {
      en: 'Four days from brief to final renders. Every floor, every angle, exactly the industrial aesthetic we needed for launch. Exceptional work.',
      es: 'Cuatro días desde el brief hasta los renders finales. Cada piso, cada ángulo, exactamente la estética industrial que necesitábamos para el lanzamiento. Un trabajo excepcional.',
    },
    name: 'Tomás Mazzucco',
    role: { en: 'Founder, Iron Fitness', es: 'Fundador, Iron Fitness' },
    location: 'Córdoba, Argentina',
    projectSlug: 'iron-fitness-gym',
  },
  {
    quote: {
      en: 'The cabin interiors felt warm and real even before we broke ground. Guests ask if the photos are from the actual finished space — they are, but so were the renders.',
      es: 'Los interiores de las cabañas se sentían cálidos y reales antes de empezar la obra. Los huéspedes preguntan si las fotos son del espacio terminado — lo son, pero los renders también lo eran.',
    },
    name: 'Valentina Ríos',
    role: { en: 'Hospitality Owner', es: 'Propietaria, Alojamiento' },
    location: 'Entre Ríos, Argentina',
    projectSlug: 'cabanas-terraciello',
  },
  {
    quote: {
      en: 'We were nervous about designing a home remotely, but Somaz made every decision feel grounded. The floor plan, the materials, the light — all considered from day one.',
      es: 'Teníamos dudas sobre diseñar una casa de forma remota, pero Somaz hizo que cada decisión se sintiera fundada. La planta, los materiales, la luz — todo pensado desde el primer día.',
    },
    name: 'Carolina Vega',
    role: { en: 'Homeowner', es: 'Propietaria' },
    location: 'Santiago, Chile',
  },
  {
    quote: {
      en: 'I collaborate with several visualization studios. Somaz is the only one that thinks like a designer, not just a renderer. That difference shows in every image.',
      es: 'Colaboro con varios estudios de visualización. Somaz es el único que piensa como diseñador, no solo como renderizador. Esa diferencia se nota en cada imagen.',
    },
    name: 'Diego Ferraro',
    role: { en: 'Architect', es: 'Arquitecto' },
    location: 'Bogotá, Colombia',
  },
]
