import { HeroContainer } from "@/components/public/hero";
import { AboutSection } from "@/components/public/sections/AboutSection";
import { RoadmapSection } from "@/components/public/sections/RoadmapSection";
import { LocationsSection } from "@/components/public/sections/LocationsSection";
import { AdvantagesSection } from "@/components/public/sections/AdvantagesSection";
import { OfferingsSection } from "@/components/public/sections/OfferingsSection";
import { SectionContainer, SectionHeader } from "@/components/public/sections";
import { FadeIn } from "@/components/animations/FadeIn";

export default function HomePage() {
  return (
    <main>
      <HeroContainer />
      <AboutSection />
      <RoadmapSection />
      <LocationsSection />
      <AdvantagesSection />
      <OfferingsSection />

      {/* Additional sections can be added here */}
      {/* <ServicesSection />
      <AboutPreview />
      <CTASection />
      <Footer /> */}
    </main>
  );
}
