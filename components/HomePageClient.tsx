'use client'

import Hero from '@/components/home/Hero'
import SelectedWork from '@/components/home/SelectedWork'
import Process from '@/components/home/Process'
import ServicesGrid from '@/components/home/ServicesGrid'
import SocialProof from '@/components/home/SocialProof'
import FinalCta from '@/components/home/FinalCta'
import MarqueeStrip from '@/components/MarqueeStrip'

export default function HomePageClient({ locale }: { locale: string }) {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <SelectedWork />
      <Process />
      <ServicesGrid locale={locale} />
      <SocialProof />
      <FinalCta />
    </>
  )
}
