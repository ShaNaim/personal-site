import { useState } from "react";
import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { experiences } from "@/data/portfolio/experience";

export function ExperienceSection() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <section
      id="experience"
      style={{
        padding: "100px 48px",
        position: "relative",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="02 / Experience" />
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 0.9,
              color: "var(--color-text)",
              marginBottom: 64,
            }}
          >
            WHERE I'VE
            <br />
            WORKED
          </div>
        </FadeIn>

        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--color-brand), var(--color-stroke))",
            }}
          />

          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 150} direction="left">
              <div style={{ position: "relative", marginBottom: 48 }}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -5,
                    top: 28,
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    border: "2px solid var(--color-brand)",
                    background: exp.current ? "var(--color-brand)" : "var(--color-bg)",
                    boxShadow: exp.current ? "0 0 14px var(--color-brand)" : "none",
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    padding: "28px 32px",
                    borderRadius: 2,
                    border: `1px solid ${hoveredExp === i ? "var(--color-brand)" : "var(--color-stroke)"}`,
                    background: hoveredExp === i ? "var(--color-bg-card)" : "transparent",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={() => setHoveredExp(i)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  {/* Card header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--color-brand)",
                          letterSpacing: "0.15em",
                          marginBottom: 6,
                        }}
                      >
                        {exp.company}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 28,
                          letterSpacing: "0.05em",
                          color: "var(--color-text)",
                        }}
                      >
                        {exp.title}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: 11,
                        padding: "4px 12px",
                        border: "1px solid",
                        borderColor: exp.current ? "var(--color-brand)" : "var(--color-stroke)",
                        color: exp.current ? "var(--color-brand)" : "var(--color-text-dim)",
                        letterSpacing: "0.1em",
                        alignSelf: "flex-start",
                      }}
                    >
                      {exp.current && (
                        <span
                          style={{
                            marginRight: 6,
                            animation: "blink 1.2s infinite",
                          }}
                        >
                          ●
                        </span>
                      )}
                      {exp.period}
                    </span>
                  </div>

                  <div
                    style={{
                      height: 1,
                      background: "var(--color-stroke-subtle)",
                      marginBottom: 20,
                    }}
                  />

                  {/* Points */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, fontSize: 13, lineHeight: 1.7 }}>
                        <span
                          style={{
                            color: "var(--color-brand)",
                            marginTop: 2,
                            flexShrink: 0,
                          }}
                        >
                          →
                        </span>
                        <span
                          style={{
                            color: hoveredExp === i ? "var(--color-text-muted)" : "#484848",
                            transition: "color 0.2s",
                          }}
                        >
                          {pt}
                        </span>
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
