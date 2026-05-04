import { useMemo } from "react";
import { startOfMonth, format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useFinanceStore } from "@/stores/finance-store";

export function CategoryPie() {
  const { expenses, categories } = useFinanceStore();

  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");

  const data = useMemo(() => {
    const map = new Map<string, number>();
    for (const exp of expenses) {
      if (exp.date < monthStart) continue;
      map.set(exp.categoryId, (map.get(exp.categoryId) ?? 0) + exp.amount);
    }
    return [...map.entries()]
      .map(([catId, amount]) => {
        const cat = categories.find((c) => c.id === catId);
        return cat
          ? { name: `${cat.icon} ${cat.name}`, value: parseFloat(amount.toFixed(2)), color: cat.color }
          : null;
      })
      .filter(Boolean)
      .sort((a, b) => b!.value - a!.value) as { name: string; value: number; color: string }[];
  }, [expenses, categories, monthStart]);

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="font-mono text-xs text-text-dim uppercase tracking-widest">No data this month</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.9} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(2)}`, ""]}
          contentStyle={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            background: "var(--color-bg)",
            border: "1px solid var(--color-stroke)",
            borderRadius: 0,
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {value}
            </span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: 8 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
