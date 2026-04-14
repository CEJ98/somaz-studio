import Script from 'next/script'

const faqs = [
  {
    question: 'What is 3D architectural visualization?',
    answer: '3D visualization is the process of creating photorealistic digital images of architectural projects before they are built, helping with design decisions and marketing.',
  },
  {
    question: 'How long does a 3D visualization project take?',
    answer: 'Typical turnaround ranges from 48 hours for initial concepts to 2-3 weeks for fully detailed renders, depending on complexity. Rush delivery available.',
  },
  {
    question: 'Do you work with clients outside Miami?',
    answer: 'Yes, we work globally across the Americas, Europe, and Asia. We communicate in English and Spanish.',
  },
  {
    question: 'What information do you need to start?',
    answer: 'Floor plans, reference images, material preferences, and a project brief. We guide you through the process if you do not have everything ready.',
  },
  {
    question: 'Can you match a specific visual style?',
    answer: 'Absolutely. We analyze reference images and match specific aesthetics, lighting, and mood across contemporary, minimalist, luxury, and brutalist styles.',
  },
]

export default function FAQJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-ldjson"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
