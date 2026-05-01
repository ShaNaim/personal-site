import { useState, useMemo } from "react";
import { format, subDays, parseISO } from "date-fns";
import { Scale, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { useWeightStore } from "@/hooks/use-weight-store";

import { WeightHeatmap, WeightInputDialog, WeightCalendar } from "@/components/modules/weight-manager";
import { WeightChart } from "@/components/modules/weight-manager/weight-chart";

function StatBlock({
  label,
  value,
  unit,
  sub,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-r border-stroke last:border-r-0 p-5 sm:p-7">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">{label}</span>
      <div className="flex items-end gap-1.5 mt-1">
        <span className="font-['Bebas_Neue'] text-[44px] sm:text-[56px] leading-none text-[var(--color-brand)]">
          {value}
        </span>
        {unit && (
          <span className="mb-1.5 font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
            {unit}
          </span>
        )}
      </div>
      {sub && <span className="font-mono text-[10px] text-[var(--color-text-dim)] truncate">{sub}</span>}
    </div>
  );
}

export function WeightManagerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { entries } = useWeightStore();

  const sortedEntries = useMemo(
    () => Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)),
    [entries],
  );
  const hasEntries = sortedEntries.length > 0;

  const latest = hasEntries ? sortedEntries[sortedEntries.length - 1] : null;
  const minEntry = hasEntries ? sortedEntries.reduce((a, b) => (b[1] < a[1] ? b : a)) : null;
  const maxEntry = hasEntries ? sortedEntries.reduce((a, b) => (b[1] > a[1] ? b : a)) : null;

  const delta =
    sortedEntries.length >= 2
      ? sortedEntries[sortedEntries.length - 1][1] - sortedEntries[sortedEntries.length - 2][1]
      : null;

  let streak = 0;
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  const startKey =
    entries[today] !== undefined ? today : entries[yesterday] !== undefined ? yesterday : null;
  if (startKey) {
    let cursor = parseISO(startKey);
    while (entries[format(cursor, "yyyy-MM-dd")] !== undefined) {
      streak++;
      cursor = subDays(cursor, 1);
    }
  }

  const DeltaIcon = delta === null ? Minus : delta > 0 ? TrendingUp : TrendingDown;
  const deltaColor =
    delta === null ? "text-[var(--color-text-muted)]" : delta > 0 ? "text-red-400" : "text-emerald-400";

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ════════════════════════════════════════════
          HERO — cyber-grid background, Bebas Neue
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-stroke pt-[72px]">
        {/* Animated cyber grid */}
        <div className="cyber-grid absolute inset-0" />

        {/* Ghost "WM" behind title */}
        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-['Bebas_Neue'] text-[22vw] leading-none text-[var(--color-text)] opacity-[0.015] sm:text-[18vw]">
          WM
        </div>

        <div className="relative px-6 pb-10 pt-12 sm:px-12">
          {/* Eyebrow */}
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-brand)]">
            Health · Tracker · v1
          </div>

          {/* Title */}
          <div className="flex flex-col gap-0 leading-none">
            <span className="font-['Bebas_Neue'] text-[72px] leading-[0.88] text-[var(--color-text)] sm:text-[10vw] lg:text-[120px]">
              Weight
            </span>
            <span
              className="font-['Bebas_Neue'] text-[72px] leading-[0.88] text-transparent sm:text-[10vw] lg:text-[120px]"
              style={{ WebkitTextStroke: "1px var(--color-text)" }}
            >
              Manager
            </span>
          </div>

          {/* Bottom row: date + CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
              {format(new Date(), "EEEE · MMMM d, yyyy")}
            </span>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="group relative flex w-fit items-center gap-3 border border-stroke px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)] transition-all duration-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-brand-dim)] cursor-none"
            >
              <Scale className="h-3.5 w-3.5 shrink-0" />
              Log Today's Weight
              <div className="absolute right-0 top-0 h-1.5 w-1.5 bg-[var(--color-brand)] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS STRIP — 4-col brutalist grid
      ════════════════════════════════════════════ */}
      {hasEntries && (
        <section className="border-b border-stroke">
          <div className="grid grid-cols-2 border-stroke md:grid-cols-4">
            <StatBlock
              label="Latest"
              value={latest ? latest[1].toFixed(1) : "—"}
              unit={latest ? "kg" : undefined}
              sub={
                delta !== null
                  ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)} kg from prev`
                  : latest
                    ? format(parseISO(latest[0]), "MMM d")
                    : undefined
              }
            />
            <StatBlock
              label="Lowest"
              value={minEntry ? minEntry[1].toFixed(1) : "—"}
              unit={minEntry ? "kg" : undefined}
              sub={minEntry ? format(parseISO(minEntry[0]), "MMM d, yyyy") : undefined}
            />
            <StatBlock
              label="Highest"
              value={maxEntry ? maxEntry[1].toFixed(1) : "—"}
              unit={maxEntry ? "kg" : undefined}
              sub={maxEntry ? format(parseISO(maxEntry[0]), "MMM d, yyyy") : undefined}
            />
            <StatBlock
              label="Streak"
              value={streak > 0 ? String(streak) : "0"}
              unit={streak > 0 ? "days" : undefined}
              sub={streak > 0 ? "consecutive days logged" : "start logging to build a streak"}
            />
          </div>

          {/* Delta bar */}
          {delta !== null && (
            <div className="flex items-center gap-3 border-t border-stroke px-6 py-3 sm:px-12">
              <DeltaIcon className={`h-3.5 w-3.5 shrink-0 ${deltaColor}`} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                {delta === 0
                  ? "No change from previous entry"
                  : `${delta > 0 ? "+" : ""}${delta.toFixed(1)} kg since last log`}
              </span>
            </div>
          )}
        </section>
      )}

      {/* ════════════════════════════════════════════
          CALENDAR
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-4 sm:px-12">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-brand)]">
            Calendar
          </span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="hidden font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-dim)] sm:block">
            click any date to log · dropdowns to jump month
          </span>
        </div>
        <WeightCalendar onSelectDate={setSelectedDate} />
      </section>

      {/* ════════════════════════════════════════════
          PROGRESS CHART
      ════════════════════════════════════════════ */}
      {hasEntries && (
        <section className="border-b border-stroke">
          <div className="flex items-center gap-4 border-b border-stroke px-6 py-4 sm:px-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-brand)]">
              Progress
            </span>
            <div className="h-px flex-1 bg-stroke" />
          </div>
          <div className="px-6 py-8 sm:px-12">
            <WeightChart />
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          26-WEEK HEATMAP
      ════════════════════════════════════════════ */}
      {hasEntries && (
        <section>
          <div className="flex items-center gap-4 border-b border-stroke px-6 py-4 sm:px-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-brand)]">
              26-Week Activity
            </span>
            <div className="h-px flex-1 bg-stroke" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                streak
              </span>
              <span className="font-['Bebas_Neue'] text-xl leading-none text-[var(--color-brand)]">
                {streak > 0 ? `${streak}d` : "—"}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto px-6 py-8 sm:px-12">
            <WeightHeatmap />
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          EMPTY STATE
      ════════════════════════════════════════════ */}
      {!hasEntries && (
        <section className="flex flex-col items-center gap-8 px-6 py-28 text-center border-b border-stroke">
          {/* Ghost number */}
          <div className="pointer-events-none select-none font-['Bebas_Neue'] text-[180px] leading-none text-[var(--color-text)] opacity-[0.03]">
            00
          </div>

          <div className="-mt-16 flex flex-col items-center gap-4">
            <Scale className="h-10 w-10 text-[var(--color-text-dim)]" />
            <div>
              <p className="font-['Bebas_Neue'] text-4xl uppercase tracking-widest text-[var(--color-text-muted)]">
                No Data Yet
              </p>
              <p className="mt-2 font-mono text-sm text-[var(--color-text-muted)]">
                Click any date on the calendar to start tracking.
              </p>
            </div>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="group relative mt-2 flex items-center gap-3 border border-stroke px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)] transition-all hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-brand-dim)] cursor-none"
            >
              <Scale className="h-3.5 w-3.5 shrink-0" />
              Log first entry
              <div className="absolute right-0 top-0 h-1.5 w-1.5 bg-[var(--color-brand)] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </section>
      )}

      <WeightInputDialog date={selectedDate} onClose={() => setSelectedDate(null)} />
    </div>
  );
}
