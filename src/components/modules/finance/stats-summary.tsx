import { useMemo } from "react";
import { startOfWeek, startOfMonth, format } from "date-fns";
import { useFinanceStore, getMonthlyFixedTotal } from "@/stores/finance-store";

function StatBlock({
  label,
  value,
  sub,
  dim,
}: {
  label: string;
  value: string;
  sub?: string;
  dim?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border-r border-stroke last:border-r-0 px-6 py-8 sm:px-10 sm:py-10">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{label}</span>
      <span className={`font-['Bebas_Neue'] text-[56px] sm:text-[72px] leading-none ${dim ? "text-text-muted" : "text-brand"}`}>
        {value}
      </span>
      {sub && <span className="font-mono text-xs text-text-dim">{sub}</span>}
    </div>
  );
}

export function StatsSummary() {
  const { expenses, budget, fixedCosts } = useFinanceStore();

  const today = format(new Date(), "yyyy-MM-dd");
  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");

  const todayTotal = useMemo(
    () => expenses.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0),
    [expenses, today],
  );

  const weekTotal = useMemo(
    () => expenses.filter((e) => e.date >= weekStart).reduce((s, e) => s + e.amount, 0),
    [expenses, weekStart],
  );

  const monthTotal = useMemo(
    () => expenses.filter((e) => e.date >= monthStart).reduce((s, e) => s + e.amount, 0),
    [expenses, monthStart],
  );

  const fixedMonthly = useMemo(() => getMonthlyFixedTotal(fixedCosts), [fixedCosts]);
  const monthWithFixed = monthTotal + fixedMonthly;
  const budgetLeft = budget.monthly > 0 ? budget.monthly - monthWithFixed : null;

  return (
    <div className="grid grid-cols-2 border-stroke md:grid-cols-4">
      <StatBlock label="Today" value={todayTotal.toFixed(2)} sub="logged today" />
      <StatBlock label="This Week" value={weekTotal.toFixed(2)} sub="mon – today" />
      <StatBlock
        label="This Month"
        value={monthWithFixed.toFixed(2)}
        sub={fixedMonthly > 0 ? `incl. ${fixedMonthly.toFixed(0)} fixed` : "variable only"}
      />
      <StatBlock
        label={budgetLeft !== null ? "Budget Left" : "Budget"}
        value={budgetLeft !== null ? budgetLeft.toFixed(2) : "—"}
        dim={budgetLeft === null}
        sub={
          budgetLeft !== null
            ? budgetLeft < 0
              ? "over budget!"
              : `of ${budget.monthly}`
            : "set a budget"
        }
      />
    </div>
  );
}
