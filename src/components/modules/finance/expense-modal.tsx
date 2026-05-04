import * as React from "react";
import { format, parseISO } from "date-fns";
import { X } from "lucide-react";
import { ExpenseInput } from "./expense-input";
import { TodayExpenses } from "./today-expenses";

interface ExpenseModalProps {
  date: string;
  onClose: () => void;
}

export function ExpenseModal({ date, onClose }: ExpenseModalProps) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm" />

      <div
        className="relative z-10 flex w-full max-w-lg flex-col border border-[var(--color-brand)] bg-[var(--color-bg)] shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-stroke px-6 py-5">
          <div>
            <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--color-brand)]">
              Log Expense
            </div>
            <h2 className="font-['Bebas_Neue'] text-[40px] leading-none text-[var(--color-text)]">
              {format(parseISO(date), "EEEE · MMM d")}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-none mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-stroke text-[var(--color-text-muted)] transition-all hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Input */}
        <div className="shrink-0 border-b border-stroke px-6 py-6">
          <ExpenseInput date={date} />
        </div>

        {/* Existing entries */}
        <div className="overflow-y-auto px-6 py-5">
          <TodayExpenses date={date} />
        </div>
      </div>
    </div>
  );
}
