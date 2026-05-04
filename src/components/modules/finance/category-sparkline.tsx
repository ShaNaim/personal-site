import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useFinanceStore } from "@/stores/finance-store";

interface CategorySparklineProps {
  categoryId: string;
  color: string;
}

export function CategorySparkline({ categoryId, color }: CategorySparklineProps) {
  const { expenses } = useFinanceStore();

  const data = useMemo(() => {
    const catExpenses = expenses
      .filter((e) => e.categoryId === categoryId)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (catExpenses.length === 0) return [];

    // Group by date
    const byDate = new Map<string, number>();
    for (const exp of catExpenses) {
      byDate.set(exp.date, (byDate.get(exp.date) ?? 0) + exp.amount);
    }

    return [...byDate.entries()].map(([date, amount]) => ({
      date,
      label: format(parseISO(date), "MMM d"),
      amount: parseFloat(amount.toFixed(2)),
    }));
  }, [expenses, categoryId]);

  // Need at least 2 points to draw a meaningful chart
  if (data.length < 2) return null;

  return (
    <div className="border-t border-stroke/50 px-4 pt-3 pb-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
        Spending over time · {data.length} days
      </span>
      <ResponsiveContainer width="100%" height={52}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${categoryId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" hide />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="border border-stroke bg-bg px-2 py-1 font-mono text-[10px]">
                  <span style={{ color }}>{payload[0].payload.label}</span>
                  <span className="ml-2 text-text">{Number(payload[0].value).toFixed(2)}</span>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#grad-${categoryId})`}
            dot={false}
            activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
