import { useState } from "react";
import { format } from "date-fns";
import { ExpenseInput } from "@/components/modules/finance/expense-input";
import { TodayExpenses } from "@/components/modules/finance/today-expenses";
import { StatsSummary } from "@/components/modules/finance/stats-summary";
import { SpendingChart } from "@/components/modules/finance/spending-chart";
import { CategoryPie } from "@/components/modules/finance/category-pie";
import { BudgetBar } from "@/components/modules/finance/budget-bar";
import { DateNav } from "@/components/modules/finance/date-nav";
import { FinanceCalendar } from "@/components/modules/finance/finance-calendar";
import { ExpenseModal } from "@/components/modules/finance/expense-modal";
import { EntryLog } from "@/components/modules/finance/entry-log";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">{children}</span>;
}

export function FinanceDashboardPage() {
  const [activeDate, setActiveDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [chartDays, setChartDays] = useState<7 | 30>(30);
  const [modalDate, setModalDate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-bg mt-6">
      {/* ════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke pt-18">
        <div className="flex flex-col gap-1 px-6 pb-7 pt-8 sm:flex-row sm:items-end sm:justify-between sm:px-12">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-brand">Finance · Tracker · v1</div>
            <div className="flex items-baseline gap-4 leading-none">
              <span className="font-['Bebas_Neue'] text-[56px] leading-none text-text sm:text-[72px]">Finance</span>
              <span className="font-['Bebas_Neue'] text-[56px] leading-none text-transparent sm:text-[72px]" style={{ WebkitTextStroke: "1px var(--color-text)" }}>
                Tracker
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{format(new Date(), "EEEE")}</span>
            <span className="font-['Bebas_Neue'] text-[28px] leading-none text-text">{format(new Date(), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          QUICK LOG
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <div className="h-0.5 bg-brand" />
        <div className="flex items-center justify-between gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 shrink-0 bg-brand" />
            <SectionLabel>Quick Log</SectionLabel>
          </div>
          <DateNav date={activeDate} onChange={setActiveDate} />
        </div>
        <div className="px-6 py-8 sm:px-12">
          <ExpenseInput date={activeDate} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <StatsSummary />
        <BudgetBar />
      </section>

      {/* ════════════════════════════════════════════
          DAY BREAKDOWN
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <SectionLabel>Day Breakdown</SectionLabel>
          <div className="h-px flex-1 bg-stroke" />
          <span className="font-['Bebas_Neue'] text-lg leading-none text-text-muted">{format(new Date(activeDate + "T12:00:00"), "MMM d")}</span>
        </div>
        <div className="px-6 py-8 sm:px-12">
          <TodayExpenses date={activeDate} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CALENDAR
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <SectionLabel>Calendar</SectionLabel>
          <div className="h-px flex-1 bg-stroke" />
          <span className="hidden font-mono text-xs uppercase tracking-widest text-text-dim sm:block">click to select · double-click to log</span>
        </div>
        <div className="px-6 py-8 sm:px-12">
          <FinanceCalendar selectedDate={activeDate} onSelectDate={setActiveDate} onDoubleClickDate={setModalDate} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ENTRY LOG
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <SectionLabel>Entry Log</SectionLabel>
          <div className="h-px flex-1 bg-stroke" />
          <span className="hidden font-mono text-xs uppercase tracking-widest text-text-dim sm:block">
            click amount to edit · calendar icon to move date
          </span>
        </div>
        <div className="px-6 py-8 sm:px-12">
          <EntryLog />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SPENDING TREND
      ════════════════════════════════════════════ */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <SectionLabel>Spending Trend</SectionLabel>
          <div className="h-px flex-1 bg-stroke" />
          <div className="flex items-center">
            {([7, 30] as const).map((d) => (
              <button
                key={d}
                onClick={() => setChartDays(d)}
                className={`cursor-none border-l border-stroke px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-all first:border-l-0 ${chartDays === d ? "bg-brand-dim text-brand" : "text-text-muted hover:text-brand"}`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 py-10 sm:px-12">
          <SpendingChart days={chartDays} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CATEGORY PIE
      ════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <SectionLabel>By Category · {format(new Date(), "MMMM")}</SectionLabel>
          <div className="h-px flex-1 bg-stroke" />
        </div>
        <div className="px-6 py-10 sm:px-12">
          <CategoryPie />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ENTRY MODAL (double-click calendar)
      ════════════════════════════════════════════ */}
      {modalDate && <ExpenseModal date={modalDate} onClose={() => setModalDate(null)} />}
    </div>
  );
}
