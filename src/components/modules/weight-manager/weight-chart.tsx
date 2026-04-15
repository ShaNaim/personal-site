import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useWeightStore } from "@/hooks/use-weight-store";

const chartConfig = {
  weight: {
    label: "Weight",
    color: "var(--color-brand)",
  },
};

export function WeightChart() {
  const { entries } = useWeightStore();

  const data = useMemo(() => {
    return Object.entries(entries)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, weight]) => ({
        date,
        weight,
        label: format(parseISO(date), "MMM d"),
      }));
  }, [entries]);

  if (data.length < 2) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="font-mono text-xs text-muted-foreground/40 uppercase tracking-widest">Log at least 2 entries to see the chart</p>
      </div>
    );
  }

  const weights = data.map((d) => d.weight);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  const padding = 2;

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} />
        <XAxis dataKey="label" tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis domain={[minW - padding, maxW + padding]} tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}kg`} width={48} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`${value} kg`, "Weight"]} labelClassName="font-mono text-xs text-muted-foreground" className="font-mono text-xs" />} />
        <Area
          type="monotone"
          dataKey="weight"
          stroke="var(--color-brand)"
          strokeWidth={2}
          fill="url(#weightGradient)"
          dot={{ fill: "var(--color-brand)", r: 3, strokeWidth: 0 }}
          activeDot={{ fill: "var(--color-brand)", r: 5, strokeWidth: 0 }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
