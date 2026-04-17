export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Somaz Studio',
    description: 'Miami-based design studio specializing in 3D architectural visualization, interior design, and spatial concepts. Working globally in English and Spanish.',
    image: 'https://somazstudio.com/logos/logo-smz.png',
    url: 'https://somazstudio.com',
    telephone: '+1-786-537-7682',
    email: 'hola@somazstudio.com',
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$$$',
    serviceType: ['3D Visualization', 'Interior Design', 'Conceptual Design', 'Design Consulting'],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    sameAs: [
      'https://www.instagram.com/somazstudio',
      'https://www.linkedin.com/company/somazstudio',
      'https://www.tiktok.com/@somazstudio',
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
