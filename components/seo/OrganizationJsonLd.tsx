import Script from 'next/script'

export default function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Somaz Studio',
    url: 'https://somazstudio.com',
    logo: 'https://somazstudio.com/logos/logo-white.png',
    description: 'Miami-based design studio specializing in 3D visualization, interior design, and spatial concepts.',
    email: 'hola@somazstudio.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.instagram.com/somazstudio',
      'https://www.linkedin.com/company/somazstudio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-786-537-7682',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish'],
    },
  }

  return (
    <Script
      id="organization-ldjson"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
