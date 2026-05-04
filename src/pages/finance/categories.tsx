import { useState, useMemo } from "react";
import { Plus, Edit2, Tags } from "lucide-react";
import { startOfMonth, format } from "date-fns";
import { useFinanceStore } from "@/stores/finance-store";
import { EditCategoryDialog } from "@/components/modules/finance/edit-category-dialog";
import { CategorySparkline } from "@/components/modules/finance/category-sparkline";
import type { Category } from "@/types/finance";

const PRESET_COLORS = [
  "#ff4d00", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

function NewCategoryForm({ onDone }: { onDone: () => void }) {
  const { addCategory } = useFinanceStore();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("💸");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  const ICONS = ["💸", "🍕", "☕", "🚗", "🛍️", "🎬", "💊", "🏠", "📱", "✈️", "🛒", "💰", "📚", "🎮", "💡"];

  const handleSubmit = () => {
    if (!name.trim()) return;
    addCategory(name.trim(), color, icon);
    onDone();
  };

  return (
    <div className="flex flex-col gap-5 border border-brand p-6">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">New Category</span>

      <div className="flex flex-wrap gap-2">
        {ICONS.map((em) => (
          <button
            key={em}
            onClick={() => setIcon(em)}
            className={`flex h-10 w-10 items-center justify-center border text-xl transition-all cursor-none ${
              icon === em ? "border-brand bg-brand-dim" : "border-stroke hover:border-text-muted"
            }`}
          >
            {em}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="border border-stroke bg-transparent px-4 py-3 font-mono text-sm text-text outline-none transition-colors focus:border-brand cursor-none"
        autoFocus
      />

      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`h-7 w-7 transition-all cursor-none ${color === c ? "scale-110 ring-2 ring-brand ring-offset-2 ring-offset-background" : "hover:scale-105"}`}
            style={{ background: c }}
          />
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onDone}
          className="cursor-none border border-stroke px-4 py-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-all hover:border-text-muted"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="ml-auto cursor-none border border-brand bg-brand-dim px-5 py-2 font-mono text-xs uppercase tracking-widest text-brand transition-all hover:bg-brand hover:text-background disabled:cursor-not-allowed disabled:opacity-30"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export function FinanceCategoriesPage() {
  const { categories, expenses } = useFinanceStore();
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");

  const categoryStats = useMemo(() => {
    return categories
      .map((cat) => {
        const allTime = expenses
          .filter((e) => e.categoryId === cat.id)
          .reduce((s, e) => s + e.amount, 0);
        const thisMonth = expenses
          .filter((e) => e.categoryId === cat.id && e.date >= monthStart)
          .reduce((s, e) => s + e.amount, 0);
        const entryCount = expenses.filter((e) => e.categoryId === cat.id).length;
        return { cat, allTime, thisMonth, entryCount };
      })
      .sort((a, b) => b.thisMonth - a.thisMonth);
  }, [categories, expenses, monthStart]);

  return (
    <div className="min-h-screen bg-bg">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stroke pt-18">
        <div className="cyber-grid absolute inset-0" />
        <div className="pointer-events-none absolute -right-6 bottom-0 select-none font-['Bebas_Neue'] text-[22vw] leading-none text-text opacity-[0.015] sm:text-[18vw]">
          CAT
        </div>
        <div className="relative px-6 pb-10 pt-12 sm:px-12">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-brand">
            Finance · Categories
          </div>
          <div className="flex flex-col gap-0 leading-none">
            <span className="font-['Bebas_Neue'] text-[72px] leading-[0.88] text-text sm:text-[10vw] lg:text-[120px]">
              Spending
            </span>
            <span
              className="font-['Bebas_Neue'] text-[72px] leading-[0.88] text-transparent sm:text-[10vw] lg:text-[120px]"
              style={{ WebkitTextStroke: "1px var(--color-text)" }}
            >
              Categories
            </span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="grid grid-cols-2 border-b border-stroke md:grid-cols-3">
        {[
          { label: "Total Categories", value: String(categories.length) },
          {
            label: "Active This Month",
            value: String(categoryStats.filter((s) => s.thisMonth > 0).length),
          },
          {
            label: "This Month Spent",
            value: expenses
              .filter((e) => e.date >= monthStart)
              .reduce((s, e) => s + e.amount, 0)
              .toFixed(2),
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-2 border-r border-stroke px-6 py-8 last:border-r-0 sm:px-10 sm:py-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{label}</span>
            <span className="font-['Bebas_Neue'] text-[52px] leading-none text-brand sm:text-[64px]">{value}</span>
          </div>
        ))}
      </section>

      {/* CATEGORIES LIST */}
      <section className="border-b border-stroke">
        <div className="flex items-center gap-4 border-b border-stroke px-6 py-5 sm:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
            All Categories
          </span>
          <div className="h-px flex-1 bg-stroke" />
          {!creating && (
            <button
              onClick={() => setCreating(true)}
              className="flex cursor-none items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-brand"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </button>
          )}
        </div>

        <div className="flex flex-col gap-5 px-6 py-8 sm:px-12">
          {creating && <NewCategoryForm onDone={() => setCreating(false)} />}

          {categoryStats.length === 0 && !creating && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Tags className="h-10 w-10 text-text-dim" />
              <p className="font-['Bebas_Neue'] text-3xl uppercase tracking-widest text-text-muted">
                No Categories Yet
              </p>
              <p className="font-mono text-sm text-text-muted">
                Categories are created automatically when you log expenses.
              </p>
              <button
                onClick={() => setCreating(true)}
                className="group relative mt-2 flex cursor-none items-center gap-3 border border-stroke px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text transition-all hover:border-brand hover:bg-brand-dim hover:text-brand"
              >
                <Plus className="h-3.5 w-3.5 shrink-0" />
                Create one manually
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryStats.map(({ cat, allTime, thisMonth, entryCount }) => (
              <div
                key={cat.id}
                className="group border border-stroke transition-all hover:border-brand"
              >
                <div className="flex items-start gap-4 p-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl"
                    style={{ background: `${cat.color}22`, border: `1px solid ${cat.color}55` }}
                  >
                    {cat.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-sm font-medium text-text">{cat.name}</span>
                      <button
                        onClick={() => setEditing(cat)}
                        className="cursor-none p-0.5 text-text-dim opacity-0 transition-opacity hover:text-brand group-hover:opacity-100"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-text-dim">
                      {entryCount} {entryCount === 1 ? "entry" : "entries"}
                    </span>
                  </div>
                </div>

                <div className="flex border-t border-stroke/50">
                  <div className="flex flex-1 flex-col gap-1 border-r border-stroke/50 px-5 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-dim">This Month</span>
                    <span className="font-['Bebas_Neue'] text-2xl leading-none" style={{ color: cat.color }}>
                      {thisMonth.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-5 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-dim">All Time</span>
                    <span className="font-['Bebas_Neue'] text-2xl leading-none text-text-muted">
                      {allTime.toFixed(2)}
                    </span>
                  </div>
                </div>

                {allTime > 0 && (
                  <div className="h-0.5 bg-stroke">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${Math.min((thisMonth / allTime) * 100, 100)}%`,
                        background: cat.color,
                      }}
                    />
                  </div>
                )}

                <CategorySparkline categoryId={cat.id} color={cat.color} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditCategoryDialog category={editing} onClose={() => setEditing(null)} />
    </div>
  );
}
