export default function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Somaz Studio',
    url: 'https://somazstudio.com',
    logo: 'https://somazstudio.com/logos/logo-smz.png',
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
      'https://www.tiktok.com/@somazstudio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+17865377682',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish'],
    },
  }

  return (
    <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  )
}
