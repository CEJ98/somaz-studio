'use client'

import Script from 'next/script'

export default function HowToJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get Started with 3D Architectural Visualization',
    description: 'A step-by-step guide to commissioning professional 3D visualization for architectural and interior design projects.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Define your project scope',
        text: 'Gather floor plans, reference images, material boards, and a project brief to share with the visualization studio.',
      },
      {
        '@type': 'HowToStep',
        name: 'Request a quote',
        text: 'Contact Somaz Studio via email or the contact form with your project details. Turnaround typically ranges from 48 hours for concepts to 2-3 weeks for detailed renders.',
      },
      {
        '@type': 'HowToStep',
        name: 'Review and iterate',
        text: 'Receive initial concepts and provide feedback. Somaz Studio refines the visuals until the result matches your vision.',
      },
      {
        '@type': 'HowToStep',
        name: 'Receive final deliverables',
        text: 'Get high-resolution images, animations, or interactive walks suitable for marketing, investor presentations, or design review.',
      },
    ],
    totalTime: 'P2W',
  }

  return (
    <Script
      id="howto-ldjson"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
