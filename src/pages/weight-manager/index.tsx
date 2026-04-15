import { useState } from "react";
import { Scale } from "lucide-react";
import { format, subDays, parseISO } from "date-fns";
import { useWeightStore } from "@/hooks/use-weight-store";

import { SectionLabel } from "@/components/common/section-label";
import { Button } from "@/components/ui/button";

import { WeightStats, WeightHeatmap, WeightInputDialog, WeightCalendar } from "@/components/modules/weight-manager";

export function WeightManagerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { entries } = useWeightStore();

  const hasAnyEntry = Object.keys(entries).length > 0;

  let streak = 0;
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  const startKey = entries[today] !== undefined ? today : entries[yesterday] !== undefined ? yesterday : null;

  if (startKey) {
    let cursor = parseISO(startKey);
    while (entries[format(cursor, "yyyy-MM-dd")] !== undefined) {
      streak++;
      cursor = subDays(cursor, 1);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <SectionLabel>Health</SectionLabel>
          <h1 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">Weight Manager</h1>
          <p className="max-w-sm text-sm text-muted-foreground">Track your daily weight. Click any date to log or update your entry.</p>
        </div>
        <Button size="sm" variant="outline" className="w-fit font-mono text-xs uppercase tracking-widest" onClick={() => setSelectedDate(new Date())}>
          <Scale className="mr-2 h-3.5 w-3.5" />
          Log today
        </Button>
      </div>

      {/* Stats strip */}
      {hasAnyEntry && (
        <section className="mb-12 rounded-lg border border-border/60 bg-muted/20 p-6">
          <WeightStats />
        </section>
      )}

      {/* Calendar */}
      <section className="mb-12">
        <div className="mb-4">
          <SectionLabel>Calendar</SectionLabel>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <WeightCalendar onSelectDate={setSelectedDate} />
        </div>
        <p className="mt-3 font-mono text-[11px] text-muted-foreground/60">Logged weights appear beneath each date. Click any past date to add or edit.</p>
      </section>

      {/* Heatmap */}
      {hasAnyEntry && (
        <section>
          <div className="mb-4">
            <SectionLabel>26-week activity</SectionLabel>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/10 p-6">
            <WeightHeatmap />
            <div className="mt-4 flex items-center gap-2">
              Streak :<span className="text-brand">{streak > 0 ? `${streak}d` : "0d"}</span>
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!hasAnyEntry && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border/60 bg-muted/20">
            <Scale className="h-6 w-6 text-muted-foreground/60" />
          </div>
          <div>
            <p className="font-mono text-sm font-medium text-foreground">No entries yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Click any date on the calendar or use "Log today" to get started.</p>
          </div>
        </div>
      )}

      {/* Dialog */}
      <WeightInputDialog date={selectedDate} onClose={() => setSelectedDate(null)} />
    </main>
  );
}
