import { Pill } from "@/components/common/pill";
import { Divider } from "@/components/common/divider";
import { FadeIn } from "@/components/common/fade-in";
import { coreCompetencies, softSkills } from "@/data/portfolio/competencies";
import { heroStats } from "@/data/portfolio/personal";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-12 pt-[120px] pb-20 overflow-hidden">
      {/* Grid background - Pure CSS Logic via Tailwind arbitrary values */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-brand) 1px, transparent 1px), 
                            linear-gradient(90deg, var(--color-brand) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ghost number */}
      <div className="absolute -right-5 top-1/2 -translate-y-1/2 font-['Bebas_Neue'] text-[180px] md:text-[28vw] lg:text-[400px] text-white/[0.02] leading-none select-none pointer-events-none">01</div>

      {/* Content */}
      <div className="relative z-10 max-w-[960px]">
        {/* Badge row */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-7">
            <Pill>Full-Stack Developer</Pill>
            <span className="text-[10px] text-[var(--color-text-faint)] tracking-[0.2em] uppercase">· 2+ YRS EXPERIENCE</span>
          </div>
        </FadeIn>

        {/* Name */}
        <FadeIn delay={100}>
          <div className="font-['Bebas_Neue'] text-[72px] md:text-[12vw] lg:text-[160px] leading-[0.9] text-[var(--color-text)] animate-float">SHANAIM</div>
          <div className="font-['Bebas_Neue'] text-[72px] md:text-[12vw] lg:text-[160px] leading-[0.9] text-transparent" style={{ WebkitTextStroke: "1px var(--color-text)" }}>
            SHOUROV
          </div>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={200}>
          <Divider className="my-9" />
        </FadeIn>

        {/* Bio + Competencies */}
        <FadeIn delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            {/* Bio */}
            <div>
              <p className="text-[13px] leading-[1.95] text-[var(--color-text-muted)] mb-5">
                I build end-to-end web applications — from pixel-precise interfaces to scalable backend integrations. I love <span className="text-[var(--color-text)] font-medium">minimalism</span> and{" "}
                <span className="text-[var(--color-text)] font-medium">brutalist design</span>, and I believe the best code is the kind nobody notices.
              </p>
              <p className="text-[11px] text-[var(--color-text-dim)] italic leading-[1.7]">"If it works on my machine, it's officially your problem now."</p>

              {/* Stats */}
              <div className="mt-8 flex gap-8">
                {heroStats.map(({ num, label }) => (
                  <div key={label}>
                    <div className="font-['Bebas_Neue'] text-4xl text-[var(--color-brand)] leading-none">{num}</div>
                    <div className="text-[10px] text-[var(--color-text-dim)] tracking-[0.15em] mt-1 uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competencies */}
            <div>
              <div className="text-[10px] text-[var(--color-brand)] tracking-[0.25em] mb-3.5 uppercase">Core Competencies</div>

              {coreCompetencies.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-[10px] py-[9px] border-b border-[var(--color-bg-alt)] text-[12px] text-[var(--color-text-mid)] tracking-wide transition-colors duration-200 hover:text-[var(--color-text-muted)] cursor-default"
                >
                  <span className="text-[var(--color-brand)] text-[7px]">⬡</span>
                  {label}
                </div>
              ))}

              <div className="text-[10px] text-[var(--color-text-faint)] tracking-[0.25em] mt-5 mb-3.5 uppercase">Soft Skills</div>

              <div className="flex flex-wrap gap-2">
                {softSkills.map((label) => (
                  <span
                    key={label}
                    className="text-[10px] px-2.5 py-0.5 border border-[var(--color-stroke)] text-[var(--color-text-mid)] tracking-wider rounded-sm transition-all duration-200 hover:border-[var(--color-stroke-mid)] hover:text-[var(--color-text-muted)]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-12 flex items-center gap-3 opacity-25 text-[10px] tracking-[0.25em] text-[var(--color-text)]">
        <div className="w-10 h-[1px] bg-[var(--color-brand)]" />
        SCROLL
      </div>
    </section>
  );
}
