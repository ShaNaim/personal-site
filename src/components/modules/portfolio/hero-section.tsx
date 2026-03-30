import { Pill } from "@/components/common/pill";
import { Divider } from "@/components/common/divider";
import { FadeIn } from "@/components/common/fade-in";
import { coreCompetencies, softSkills } from "@/data/portfolio/competencies";
import { heroStats } from "@/data/portfolio/personal";

export function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 48px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "linear-gradient(var(--color-brand) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Ghost number */}
      <div
        style={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(180px, 28vw, 400px)",
          color: "#ffffff02",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        01
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, position: "relative", zIndex: 1 }}>
        {/* Badge row */}
        <FadeIn>
          <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
            <Pill>Full-Stack Developer</Pill>
            <span
              style={{
                fontSize: 10,
                color: "var(--color-text-faint)",
                letterSpacing: "0.2em",
              }}
            >
              · 2+ YRS EXPERIENCE
            </span>
          </div>
        </FadeIn>

        {/* Name */}
        <FadeIn delay={100}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 12vw, 160px)",
              lineHeight: 0.9,
              color: "var(--color-text)",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            SHANAIM
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 12vw, 160px)",
              lineHeight: 0.9,
              WebkitTextStroke: "1px var(--color-text)",
              color: "transparent",
            }}
          >
            SHOUROV
          </div>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={200}>
          <Divider style={{ margin: "36px 0" }} />
        </FadeIn>

        {/* Bio + Competencies */}
        <FadeIn delay={300}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "start",
            }}
          >
            {/* Bio */}
            <div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.95,
                  color: "var(--color-text-muted)",
                  marginBottom: 20,
                }}
              >
                I build end-to-end web applications — from pixel-precise interfaces to scalable backend integrations. I love <span style={{ color: "var(--color-text)" }}>minimalism</span> and{" "}
                <span style={{ color: "var(--color-text)" }}>brutalist design</span>, and I believe the best code is the kind nobody notices.
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--color-text-dim)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                "If it works on my machine, it's officially your problem now."
              </p>

              {/* Stats */}
              <div style={{ marginTop: 32, display: "flex", gap: 32 }}>
                {heroStats.map(({ num, label }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 40,
                        color: "var(--color-brand)",
                        lineHeight: 1,
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--color-text-dim)",
                        letterSpacing: "0.15em",
                        marginTop: 4,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competencies */}
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--color-brand)",
                  letterSpacing: "0.25em",
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                Core Competencies
              </div>

              {coreCompetencies.map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 0",
                    borderBottom: "1px solid var(--color-bg-alt)",
                    fontSize: 12,
                    color: "var(--color-text-mid)",
                    letterSpacing: "0.03em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-mid)")}
                >
                  <span style={{ color: "var(--color-brand)", fontSize: 7 }}>⬡</span>
                  {label}
                </div>
              ))}

              <div
                style={{
                  fontSize: 10,
                  color: "var(--color-text-faint)",
                  letterSpacing: "0.25em",
                  margin: "20px 0 14px",
                  textTransform: "uppercase",
                }}
              >
                Soft Skills
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {softSkills.map((label) => (
                  <span
                    key={label}
                    style={{
                      fontSize: 10,
                      padding: "3px 10px",
                      border: "1px solid var(--color-stroke)",
                      color: "var(--color-text-mid)",
                      letterSpacing: "0.05em",
                      borderRadius: "2px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-stroke-mid)";
                      e.currentTarget.style.color = "var(--color-text-muted)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-stroke)";
                      e.currentTarget.style.color = "var(--color-text-mid)";
                    }}
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
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: 0.25,
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "var(--color-text)",
        }}
      >
        <div style={{ width: 40, height: 1, background: "var(--color-brand)" }} />
        SCROLL
      </div>
    </section>
  );
}
