import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { ConnectButton } from "@/components/common/connect-button";

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: "100px 48px",
        borderTop: "1px solid var(--color-stroke-subtle)",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Ghost number */}
      <div
        style={{
          position: "absolute",
          right: -60,
          bottom: -60,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 280,
          color: "#ffffff02",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        04
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <SectionLabel label="04 / Contact" />
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 0.9,
              color: "var(--color-text)",
              marginBottom: 8,
            }}
          >
            LET'S CREATE
            <br />
            SOMETHING
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 0.9,
              WebkitTextStroke: "1px #e8e8e825",
              color: "transparent",
              marginBottom: 48,
            }}
          >
            AWESOME
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-muted)",
              marginBottom: 40,
              maxWidth: 400,
              lineHeight: 1.9,
            }}
          >
            Preferably with fewer bugs, faster queries, and more coffee. Reach out — I don't bite (most of the time).
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <ConnectButton href="https://www.linkedin.com/in/shanaim/" label="LinkedIn" />
            <ConnectButton href="https://www.instagram.com/shanaim_shourov/" label="Instagram" />
            <ConnectButton href="mailto:shanaim2k15@gmail.com" label="Email Me" icon="→" highlight isEmail />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
