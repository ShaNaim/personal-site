import { useMemo, useState, useEffect } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  addWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useFinanceStore } from "@/stores/finance-store";

const chartConfig = {
  amount: { label: "Spent", color: "var(--color-brand)" },
};

export function SpendingChart({ days = 30 }: { days?: number }) {
  const { expenses } = useFinanceStore();
  const [offset, setOffset] = useState(0);

  // Reset navigation when mode changes
  useEffect(() => setOffset(0), [days]);

  const { data, periodLabel, canGoNext } = useMemo(() => {
    const today = new Date();

    if (days === 30) {
      const refMonth = addMonths(startOfMonth(today), offset);
      const isNow = offset === 0;
      const start = startOfMonth(refMonth);
      const end = isNow ? today : endOfMonth(refMonth);
      const label = format(refMonth, "MMMM yyyy");

      const allDays = eachDayOfInterval({ start, end });
      const chartData = allDays.map((day) => {
        const key = format(day, "yyyy-MM-dd");
        const amount = expenses
          .filter((e) => e.date === key)
          .reduce((s, e) => s + e.amount, 0);
        return { date: key, label: format(day, "d"), amount: parseFloat(amount.toFixed(2)) };
      });

      return { data: chartData, periodLabel: label, canGoNext: !isSameMonth(refMonth, today) };
    } else {
      const refWeek = addWeeks(startOfWeek(today, { weekStartsOn: 1 }), offset);
      const isNow = offset === 0;
      const start = startOfWeek(refWeek, { weekStartsOn: 1 });
      const end = isNow ? today : endOfWeek(refWeek, { weekStartsOn: 1 });
      const label = format(start, "MMM d") + " – " + format(end, "MMM d, yyyy");

      const allDays = eachDayOfInterval({ start, end });
      const chartData = allDays.map((day) => {
        const key = format(day, "yyyy-MM-dd");
        const amount = expenses
          .filter((e) => e.date === key)
          .reduce((s, e) => s + e.amount, 0);
        return { date: key, label: format(day, "EEE"), amount: parseFloat(amount.toFixed(2)) };
      });

      return {
        data: chartData,
        periodLabel: label,
        canGoNext: !isSameWeek(refWeek, today, { weekStartsOn: 1 }),
      };
    }
  }, [expenses, days, offset]);

  const hasData = data.some((d) => d.amount > 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Period navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOffset((o) => o - 1)}
          className="cursor-none flex h-8 w-8 items-center justify-center border border-stroke text-text-muted transition-all hover:border-brand hover:text-brand"
          aria-label="Previous period"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-['Bebas_Neue'] text-xl leading-none text-text flex-1">
          {periodLabel}
        </span>
        <button
          onClick={() => setOffset((o) => o + 1)}
          disabled={!canGoNext}
          className="cursor-none flex h-8 w-8 items-center justify-center border border-stroke text-text-muted transition-all hover:border-brand hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next period"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {!hasData ? (
        <div className="flex h-48 items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
            No data for this period
          </p>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} />
            <XAxis
              dataKey="label"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--color-muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              interval={days <= 7 ? 0 : "preserveStartEnd"}
            />
            <YAxis
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--color-muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              width={44}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${Number(value).toFixed(2)}`, "Spent"]}
                  labelClassName="font-mono text-xs text-muted-foreground"
                  className="font-mono text-xs"
                />
              }
            />
            <Bar dataKey="amount" fill="var(--color-brand)" radius={[2, 2, 0, 0]} fillOpacity={0.85} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
