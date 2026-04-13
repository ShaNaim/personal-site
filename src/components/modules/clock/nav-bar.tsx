import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Menu, X } from "lucide-react";
import Logo from "@/assets/logo.svg?react";
import { ThemeToggle } from "@/components/common/theme-toggle";

export function ClockNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center backdrop-blur-md py-(--space-nav-y) px-(--space-section-x)" style={{ background: "var(--nav-gradient)" }}>
      <div className="nav-logo">
        <Logo height={32} width="auto" aria-label="Logo" />
      </div>

      <div className="flex items-center gap-(--space-nav-gap) ml-auto">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex items-center justify-center w-10 h-10 border border-stroke bg-transparent hover:border-brand hover:bg-brand-dim transition-all duration-300 cursor-none active:scale-95 group"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4 text-text group-hover:text-brand transition-colors" /> : <Menu className="w-4 h-4 text-text group-hover:text-brand transition-colors" />}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {menuOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-max border border-brand bg-background/95 backdrop-blur-md flex flex-col  ">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-mono uppercase tracking-widest text-text hover:text-brand hover:bg-brand-dim transition-all duration-200 border-b border-stroke group cursor-none"
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>Portfolio</span>
                <div className="ml-auto w-1 h-1 bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <div className="flex items-center justify-between px-4 py-3 gap-4">
                <span className="text-sm font-mono uppercase tracking-widest text-text-muted">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
