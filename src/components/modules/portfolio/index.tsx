import { HeroSection } from "@/components/modules/portfolio/hero-section";
import { ExperienceSection } from "@/components/modules/portfolio/experience-section";
import { SkillsSection } from "@/components/modules/portfolio/skills-section";
import { HobbiesSection } from "@/components/modules/portfolio/hobbies-section";
import { ContactSection } from "@/components/modules/portfolio/contact-section";

export default function Portfolio() {
  return (
    <div className="bg-(--color-bg) text-(--color-text) min-h-screen font-mono overflow-x-hidden cursor-none">
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <HobbiesSection />
        <ContactSection />
      </main>
    </div>
  );
}
