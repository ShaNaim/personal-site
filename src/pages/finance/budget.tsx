import { useState, useMemo } from "react";
import { format, startOfMonth } from "date-fns";
import { Target, Check } from "lucide-react";
import { useFinanceStore, getMonthlyFixedTotal } from "@/stores/finance-store";
import { FixedCostsPanel } from "@/components/modules/finance/fixed-costs-panel";

function BudgetEditor() {
  const { budget, setBudget } = useFinanceStore();
  const [value, setValue] = useState(budget.monthly > 0 ? String(budget.monthly) : "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setBudget(parsed);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-stretch border border-stroke transition-colors focus-within:border-brand">
        <div className="flex items-center border-r border-stroke px-5">
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Monthly</span>
        </div>
        <input
          type="number"
          placeholder="0.00"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-1 cursor-none bg-transparent px-5 py-4 font-['Bebas_Neue'] text-3xl text-text outline-none"
          min={0}
          step={1}
        />
        <button
          onClick={handleSave}
          className="flex cursor-none items-center gap-2 border-l border-stroke px-6 font-mono text-xs uppercase tracking-widest text-text-muted transition-all hover:bg-brand-dim hover:text-brand"
        >
          {saved ? <Check className="h-4 w-4 text-emerald-400" /> : <Target className="h-4 w-4" />}
          {saved ? "Saved" : "Set"}
        </button>
      </div>
      {budget.monthly > 0 && (
        <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
          Current budget: <span className="text-brand">{budget.monthly.toFixed(2)}</span> / month
        </p>
      )}
    </div>
  );
}

export function FinanceBudgetPage() {
  const { budget, expenses, fixedCosts } = useFinanceStore();

  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");

  const monthTotal = useMemo(
    () => expenses.filter((e) => e.date >= monthStart).reduce((s, e) => s + e.amount, 0),
    [expenses, monthStart],
  );

  const fixedMonthly = useMemo(() => getMonthlyFixedTotal(fixedCosts), [fixedCosts]);
  const totalSpent = monthTotal + fixedMonthly;
  const pct = budget.monthly > 0 ? Math.min((totalSpent / budget.monthly) * 100, 100) : 0;
  const over = budget.monthly > 0 && totalSpent > budget.monthly;

  return (
    <div className="min-h-screen bg-bg">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stroke pt-18">
        <div className="cyber-grid absolute inset-0" />
        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-['Bebas_Neue'] text-[22vw] leading-none text-text opacity-[0.015] sm:text-[18vw]">
          BGT
        </div>
        <div className="relative px-6 pb-10 pt-12 sm:px-12">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-brand">
            Finance · Budget & Fixed Costs
          </div>
          <div className="flex flex-col gap-0 leading-none">
            <span className="font-['Bebas_Neue'] text-[72px] leading-[0.88] text-text sm:text-[10vw] lg:text-[120px]">
              Budget
            </span>
            <span
              className="font-['Bebas_Neue'] text-[72px] leading-[0.88] text-transparent sm:text-[10vw] lg:text-[120px]"
              style={{ WebkitTextStroke: "1px var(--color-text)" }}
            >
              Control
            </span>
          </div>
        </div>
      </section>

      {/* MONTHLY OVERVIEW */}
      {budget.monthly > 0 && (
        <section className="border-b border-stroke">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Monthly Budget", value: budget.monthly.toFixed(2) },
              { label: "Spent (Variable)", value: monthTotal.toFixed(2) },
              { label: "Fixed Costs", value: fixedMonthly.toFixed(2) },
              {
                label: over ? "Over Budget" : "Remaining",
                value: Math.abs(budget.monthly - totalSpent).toFixed(2),
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2 border-r border-stroke px-6 py-8 last:border-r-0 sm:px-10 sm:py-10">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{label}</span>
                <span
                  className={`font-['Bebas_Neue'] text-[52px] leading-none sm:text-[64px] ${
                    label.includes("Over") ? "text-red-400" : "text-brand"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-stroke px-6 py-5 sm:px-12">
            <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-text-muted">
              <span>0</span>
              <span>{pct.toFixed(1)}% used</span>
              <span>{budget.monthly.toFixed(2)}</span>
            </div>
            <div className="h-2.5 overflow-hidden bg-stroke">
              <div
                className={`h-full transition-all duration-700 ${over ? "bg-red-400" : pct >= 80 ? "bg-amber-400" : "bg-brand"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {over && (
              <span className="font-mono text-xs uppercase tracking-widest text-red-400">
                Over budget by {(totalSpent - budget.monthly).toFixed(2)} this month
              </span>
            )}
          </div>
        </section>
      )}

      {/* SET BUDGET */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
            Monthly Budget
          </span>
          <div className="h-px flex-1 bg-stroke" />
        </div>
        <div className="px-6 py-8 sm:px-12">
          <BudgetEditor />
        </div>
      </section>

      {/* FIXED COSTS */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
            Recurring Fixed Costs
          </span>
          <div className="h-px flex-1 bg-stroke" />
          {fixedCosts.length > 0 && (
            <span className="font-mono text-xs uppercase tracking-widest text-text-dim">
              ~{fixedMonthly.toFixed(2)} / mo
            </span>
          )}
        </div>
        <div className="px-6 py-8 sm:px-12">
          <FixedCostsPanel />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
            How It Works
          </span>
          <div className="h-px flex-1 bg-stroke" />
        </div>
        <div className="grid grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3 sm:px-12">
          {[
            {
              icon: "💡",
              title: "Variable Expenses",
              body: "Logged daily on the Dashboard. Use the smart input to quickly add category: amount pairs.",
            },
            {
              icon: "📌",
              title: "Fixed Costs",
              body: "Recurring bills like rent, subscriptions. They are counted into your monthly total automatically.",
            },
            {
              icon: "🎯",
              title: "Budget Alerts",
              body: "Set a monthly limit. You'll see a warning at 80% and a red indicator when you're over budget.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex flex-col gap-3 border border-stroke p-6">
              <span className="text-3xl">{icon}</span>
              <span className="font-mono text-sm uppercase tracking-widest text-text">{title}</span>
              <p className="font-mono text-sm leading-relaxed text-text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
