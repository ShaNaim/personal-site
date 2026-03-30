import { useState } from "react";
import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { SkillCategory } from "@/components/templates/skill-category";
import { skills, SKILL_LEGEND, getRange } from "@/data/portfolio/skills";

export function SkillsSection() {
  const [hoveredRange, setHoveredRange] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-[100px] px-12 bg-(--color-bg-alt)">
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--color-brand) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-[900px] mx-auto">
        <FadeIn>
          <SectionLabel label="03 / Skills" />
          <h2 className="font-['Bebas_Neue'] text-[48px] md:text-[8vw] lg:text-[96px] leading-[0.9] text-[var(--color-text)] mb-16 uppercase">
            WHAT I
            <br />
            BUILD WITH
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-12">
          {Object.entries(skills).map(([category, items], ci) => (
            <FadeIn key={category} delay={ci * 100}>
              <SkillCategory category={category} items={items} animationIndexOffset={ci} onSkillHover={(level: number | null) => setHoveredRange(level !== null ? getRange(level) : null)} />
            </FadeIn>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-20 pt-8 border-t border-(--color-stroke-subtle) flex flex-wrap gap-x-8 gap-y-3 transition-opacity duration-500">
          {SKILL_LEGEND.map(({ range, fun, pro }) => {
            const isActive = hoveredRange === range;
            return (
              <div key={range} className={`group w-52 flex items-center gap-2 transition-opacity duration-300 ${isActive ? "opacity-100" : hoveredRange ? "opacity-20" : "opacity-40"}`}>
                <span className={`text-[8px] transition-colors duration-300 ${isActive ? "text-(--color-brand)" : "text-(--color-text-muted)"}`}>●</span>
                <span className="inline-block text-(--size-section-label) tracking-widest uppercase">
                  <span className={`transition-colors duration-300 ${isActive ? "text-(--color-brand)" : "text-(--color-text-muted)"}`}>{range} </span>
                  <span className={`group-hover:hidden ${isActive ? "text-(--color-brand)" : "text-(--color-text-muted)"}`}>{fun}</span>
                  <span className={`hidden group-hover:inline ${isActive ? "text-(--color-brand)" : "text-(--color-text-muted)"}`}>{pro}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
