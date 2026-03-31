export interface Testimonial {
  quote: string
  name: string
  role: string
  location: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Somaz Studio turned our blueprints into renders so realistic that investors thought we were showing photos of a finished project. We closed funding two months ahead of schedule.',
    name: 'Michael Kriger',
    role: 'Real Estate Developer',
    location: 'Miami, FL',
  },
  {
    quote: 'They redesigned our penthouse remotely — every material, every detail felt intentional. The finished space matched the renders almost perfectly. I still can\'t believe it was done from another country.',
    name: 'Paula Marchetti',
    role: 'Private Client',
    location: 'Buenos Aires, Argentina',
  },
  {
    quote: 'Fast, precise, and incredibly professional. Our gym rebranding needed photorealistic visuals in under a week — Somaz delivered in four days and nailed the industrial aesthetic we were after.',
    name: 'Tomás Mazzucco',
    role: 'Founder, Iron Fitness',
    location: 'Córdoba, Argentina',
  },
]
