import Script from 'next/script'

export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Somaz Studio',
    image: 'https://somazstudio.com/logos/logo-white.png',
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
  }

  return (
    <Script
      id="local-business-ldjson"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
