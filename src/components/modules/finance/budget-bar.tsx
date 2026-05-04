import { useMemo } from "react";
import { startOfMonth, format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { useFinanceStore, getMonthlyFixedTotal } from "@/stores/finance-store";

export function BudgetBar() {
  const { expenses, budget, fixedCosts } = useFinanceStore();

  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");

  const monthTotal = useMemo(
    () => expenses.filter((e) => e.date >= monthStart).reduce((s, e) => s + e.amount, 0),
    [expenses, monthStart],
  );

  const fixedMonthly = useMemo(() => getMonthlyFixedTotal(fixedCosts), [fixedCosts]);
  const totalSpent = monthTotal + fixedMonthly;

  if (budget.monthly <= 0) return null;

  const pct = Math.min((totalSpent / budget.monthly) * 100, 100);
  const over = totalSpent > budget.monthly;
  const warning = pct >= 80 && !over;

  return (
    <div className="flex flex-col gap-3 border-t border-stroke px-6 py-5 sm:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(over || warning) && (
            <AlertTriangle className={`h-4 w-4 ${over ? "text-red-400" : "text-amber-400"}`} />
          )}
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
            Monthly Budget
          </span>
        </div>
        <span className="font-mono text-sm text-text-muted">
          <span className={over ? "font-bold text-red-400" : "text-brand"}>{totalSpent.toFixed(2)}</span>
          {" / "}
          {budget.monthly.toFixed(2)}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-stroke">
        <div
          className={`h-full transition-all duration-500 ${over ? "bg-red-400" : warning ? "bg-amber-400" : "bg-brand"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {over && (
        <span className="font-mono text-xs uppercase tracking-widest text-red-400">
          Over by {(totalSpent - budget.monthly).toFixed(2)}
        </span>
      )}
    </div>
  );
}
