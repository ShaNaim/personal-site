import { FadeIn } from "@/components/common/fade-in";
import { hobbies } from "@/data/portfolio/personal";

const ABOUT_BLURB = `I'm a hardcore burger enthusiast and a part-time 😪 gamer, with an unexpected side quest in astrophysics (because let's be honest—debugging and black holes have a lot in common). When I'm not lost in code or contemplating the meaning of existence, you'll find me chilling with family, cracking jokes with friends, or plotting how to use technology to take over the world… or at least make my life slightly more convenient.`;

export function HobbiesSection() {
  return (
    <section className="py-20 px-12 bg-bg">
      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px bg-stroke-subtle border border-stroke-subtle">
            {hobbies.map(({ icon, label, desc }) => (
              <div key={label} className="group bg-bg py-8 px-6 text-center transition-colors duration-200 hover:bg-bg-card">
                <div className="text-[28px] mb-2.5 transition-transform duration-300 group-hover:-translate-y-1">{icon}</div>
                <h4 className="font-bebas text-[17px] tracking-[0.1em] text-text mb-1 uppercase">{label}</h4>
                <p className="text-[11px] text-text-faint tracking-wider leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] leading-[1.9] text-text-mid tracking-[0.03em] opacity-50 hover:opacity-100 transition-opacity duration-500">{ABOUT_BLURB}</p>
        </FadeIn>
      </div>
    </section>
  );
}
