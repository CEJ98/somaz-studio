export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://somazstudio.com',
    name: 'Somaz Studio',
    description: '3D visualization, interior design, and conceptual design studio based in Miami, FL. Working globally.',
    url: 'https://somazstudio.com',
    telephone: '+17865377682',
    email: 'hola@somazstudio.com',
    priceRange: '$$',
    image: 'https://somazstudio.com/og-image.jpg',
    logo: 'https://somazstudio.com/logos/logo-smz.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7617,
      longitude: -80.1918,
    },
    sameAs: [
      'https://instagram.com/somazstudio',
      'https://linkedin.com/company/somazstudio',
      'https://www.tiktok.com/@somazstudio',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '6',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Michael Kriger' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Somaz Studio turned our blueprints into renders so realistic that investors thought we were showing photos of a finished project. We closed funding two months ahead of schedule.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Paula Marchetti' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'They redesigned our penthouse remotely — every material, every detail felt intentional. The finished space matched the renders almost perfectly.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Tomás Mazzucco' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Fast, precise, and incredibly professional. Our gym rebranding needed photorealistic visuals in under a week — Somaz delivered in four days.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Rodrigo Estévez' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'The 3D visualization helped us sell 60% of units before breaking ground.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Carolina Vega' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Their conceptual design process helped us discover possibilities we never considered. What started as a simple renovation became the home we always dreamed of.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Diego Ferraro' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'The attention to lighting in their renders is unmatched. Every scene looked like a photograph from a design magazine.',
      },
    ],
  }

  // Hardcoded JSON-LD — no user input, safe for dangerouslySetInnerHTML
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
