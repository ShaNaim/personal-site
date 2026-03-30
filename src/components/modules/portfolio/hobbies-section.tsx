import { FadeIn } from "@/components/common/fade-in";
import { hobbies } from "@/data/portfolio/personal";

export function HobbiesSection() {
  return (
    <section className="py-20 px-12 bg-[var(--color-bg)]">
      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          {/* Grid Border Trick: 
            Using gap-px (1px) with a subtle background color 
            makes the gap look like a thin internal border.
          */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px bg-[var(--color-stroke-subtle)] border border-[var(--color-stroke-subtle)]">
            {hobbies.map(({ icon, label, desc }) => (
              <div key={label} className="group bg-[var(--color-bg)] py-8 px-6 text-center transition-colors duration-200 hover:bg-[var(--color-bg-card)]">
                {/* Icon with subtle lift on hover */}
                <div className="text-[28px] mb-2.5 transition-transform duration-300 group-hover:-translate-y-1">{icon}</div>

                <h4 className="font-['Bebas_Neue'] text-[17px] tracking-[0.1em] text-[var(--color-text)] mb-1 uppercase">{label}</h4>

                <p className="text-[11px] text-[var(--color-text-faint)] tracking-wider leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
