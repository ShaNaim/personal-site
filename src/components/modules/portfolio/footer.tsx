import FlipClock from "@/components/ui/flip-clock";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-12 py-6 bg-bg border-t border-stroke-subtle">
      <span className="text-[11px] text-muted tracking-widest uppercase">© 2025 SHANAIM SHOUROV 🇧🇩</span>
      <span className="text-[11px] text-muted tracking-widest uppercase">BUILT WITH REACT + TYPESCRIPT</span>
      <FlipClock size={"xs"} variant={"muted"} />
    </footer>
  );
}
