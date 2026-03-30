import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { ConnectButton } from "@/components/common/connect-button";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-[100px] px-12 bg-bg border-t border-stroke-subtle overflow-hidden">
      <div className="absolute -right-[60px] -bottom-[60px] font-bebas text-[280px] text-white/[0.01] leading-none select-none pointer-events-none">04</div>
      <div className="relative z-10 max-w-[900px] mx-auto">
        <FadeIn>
          <SectionLabel label="04 / Contact" />
          <h2 className="font-bebas text-[clamp(48px,8vw,96px)] leading-[0.9] text-text mb-2 uppercase">
            LET'S CREATE
            <br />
            SOMETHING
          </h2>
          <div className="font-bebas text-[clamp(48px,8vw,96px)] leading-[0.9] text-transparent mb-12 uppercase" style={{ WebkitTextStroke: "1px #e8e8e825" }}>
            AWESOME
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="text-[13px] leading-[1.9] text-text-muted max-w-[400px] mb-10">Preferably with fewer bugs, faster queries, and more coffee. Reach out — I don't bite (most of the time).</p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-wrap gap-4">
            <ConnectButton href="https://www.linkedin.com/in/shanaim/" label="LinkedIn" />
            <ConnectButton href="https://github.com/ShaNaim/" label="GitHub" />
            <ConnectButton href="tel:+8801728420051" label="Phone" icon="↗" />
            <ConnectButton href="mailto:shanaim2k15@gmail.com" label="Email Me" icon="→" highlight isEmail />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
