export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-12 py-6 bg-[var(--color-bg)] border-t border-[var(--color-stroke-subtle)]">
      {/* Copyright */}
      <span className="text-[11px] text-[var(--color-stroke)] tracking-widest uppercase">© 2025 SHANAIM SHOUROV</span>

      {/* Tech Stack Info */}
      <span className="text-[11px] text-[var(--color-stroke)] tracking-widest uppercase">BUILT WITH REACT + TYPESCRIPT</span>

      {/* Location Branding */}
      <span className="text-[11px] text-[var(--color-brand)] tracking-widest uppercase">BANGLADESH 🇧🇩</span>
    </footer>
  );
}
