import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { SkillCategory } from "@/components/templates/skill-category";
import { skills } from "@/data/portfolio/skills";

export function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        padding: "100px 48px",
        background: "var(--color-bg-alt)",
        position: "relative",
      }}
    >
      {/* Dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.022,
          backgroundImage: "radial-gradient(var(--color-brand) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <SectionLabel label="03 / Skills" />
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 0.9,
              color: "var(--color-text)",
              marginBottom: 64,
            }}
          >
            WHAT I
            <br />
            BUILD WITH
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 48,
          }}
        >
          {Object.entries(skills).map(([category, items], ci) => (
            <FadeIn key={category} delay={ci * 100}>
              <SkillCategory category={category} items={items} animationIndexOffset={ci} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
