import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesOverviewSection from "@/components/sections/ServicesOverviewSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutTeaserSection from "@/components/sections/AboutTeaserSection";
import ContactCTASection from "@/components/sections/ContactCTASection";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

const ease = [0.22, 1, 0.36, 1] as const

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <FeaturedProjectsSection />
      <ServicesOverviewSection />
      <StatsSection />
      <AboutTeaserSection />
      <ContactCTASection />
    </>
  );
}
