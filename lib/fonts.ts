import { Fraunces, Inter } from 'next/font/google'

export const bodoniModa = Fraunces({
  subsets: ['latin'],
  variable: '--font-bodoni',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const dmSans = Inter({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})
