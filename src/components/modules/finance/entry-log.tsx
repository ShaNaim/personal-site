import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { Trash2, CalendarDays, ChevronDown } from "lucide-react";
import { useFinanceStore } from "@/stores/finance-store";
import type { Category, Expense } from "@/types/finance";

// ── Entry row ────────────────────────────────────────────────────────────────

function EntryRow({
  expense,
  category,
  onDelete,
  onUpdate,
}: {
  expense: Expense;
  category: Category;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Expense, "amount" | "date" | "categoryId" | "note">>) => void;
}) {
  const [editAmount, setEditAmount] = useState<string | null>(null);
  const [movingDate, setMovingDate] = useState(false);

  const saveAmount = () => {
    const parsed = parseFloat(editAmount ?? "");
    if (!isNaN(parsed) && parsed > 0) onUpdate(expense.id, { amount: parsed });
    setEditAmount(null);
  };

  return (
    <div className="group flex items-center gap-4 border-b border-stroke px-5 py-3.5 last:border-b-0 transition-colors hover:bg-bg-alt">
      {/* Category icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center text-lg"
        style={{ background: `${category.color}22`, border: `1px solid ${category.color}44` }}
      >
        {category.icon}
      </div>

      {/* Category name */}
      <span className="flex-1 truncate font-mono text-sm text-text">{category.name}</span>

      {/* Editable amount */}
      {editAmount !== null ? (
        <input
          autoFocus
          type="number"
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
          onBlur={saveAmount}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveAmount();
            if (e.key === "Escape") setEditAmount(null);
          }}
          className="w-24 cursor-none border-b border-brand bg-transparent text-right font-['Bebas_Neue'] text-xl text-brand outline-none"
        />
      ) : (
        <button
          onClick={() => setEditAmount(String(expense.amount))}
          title="Click to edit"
          className="cursor-none font-['Bebas_Neue'] text-xl text-brand transition-opacity hover:opacity-60"
        >
          {expense.amount.toFixed(2)}
        </button>
      )}

      {/* Move to date */}
      {movingDate ? (
        <input
          type="date"
          autoFocus
          defaultValue={expense.date}
          max={format(new Date(), "yyyy-MM-dd")}
          onChange={(e) => {
            if (e.target.value) onUpdate(expense.id, { date: e.target.value });
            setMovingDate(false);
          }}
          onBlur={() => setMovingDate(false)}
          className="cursor-none border-b border-brand bg-transparent font-mono text-xs text-text outline-none"
        />
      ) : (
        <button
          onClick={() => setMovingDate(true)}
          title="Move to different date"
          className="cursor-none opacity-0 text-text-dim transition-all hover:text-brand group-hover:opacity-100"
        >
          <CalendarDays className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Delete */}
      <button
        onClick={() => onDelete(expense.id)}
        className="cursor-none opacity-0 text-text-dim transition-all hover:text-red-400 group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── Date group ───────────────────────────────────────────────────────────────

function DateGroup({
  date,
  expenses,
  categories,
  onDelete,
  onUpdate,
}: {
  date: string;
  expenses: Expense[];
  categories: Category[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Expense, "amount" | "date" | "categoryId" | "note">>) => void;
}) {
  const [movingAll, setMovingAll] = useState(false);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const handleMoveAll = (newDate: string) => {
    if (!newDate) return;
    expenses.forEach((e) => onUpdate(e.id, { date: newDate }));
    setMovingAll(false);
  };

  return (
    <div className="border-b border-stroke last:border-b-0">
      {/* Day header */}
      <div className="flex items-center justify-between border-b border-stroke bg-bg-alt px-5 py-3">
        <div className="flex items-baseline gap-2">
          <span className="font-['Bebas_Neue'] text-2xl leading-none text-text">
            {format(parseISO(date), "EEE, MMM d")}
          </span>
          <span className="font-mono text-xs text-text-dim">
            {format(parseISO(date), "yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {movingAll ? (
            <input
              type="date"
              autoFocus
              defaultValue={date}
              max={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => handleMoveAll(e.target.value)}
              onBlur={() => setMovingAll(false)}
              className="cursor-none border-b border-brand bg-transparent font-mono text-xs text-text outline-none"
            />
          ) : (
            <button
              onClick={() => setMovingAll(true)}
              className="cursor-none font-mono text-xs uppercase tracking-widest text-text-dim transition-colors hover:text-brand"
            >
              Move all →
            </button>
          )}
          <span className="font-['Bebas_Neue'] text-2xl leading-none text-brand">
            {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Entries */}
      {expenses.map((exp) => {
        const cat = categories.find((c) => c.id === exp.categoryId);
        if (!cat) return null;
        return (
          <EntryRow
            key={exp.id}
            expense={exp}
            category={cat}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

const SHOW_LIMIT = 7; // date groups shown initially

export function EntryLog() {
  const { expenses, categories, removeExpense, updateExpense } = useFinanceStore();
  const [showAll, setShowAll] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, Expense[]>();
    [...expenses]
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((exp) => {
        if (!map.has(exp.date)) map.set(exp.date, []);
        map.get(exp.date)!.push(exp);
      });
    return [...map.entries()].map(([date, exps]) => ({ date, exps }));
  }, [expenses]);

  if (grouped.length === 0) {
    return (
      <div className="flex items-center justify-center border border-dashed border-stroke py-14">
        <span className="font-mono text-xs uppercase tracking-widest text-text-dim">
          No entries yet
        </span>
      </div>
    );
  }

  const visible = showAll ? grouped : grouped.slice(0, SHOW_LIMIT);
  const hiddenCount = grouped.length - SHOW_LIMIT;

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-stroke">
        {visible.map(({ date, exps }) => (
          <DateGroup
            key={date}
            date={date}
            expenses={exps}
            categories={categories}
            onDelete={removeExpense}
            onUpdate={updateExpense}
          />
        ))}
      </div>

      {!showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="cursor-none flex items-center justify-center gap-2 border border-stroke py-3 font-mono text-xs uppercase tracking-widest text-text-muted transition-all hover:border-brand hover:text-brand"
        >
          <ChevronDown className="h-3.5 w-3.5" />
          Show {hiddenCount} more {hiddenCount === 1 ? "day" : "days"}
        </button>
      )}
    </div>
  );
}
