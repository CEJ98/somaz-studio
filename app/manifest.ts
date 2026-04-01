import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Somaz Studio',
    short_name: 'Somaz',
    description: 'Miami-based design studio. 3D visualization, interior design, and spatial concepts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1C1C1A',
    theme_color: '#1C1C1A',
    icons: [
      {
        src: '/logos/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logos/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
