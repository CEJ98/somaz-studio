// Hardcoded JSON-LD schema — no user input, sanitization not required.
// Same pattern as OrganizationJsonLd and LocalBusinessJsonLd.
export default function ServiceJsonLd() {
  const services = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://somazstudio.com/services#3d-visualization',
      serviceType: '3D Architectural Visualization',
      name: '3D Visualization Essential',
      description:
        'Photorealistic 3D renders of architectural spaces — exterior, interior, single or multi-view. Standard delivery in 48–72h, rush 24h available.',
      provider: { '@type': 'ProfessionalService', '@id': 'https://somazstudio.com/#business' },
      areaServed: [
        { '@type': 'Place', name: 'Miami' },
        { '@type': 'Place', name: 'United States' },
        { '@type': 'Place', name: 'Latin America' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: 'https://somazstudio.com/services',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: 'Custom quote per project scope',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://somazstudio.com/services#interior-design',
      serviceType: 'Interior Design',
      name: 'Interior Design — Remote',
      description:
        'Full remote interior design service — space planning, material selection, furniture layouts, mood boards. Delivered as a complete spec package.',
      provider: { '@type': 'ProfessionalService', '@id': 'https://somazstudio.com/#business' },
      areaServed: [
        { '@type': 'Place', name: 'Miami' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: 'https://somazstudio.com/services',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: 'Custom quote per project scope',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://somazstudio.com/services#conceptual-design',
      serviceType: 'Conceptual Design',
      name: 'Conceptual Design',
      description:
        'Spatial concepts, volumetric studies, floor plan optimization and isometric representations for residential and commercial typologies.',
      provider: { '@type': 'ProfessionalService', '@id': 'https://somazstudio.com/#business' },
      areaServed: [{ '@type': 'Place', name: 'Worldwide' }],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: 'https://somazstudio.com/services',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: 'Custom quote per project scope',
        },
      },
    },
  ]

  const json = JSON.stringify(services)

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
