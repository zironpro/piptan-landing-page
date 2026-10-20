import HeroSection from "./sections/hero";
import {
  MandateSection,
  CorridorsSection,
  GovernanceSection,
  ProcessSection,
  ContactSection,
  PanoramaSection,
} from "@/feature/home/sections/properties";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#08080a" }}>
      <HeroSection />
      <MandateSection />
      <CorridorsSection />
      <GovernanceSection />
      <PanoramaSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}