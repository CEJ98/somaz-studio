'use client'

import Hero from '@/components/home/Hero'
import SelectedWork from '@/components/home/SelectedWork'
import Process from '@/components/home/Process'
import ServicesGrid from '@/components/home/ServicesGrid'
import SocialProof from '@/components/home/SocialProof'
import FinalCta from '@/components/home/FinalCta'
import FAQSection from '@/components/FAQSection'


export default function HomePageClient({ locale }: { locale: string }) {
  return (
    <>
      <Hero />
      <ServicesGrid locale={locale} />
      <SelectedWork />
      <Process />
      <SocialProof />
      <FAQSection locale={locale} />
      <FinalCta />
    </>
  )
}
