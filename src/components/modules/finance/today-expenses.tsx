import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { useFinanceStore } from "@/stores/finance-store";
import type { Category } from "@/types/finance";

interface TodayExpensesProps {
  date: string;
}

function CategoryRow({
  category,
  total,
  entries,
  onDelete,
}: {
  category: Category;
  total: number;
  entries: { id: string; amount: number; note?: string }[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border-b border-stroke last:border-b-0">
      <div className="flex items-center gap-4 px-5 py-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center text-xl"
          style={{ background: `${category.color}22`, border: `1px solid ${category.color}55` }}
        >
          {category.icon}
        </div>
        <span className="flex-1 truncate font-mono text-sm uppercase tracking-wide text-text">
          {category.name}
        </span>
        <span className="font-['Bebas_Neue'] text-[28px] leading-none text-brand">
          {total.toFixed(2)}
        </span>
      </div>

      {entries.length > 1 && (
        <div className="flex flex-col gap-1 pb-3 pl-20 pr-5">
          {entries.map((e) => (
            <div key={e.id} className="group flex items-center gap-2">
              <span className="flex-1 font-mono text-xs text-text-dim">
                {e.note ? e.note : "entry"} — {e.amount.toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(e.id)}
                className="cursor-none text-text-dim opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {entries.length === 1 && (
        <div className="flex justify-end px-5 pb-3">
          <button
            onClick={() => onDelete(entries[0].id)}
            className="cursor-none text-text-dim opacity-0 transition-opacity hover:text-red-400 hover:opacity-100"
            aria-label="Delete expense"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export function TodayExpenses({ date }: TodayExpensesProps) {
  const { expenses, categories, removeExpense } = useFinanceStore();

  const todayExpenses = useMemo(
    () => expenses.filter((e) => e.date === date),
    [expenses, date],
  );

  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { category: Category; total: number; entries: { id: string; amount: number; note?: string }[] }
    >();
    for (const exp of todayExpenses) {
      const cat = categories.find((c) => c.id === exp.categoryId);
      if (!cat) continue;
      if (!map.has(cat.id)) {
        map.set(cat.id, { category: cat, total: 0, entries: [] });
      }
      const entry = map.get(cat.id)!;
      entry.total += exp.amount;
      entry.entries.push({ id: exp.id, amount: exp.amount, note: exp.note });
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  }, [todayExpenses, categories]);

  const dayTotal = useMemo(
    () => todayExpenses.reduce((s, e) => s + e.amount, 0),
    [todayExpenses],
  );

  if (grouped.length === 0) {
    return (
      <div className="flex items-center justify-center border border-dashed border-stroke py-14">
        <span className="font-mono text-xs uppercase tracking-widest text-text-dim">
          No expenses logged yet
        </span>
      </div>
    );
  }

  return (
    <div className="border border-stroke">
      <div className="flex items-center justify-between border-b border-stroke bg-brand-dim/30 px-5 py-4">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
          {grouped.length} {grouped.length === 1 ? "category" : "categories"}
        </span>
        <span className="font-['Bebas_Neue'] text-3xl leading-none text-brand">
          Total: {dayTotal.toFixed(2)}
        </span>
      </div>
      {grouped.map(({ category, total, entries }) => (
        <CategoryRow
          key={category.id}
          category={category}
          total={total}
          entries={entries}
          onDelete={removeExpense}
        />
      ))}
    </div>
  );
}
