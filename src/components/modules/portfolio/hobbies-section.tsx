import { FadeIn } from "@/components/common/fade-in";
import { hobbies } from "@/data/portfolio/personal";

export function HobbiesSection() {
  return (
    <section
      style={{
        padding: "80px 48px",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 1,
              background: "var(--color-stroke-subtle)",
            }}
          >
            {hobbies.map(({ icon, label, desc }) => (
              <div
                key={label}
                style={{
                  background: "var(--color-bg)",
                  padding: "32px 24px",
                  textAlign: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-card)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-bg)")}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 17,
                    letterSpacing: "0.1em",
                    marginBottom: 4,
                    color: "var(--color-text)",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-faint)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
