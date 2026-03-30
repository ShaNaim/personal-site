import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { experiences } from "@/data/portfolio/experience";

export function ExperienceSection() {
  // Removed useState: We'll use Tailwind's 'group' utility for hover states instead.

  return (
    <section id="experience" className="relative py-[100px] px-12 bg-[var(--color-bg)]">
      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          <SectionLabel label="02 / Experience" />
          <h2 className="font-['Bebas_Neue'] text-[48px] md:text-[8vw] lg:text-[96px] leading-[0.9] text-[var(--color-text)] mb-16 uppercase">
            WHERE I'VE
            <br />
            WORKED
          </h2>
        </FadeIn>

        <div className="relative pl-10">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(to bottom, var(--color-brand), var(--color-stroke))" }} />

          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 150} direction="left">
              <div className="group relative mb-12">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[45px] top-7 w-[11px] h-[11px] rounded-full border-2 border-[var(--color-brand)] transition-all duration-300
                    ${exp.current ? "bg-[var(--color-brand)] shadow-[0_0_14px_var(--color-brand)]" : "bg-[var(--color-bg)]"}
                    group-hover:scale-125`}
                />

                {/* Card */}
                <div className="p-7 md:p-8 rounded-[2px] border border-[var(--color-stroke)] bg-transparent transition-all duration-300 group-hover:border-[var(--color-brand)] group-hover:bg-[var(--color-bg-card)]">
                  {/* Card header */}
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
                    <div>
                      <div className="text-[11px] text-[var(--color-brand)] tracking-[0.15em] mb-1.5 uppercase">{exp.company}</div>
                      <div className="font-['Bebas_Neue'] text-[28px] tracking-[0.05em] text-[var(--color-text)] uppercase">{exp.title}</div>
                    </div>

                    <span
                      className={`text-[11px] px-3 py-1 border tracking-[0.1em] self-start flex items-center
                        ${exp.current ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "border-[var(--color-stroke)] text-[var(--color-text-dim)]"}`}
                    >
                      {exp.current && <span className="mr-1.5 animate-pulse">●</span>}
                      {exp.period}
                    </span>
                  </div>

                  <div className="h-[1px] bg-[var(--color-stroke-subtle)] mb-5" />

                  {/* Points */}
                  <ul className="flex flex-col gap-3 list-none">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 text-[13px] leading-[1.7]">
                        <span className="text-[var(--color-brand)] shrink-0 mt-0.5">→</span>
                        <span className="text-[#484848] transition-colors duration-200 group-hover:text-[var(--color-text-muted)]">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
