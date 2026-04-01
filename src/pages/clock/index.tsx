import { useEffect } from "react";
import { ClockCard } from "@/components/modules/clock/clock-card";
import { CitySearch } from "@/components/modules/clock/city-search";
import { useClockStore, startGlobalTicker } from "@/stores/clock-store";
export default function ClockPage() {
  const clocks = useClockStore((s) => s.clocks);

  // Start the global ticker once when this page mounts
  useEffect(() => {
    startGlobalTicker();
  }, []);

  return (
    <main className="min-h-screen bg-bg px-[var(--space-section-x)] py-32">
      {/* Page header */}
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <div className="text-label tracking-[0.3em] uppercase text-brand mb-3">World Clocks</div>
            <h1 className="font-bebas text-[clamp(48px,8vw,96px)] leading-[0.9] text-text uppercase">NAN O'CLOCK</h1>
          </div>
          <CitySearch />
        </div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{
            background: "linear-gradient(90deg, var(--color-brand), var(--color-brand-dim), transparent)",
          }}
        />

        {/* Clock grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clocks.map((entry) => (
            <ClockCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* Empty state — only local clock showing */}
        {clocks.length === 1 && (
          <div className="mt-12 text-center">
            <p className="text-[11px] text-text-faint tracking-[0.2em] uppercase">Add a city to compare timezones</p>
          </div>
        )}
      </div>
    </main>
  );
}
