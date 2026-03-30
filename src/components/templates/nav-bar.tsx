import { useState, useEffect } from "react";
import { SECTIONS, type SectionId } from "@/data/portfolio";

export function NavBar() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center backdrop-blur-md  py-(--space-nav-y) px-(--space-section-x)"
      style={{
        background: "var(--nav-gradient)",
      }}
    >
      <div className="nav-logo">SS</div>

      <div className="flex gap-(--space-nav-gap)">
        {SECTIONS.map((s) => (
          <span key={s} onClick={() => scrollTo(s)} className={`nav-link ${activeSection === s ? "active" : ""}`}>
            {s}
          </span>
        ))}
      </div>
    </nav>
  );
}
