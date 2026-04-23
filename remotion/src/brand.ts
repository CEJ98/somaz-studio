import { loadFont as loadInter } from '@remotion/google-fonts/Inter'
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces'

const { fontFamily: interFamily } = loadInter('normal', {
  weights: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

const { fontFamily: frauncesItalic } = loadFraunces('italic', {
  weights: ['400', '500', '600'],
  subsets: ['latin'],
})

const { fontFamily: frauncesRoman } = loadFraunces('normal', {
  weights: ['400', '500', '600'],
  subsets: ['latin'],
})

export const brand = {
  colors: {
    background: '#F8F6F2',
    foreground: '#1A1A1A',
    accent: '#8B6F47',
    surface: '#EAE7E0',
    border: '#C8C3B8',
  },
  fonts: {
    sans: interFamily,
    serif: frauncesItalic,
    serifRoman: frauncesRoman,
  },
  logo: '/logos/logo-smz.png',
  website: 'somazstudio.com',
} as const
