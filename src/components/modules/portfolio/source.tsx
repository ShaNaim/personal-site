import { useState, useEffect, useRef } from "react";

const skills = {
  Languages: [
    { name: "TypeScript", level: 92, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
  ],
  "Libraries & Frameworks": [
    { name: "React", level: 94, color: "#61DAFB" },
    { name: "Next.js", level: 80, color: "#ffffff" },
    { name: "Vue.js", level: 72, color: "#4FC08D" },
    { name: "Node.js", level: 78, color: "#339933" },
    { name: "Express.js", level: 75, color: "#aaaaaa" },
  ],
  "Styling & UI": [
    { name: "Tailwind CSS", level: 93, color: "#38B2AC" },
    { name: "ShadCN/UI", level: 90, color: "#ffffff" },
  ],
  "Databases & Tools": [
    { name: "PostgreSQL", level: 76, color: "#4169E1" },
    { name: "MongoDB", level: 70, color: "#47A248" },
    { name: "Prisma", level: 80, color: "#a78bfa" },
    { name: "Zod", level: 88, color: "#3178C6" },
  ],
};

const coreCompetencies = ["Full-Stack Web Development", "Responsive UI/UX Design", "RESTful API Development & Integration", "Database Design & Optimization", "Performance Optimization", "Effective Collaboration & Communication"];

const softSkills = ["Problem Solving & Critical Thinking", "Adaptability & Quick Learning", "Teamwork & Collaboration", "Leadership & Decision Making"];

const experiences = [
  {
    title: "Software Developer",
    company: "LocalStaffing",
    period: "May 2025 – Present",
    current: true,
    points: [
      "Develop and maintain an advertising campaign management dashboard using React and TypeScript, implementing real-time filtering, scheduling, and budget tracking with TanStack Query for efficient server state synchronization.",
      "Engineer an AI-powered content generation feature within the email builder, leveraging the Anthropic API to dynamically suggest subject lines and body copy based on campaign context.",
      "Design and maintain reusable email templates using MJML, ensuring rendering consistency across major clients including Gmail and Outlook.",
      "Build and maintain a job recruitment platform, developing candidate-facing job listing interfaces with advanced search, filtering, and pagination, ensuring minimal re-fetches and optimistic UI updates.",
      "Implement a commission calculation and payment management module for recruitment workflows, handling complex multi-tier fee structures with real-time earnings breakdowns.",
      "Collaborate with backend developers to integrate REST APIs efficiently across multiple platforms, ensuring smooth data flow, real-time updates, and optimistic UI interactions.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Jukto Digital",
    period: "August 2023 – February 2026",
    current: false,
    points: [
      "Developed and maintained a Learning Management System (LMS) and a Student Management System (SMS) using React, ensuring seamless user experiences.",
      "Implemented minimalist and brutalist UI designs, balancing aesthetics with usability to create intuitive interfaces.",
      "Optimized application performance by improving load times, reducing render-blocking resources, and enhancing accessibility.",
      "Worked closely with backend developers to integrate APIs efficiently, ensuring smooth data flow and real-time updates.",
      "Designed and developed reusable React components, improving development efficiency and consistency across projects.",
      "Debugged and resolved UI/UX issues, enhancing responsiveness and cross-browser compatibility.",
      "Collaborated with product teams to refine user journeys, aligning development with business objectives.",
    ],
  },
];

const SECTIONS = ["home", "experience", "skills", "contact"];

type Direction = "up" | "down" | "left" | "right";

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

function AnimatedBar({ level, color, delay = 0 }: { level: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView(0.1);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(t);
    }
  }, [inView, level, delay]);
  return (
    <div ref={ref} style={{ height: "3px", background: "#1a1a1a", borderRadius: "2px", overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: color,
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </div>
  );
}

function FadeIn({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: Direction }) {
  const [ref, inView] = useInView();
  const transforms: Record<Direction, string> = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  const cursorTarget = useRef({ x: -100, y: -100 });
  const cursorDisplay = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorTarget.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      cursorDisplay.current.x = lerp(cursorDisplay.current.x, cursorTarget.current.x, 0.1);
      cursorDisplay.current.y = lerp(cursorDisplay.current.y, cursorTarget.current.y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorTarget.current.x - 4}px, ${cursorTarget.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cursorDisplay.current.x - 18}px, ${cursorDisplay.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll spy
  useEffect(() => {
    const map: Record<string, IntersectionObserver> = {};
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
      map[id] = obs;
    });
    return () => Object.values(map).forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{
        background: "#080808",
        color: "#e8e8e8",
        minHeight: "100vh",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #ff4d00; }
        ::selection { background: #ff4d00; color: #080808; }
        a, button { cursor: none !important; color: inherit; text-decoration: none; }
        .nav-link {
          cursor: none !important; font-size: 11px; letter-spacing: 0.15em;
          text-transform: uppercase; opacity: 0.38; transition: opacity 0.25s, color 0.25s;
        }
        .nav-link:hover { opacity: 0.9; }
        .nav-link.active { opacity: 1; color: #ff4d00; }
        .exp-card { border: 1px solid #161616; transition: border-color 0.3s, background 0.3s; }
        .exp-card:hover { border-color: #ff4d00; background: #0c0c0c; }
        .skill-row { display:flex; align-items:center; gap:16px; margin-bottom:20px; }
        .pill { display:inline-block; padding:3px 12px; border:1px solid #ff4d00; color:#ff4d00; font-size:10px; letter-spacing:0.12em; border-radius:2px; }
        .connect-btn {
          display:inline-flex; align-items:center; gap:8px; padding:10px 24px;
          border:1px solid #282828; font-family:inherit; font-size:11px;
          letter-spacing:0.15em; text-transform:uppercase;
          background:transparent; color:#e8e8e8; transition:all 0.2s;
        }
        .connect-btn:hover { border-color:#ff4d00; color:#ff4d00; background:#ff4d0010; }
        .section-label { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:#ff4d00; margin-bottom:12px; }
        .big-title { font-family:'Bebas Neue',sans-serif; line-height:0.9; color:#e8e8e8; }
        .divider { height:1px; background:linear-gradient(90deg,#ff4d00,#ff4d0020,transparent); }
        .timeline-line { position:absolute; left:0; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,#ff4d00,#1e1e1e); }
        .timeline-dot { position:absolute; left:-5px; top:28px; width:11px; height:11px; border-radius:50%; border:2px solid #ff4d00; background:#080808; }
        .current-dot { background:#ff4d00; box-shadow:0 0 14px #ff4d00; }
        .competency-row { display:flex; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid #0f0f0f; font-size:12px; color:#666; letter-spacing:0.03em; transition:color 0.2s; }
        .competency-row:hover { color:#ccc; }
        .competency-row:last-child { border-bottom:none; }
        .soft-tag { font-size:10px; padding:3px 10px; border:1px solid #181818; color:#444; letter-spacing:0.05em; border-radius:2px; transition:all 0.2s; }
        .soft-tag:hover { border-color:#2e2e2e; color:#777; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation:blink 1.2s infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>

      {/* Cursor dot — exact position, no lag */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#ff4d00",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />

      {/* Cursor ring — smooth lag, mix-blend for contrast */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid #ff4d0055",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to bottom, #080808f8, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.12em", color: "#ff4d00" }}>SS</div>
        <div style={{ display: "flex", gap: 36 }}>
          {SECTIONS.map((s) => (
            <span key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
              {s}
            </span>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: "linear-gradient(#ff4d00 1px, transparent 1px), linear-gradient(90deg, #ff4d00 1px, transparent 1px)",
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

        <div style={{ maxWidth: 960, position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
            <span className="pill">Full-Stack Developer</span>
            <span style={{ fontSize: 10, color: "#2e2e2e", letterSpacing: "0.2em" }}>· 2+ YRS EXPERIENCE</span>
          </div>

          <div className="big-title" style={{ fontSize: "clamp(72px, 12vw, 160px)", animation: "float 6s ease-in-out infinite" }}>
            SHANAIM
          </div>
          <div className="big-title" style={{ fontSize: "clamp(72px, 12vw, 160px)", WebkitTextStroke: "1px #e8e8e8", color: "transparent" }}>
            SHOUROV
          </div>

          <div className="divider" style={{ margin: "36px 0" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            {/* Bio + stats */}
            <div>
              <p style={{ fontSize: 13, lineHeight: 1.95, color: "#5a5a5a", marginBottom: 20 }}>
                I build end-to-end web applications — from pixel-precise interfaces to scalable backend integrations. I love <span style={{ color: "#c8c8c8" }}>minimalism</span> and <span style={{ color: "#c8c8c8" }}>brutalist design</span>
                , and I believe the best code is the kind nobody notices.
              </p>
              <p style={{ fontSize: 11, color: "#333", fontStyle: "italic", lineHeight: 1.7 }}>"If it works on my machine, it's officially your problem now."</p>
              <div style={{ marginTop: 32, display: "flex", gap: 32 }}>
                {[
                  { num: "2+", label: "Years" },
                  { num: "3", label: "Products" },
                  { num: "10+", label: "Tech Used" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#ff4d00", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.15em", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competencies */}
            <div>
              <div style={{ fontSize: 10, color: "#ff4d00", letterSpacing: "0.25em", marginBottom: 14, textTransform: "uppercase" }}>Core Competencies</div>
              {coreCompetencies.map((label) => (
                <div key={label} className="competency-row">
                  <span style={{ color: "#ff4d00", fontSize: 7 }}>⬡</span>
                  {label}
                </div>
              ))}

              <div style={{ fontSize: 10, color: "#2e2e2e", letterSpacing: "0.25em", margin: "20px 0 14px", textTransform: "uppercase" }}>Soft Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {softSkills.map((label) => (
                  <span key={label} className="soft-tag">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: 48, display: "flex", alignItems: "center", gap: 12, opacity: 0.25, fontSize: 10, letterSpacing: "0.25em" }}>
          <div style={{ width: 40, height: 1, background: "#ff4d00" }} />
          SCROLL
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "100px 48px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-label">02 / Experience</div>
            <div className="big-title" style={{ fontSize: "clamp(48px, 8vw, 96px)", marginBottom: 64 }}>
              WHERE I'VE
              <br />
              WORKED
            </div>
          </FadeIn>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div className="timeline-line" />
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 150} direction="left">
                <div style={{ position: "relative", marginBottom: 48 }}>
                  <div className={`timeline-dot ${exp.current ? "current-dot" : ""}`} />
                  <div className="exp-card" style={{ padding: "28px 32px", borderRadius: 2 }} onMouseEnter={() => setHoveredExp(i)} onMouseLeave={() => setHoveredExp(null)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#ff4d00", letterSpacing: "0.15em", marginBottom: 6 }}>{exp.company}</div>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.05em" }}>{exp.title}</div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "4px 12px",
                          border: "1px solid",
                          borderColor: exp.current ? "#ff4d00" : "#1e1e1e",
                          color: exp.current ? "#ff4d00" : "#333",
                          letterSpacing: "0.1em",
                          alignSelf: "flex-start",
                        }}
                      >
                        {exp.current && (
                          <span className="blink" style={{ marginRight: 6 }}>
                            ●
                          </span>
                        )}
                        {exp.period}
                      </span>
                    </div>
                    <div style={{ height: 1, background: "#111", marginBottom: 20 }} />
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", gap: 12, fontSize: 13, lineHeight: 1.7 }}>
                          <span style={{ color: "#ff4d00", marginTop: 2, flexShrink: 0 }}>→</span>
                          <span style={{ transition: "color 0.2s", color: hoveredExp === i ? "#aaa" : "#484848" }}>{pt}</span>
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

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 48px", background: "#050505", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.022,
            backgroundImage: "radial-gradient(#ff4d00 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <div className="section-label">03 / Skills</div>
            <div className="big-title" style={{ fontSize: "clamp(48px, 8vw, 96px)", marginBottom: 64 }}>
              WHAT I<br />
              BUILD WITH
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 48 }}>
            {Object.entries(skills).map(([category, items], ci) => (
              <FadeIn key={category} delay={ci * 100}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#ff4d00", marginBottom: 24, textTransform: "uppercase" }}>{category}</div>
                  {items.map((skill, si) => (
                    <div key={skill.name} className="skill-row">
                      <div style={{ minWidth: 120, fontSize: 12, letterSpacing: "0.05em", color: "#666" }}>{skill.name}</div>
                      <div style={{ flex: 1 }}>
                        <AnimatedBar level={skill.level} color={skill.color} delay={ci * 100 + si * 80} />
                      </div>
                      <div style={{ fontSize: 11, color: "#2e2e2e", minWidth: 32, textAlign: "right" }}>{skill.level}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTSIDE CODE ── */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "#111" }}>
              {[
                { icon: "🍔", label: "Burgers", desc: "Hardcore enthusiast" },
                { icon: "🎮", label: "Gaming", desc: "Part-time quest taker" },
                { icon: "🔭", label: "Astrophysics", desc: "Black holes & bugs" },
                { icon: "👨‍👩‍👧", label: "Family", desc: "Core side quest" },
              ].map(({ icon, label, desc }) => (
                <div
                  key={label}
                  style={{ background: "#080808", padding: "32px 24px", textAlign: "center", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#0d0d0d")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#080808")}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#2e2e2e", letterSpacing: "0.05em" }}>{desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 48px", borderTop: "1px solid #0e0e0e", position: "relative", overflow: "hidden" }}>
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
            <div className="section-label">04 / Contact</div>
            <div className="big-title" style={{ fontSize: "clamp(48px, 8vw, 96px)", marginBottom: 8 }}>
              LET'S CREATE
              <br />
              SOMETHING
            </div>
            <div
              className="big-title"
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                WebkitTextStroke: "1px #e8e8e825",
                color: "transparent",
                marginBottom: 48,
              }}
            >
              AWESOME
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize: 13, color: "#383838", marginBottom: 40, maxWidth: 400, lineHeight: 1.9 }}>Preferably with fewer bugs, faster queries, and more coffee. Reach out — I don't bite (most of the time).</p>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/shanaim/" target="_blank" rel="noreferrer">
                <button className="connect-btn">
                  <span>↗</span> LinkedIn
                </button>
              </a>
              <a href="https://www.instagram.com/shanaim_shourov/" target="_blank" rel="noreferrer">
                <button className="connect-btn">
                  <span>↗</span> Instagram
                </button>
              </a>
              <a href="mailto:shanaim2k15@gmail.com">
                <button className="connect-btn" style={{ borderColor: "#ff4d00", color: "#ff4d00" }}>
                  <span>→</span> Email Me
                </button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "24px 48px",
          borderTop: "1px solid #0e0e0e",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 11, color: "#222", letterSpacing: "0.1em" }}>© 2025 SHANAIM SHOUROV</span>
        <span style={{ fontSize: 11, color: "#222", letterSpacing: "0.1em" }}>BUILT WITH REACT + TYPESCRIPT</span>
        <span style={{ fontSize: 11, color: "#ff4d00", letterSpacing: "0.1em" }}>BANGLADESH 🇧🇩</span>
      </footer>
    </div>
  );
}
