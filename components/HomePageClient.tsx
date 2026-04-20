'use client'

import Hero from '@/components/home/Hero'
import SelectedWork from '@/components/home/SelectedWork'
import Process from '@/components/home/Process'
import ServicesGrid from '@/components/home/ServicesGrid'
import SocialProof from '@/components/home/SocialProof'
import FinalCta from '@/components/home/FinalCta'
import TextureMarquee from '@/components/TextureMarquee'
import HorizontalScrollGallery from '@/components/HorizontalScrollGallery'
import FAQSection from '@/components/FAQSection'
import LeadMagnet from '@/components/home/LeadMagnet'

export default function HomePageClient({ locale }: { locale: string }) {
  return (
    <>
      <Hero />
      <TextureMarquee />
      <ServicesGrid locale={locale} />
      <SelectedWork />
      <Process />
      <HorizontalScrollGallery />
      <SocialProof />
      <LeadMagnet locale={locale} />
      <FAQSection locale={locale} />
      <FinalCta />
    </>
  )
}
