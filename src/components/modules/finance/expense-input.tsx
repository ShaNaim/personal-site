import { useState, useCallback, useMemo } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useFinanceStore, parseExpenseInput, getTodayKey } from "@/stores/finance-store";

interface ExpenseInputProps {
  date?: string;
}

export function ExpenseInput({ date }: ExpenseInputProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { addExpenses } = useFinanceStore();

  const parsed = useMemo(() => parseExpenseInput(value), [value]);
  const total = useMemo(() => parsed.reduce((s, p) => s + p.amount, 0), [parsed]);
  const hasValid = parsed.length > 0;

  const handleSubmit = useCallback(async () => {
    if (!hasValid) return;
    setLoading(true);
    addExpenses(date ?? getTodayKey(), parsed);
    setValue("");
    setLoading(false);
  }, [hasValid, date, parsed, addExpenses]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-stretch border-2 border-[var(--color-brand)] transition-colors">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="food: 50, coffee: 8 + transport: 20"
          className="flex-1 bg-transparent px-5 py-4 font-mono text-base text-text placeholder:text-text-dim outline-none cursor-none"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          onClick={handleSubmit}
          disabled={!hasValid || loading}
          className="flex items-center gap-2 border-l-2 border-[var(--color-brand)] px-6 font-mono text-[11px] uppercase tracking-widest text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-bg)] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-none"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          Log
        </button>
      </div>

      {/* Live preview */}
      {value.trim() && (
        <div className="flex flex-wrap gap-2 items-center">
          {parsed.length > 0 ? (
            <>
              {parsed.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 border border-[var(--color-brand)] bg-[var(--color-brand-dim)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest"
                >
                  <span className="text-[var(--color-text-muted)]">{item.categoryName}</span>
                  <span className="text-[var(--color-brand)] font-bold">{item.amount.toFixed(2)}</span>
                </span>
              ))}
              <span className="ml-auto font-['Bebas_Neue'] text-[28px] leading-none text-[var(--color-brand)]">
                = {total.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
              format: category: amount, category: amount
            </span>
          )}
        </div>
      )}

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-dim">
        Use <span className="text-text-muted">comma</span> or <span className="text-text-muted">+</span> to separate · press <span className="text-text-muted">Enter</span> to log
      </p>
    </div>
  );
}
