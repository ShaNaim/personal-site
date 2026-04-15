interface StatItemProps {
  label: string;
  value: string | null;
  sub?: string;
}

export default function StatItem({ label, value, sub }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">{value ?? <span className="text-muted-foreground/40">—</span>}</span>
      {sub && <span className="font-mono text-[11px] text-muted-foreground/60">{sub}</span>}
    </div>
  );
}
