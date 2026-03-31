import HomeClient from '@/components/HomeClient'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Somaz Studio',
  description: 'Miami-based design studio specializing in 3D visualization, interior design, and spatial concepts.',
  url: 'https://somazstudio.com',
  email: 'hola@somazstudio.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: 'Worldwide',
  serviceType: ['3D Visualization', 'Interior Design', 'Conceptual Design', 'Design Consulting'],
  sameAs: [
    'https://instagram.com/somazstudio',
    'https://linkedin.com/company/somazstudio',
  ],
}

const jsonLdString = JSON.stringify(jsonLd)

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      <HomeClient featuredProjects={projects.slice(0, 3)} services={services} />
    </>
  )
}
