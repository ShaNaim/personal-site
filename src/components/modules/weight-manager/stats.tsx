import { format, subDays, parseISO } from "date-fns";
import { useWeightStore } from "@/hooks/use-weight-store";

interface StatItemProps {
  label: string;
  value: string | null;
  sub?: string;
}

function StatItem({ label, value, sub }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">{value ?? <span className="text-muted-foreground/40">—</span>}</span>
      {sub && <span className="font-mono text-[11px] text-muted-foreground/60">{sub}</span>}
    </div>
  );
}

export function WeightStats() {
  const { entries } = useWeightStore();

  const sortedEntries = Object.entries(entries).sort(([a], [b]) => a.localeCompare(b));

  if (sortedEntries.length === 0) {
    return null;
  }

  const latest = sortedEntries[sortedEntries.length - 1];
  const minEntry = sortedEntries.reduce((a, b) => (b[1] < a[1] ? b : a));
  const maxEntry = sortedEntries.reduce((a, b) => (b[1] > a[1] ? b : a));

  // Calculate current streak (consecutive days ending today or yesterday)
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

  const delta = sortedEntries.length >= 2 ? latest[1] - sortedEntries[sortedEntries.length - 2][1] : null;

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
      <StatItem label="Latest" value={latest ? `${latest[1].toFixed(1)} kg` : null} sub={delta !== null ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)} kg from prev` : format(parseISO(latest[0]), "MMM d")} />
      <StatItem label="Lowest" value={`${minEntry[1].toFixed(1)} kg`} sub={format(parseISO(minEntry[0]), "MMM d, yyyy")} />
      <StatItem label="Highest" value={`${maxEntry[1].toFixed(1)} kg`} sub={format(parseISO(maxEntry[0]), "MMM d, yyyy")} />
      <StatItem label="Streak" value={streak > 0 ? `${streak}d` : null} sub={streak > 0 ? "consecutive days" : undefined} />
    </div>
  );
}
