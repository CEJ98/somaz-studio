import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesOverviewSection from "@/components/sections/ServicesOverviewSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutTeaserSection from "@/components/sections/AboutTeaserSection";
import ContactCTASection from "@/components/sections/ContactCTASection";

export default function Home() {
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
