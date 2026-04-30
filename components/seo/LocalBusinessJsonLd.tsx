export default function LocalBusinessJsonLd() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://somazstudio.com/#business',
    name: 'Somaz Studio',
    description: 'Architecture, interiors, and visualization studio based in Miami, serving residential, commercial, and hospitality projects.',
    url: 'https://somazstudio.com',
    telephone: '+17865377682',
    email: 'hola@somazstudio.com',
    priceRange: '$$',
    image: 'https://somazstudio.com/og-image.jpg',
    logo: 'https://somazstudio.com/logos/logo-smz.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Miami, FL (Service Area Business)',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33131',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.76170,
      longitude: -80.19180,
    },
    areaServed: [
      { '@type': 'City', name: 'Miami' },
      { '@type': 'State', name: 'Florida' },
      { '@type': 'Country', name: 'United States' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/somazstudio',
      'https://www.linkedin.com/company/somazstudio',
      'https://www.tiktok.com/@somazstudio',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Architecture and Design Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Architecture', description: 'Architecture service for residential, commercial, and hospitality projects.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Visualization', description: 'Photorealistic architectural renders. Essential (1 view) in 48–72h, Rush 24h available.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Design', description: 'Full interior design from concept to material specification.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conceptual Design', description: 'Spatial concept development and design direction.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Design Consulting', description: 'Strategic design guidance for projects that need clearer decisions.' } },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://somazstudio.com/#website',
    url: 'https://somazstudio.com',
    name: 'Somaz Studio',
    publisher: { '@id': 'https://somazstudio.com/#business' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://somazstudio.com/en/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Hardcoded JSON-LD — no user input, safe for dangerouslySetInnerHTML
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
