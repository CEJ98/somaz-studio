import localFont from 'next/font/local'

export const bodoniModa = localFont({
  variable: '--font-bodoni',
  display: 'swap',
  src: [
    { path: '../public/fonts/fraunces-normal-400.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/fraunces-normal-500.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/fraunces-normal-600.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/fraunces-italic-400.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/fraunces-italic-500.ttf', weight: '500', style: 'italic' },
    { path: '../public/fonts/fraunces-italic-600.ttf', weight: '600', style: 'italic' },
  ],
})

export const dmSans = localFont({
  variable: '--font-dm-sans',
  display: 'swap',
  src: [
    { path: '../public/fonts/inter-300.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/inter-400.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-500.ttf', weight: '500', style: 'normal' },
  ],
})
