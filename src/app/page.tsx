
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { JoinUsSection } from "@/components/sections/JoinUsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ResearchSection />
        <FoundersSection />
        <TeamSection />
        <JoinUsSection />
      </main>
      <Footer />
    </>
  );
}
