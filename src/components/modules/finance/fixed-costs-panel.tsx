import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useFinanceStore } from "@/stores/finance-store";
import type { FixedCost } from "@/types/finance";

const FREQ_LABELS: Record<FixedCost["frequency"], string> = {
  monthly: "/ mo",
  weekly: "/ wk",
  yearly: "/ yr",
};

interface AddFixedCostFormProps {
  onDone: () => void;
  initial?: FixedCost;
}

function AddFixedCostForm({ onDone, initial }: AddFixedCostFormProps) {
  const { addFixedCost, updateFixedCost, categories, findOrCreateCategory } = useFinanceStore();
  const [name, setName] = useState(initial?.name ?? "");
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [frequency, setFrequency] = useState<FixedCost["frequency"]>(initial?.frequency ?? "monthly");
  const [categoryName, setCategoryName] = useState(
    initial ? (categories.find((c) => c.id === initial.categoryId)?.name ?? "") : "",
  );

  const handleSubmit = () => {
    const amt = parseFloat(amount);
    if (!name.trim() || isNaN(amt) || amt <= 0) return;
    const category = findOrCreateCategory(categoryName || name);
    if (initial) {
      updateFixedCost(initial.id, { name: name.trim(), amount: amt, frequency, categoryId: category.id });
    } else {
      addFixedCost({ name: name.trim(), amount: amt, frequency, categoryId: category.id });
    }
    onDone();
  };

  return (
    <div className="border border-brand p-4 flex flex-col gap-3">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand">
        {initial ? "Edit" : "New"} Fixed Cost
      </span>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Name (e.g. Rent)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-2 border border-stroke bg-transparent px-3 py-2 font-mono text-sm text-text outline-none focus:border-brand transition-colors cursor-none"
        />
        <input
          type="text"
          placeholder="Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-stroke bg-transparent px-3 py-2 font-mono text-sm text-text outline-none focus:border-brand transition-colors cursor-none"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-stroke bg-transparent px-3 py-2 font-mono text-sm text-text outline-none focus:border-brand transition-colors cursor-none"
          min={0}
          step={0.01}
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as FixedCost["frequency"])}
          className="col-span-2 border border-stroke bg-background px-3 py-2 font-mono text-sm text-text outline-none focus:border-brand transition-colors cursor-none"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDone}
          className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest border border-stroke text-text-muted hover:border-text-muted cursor-none transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="ml-auto px-5 py-2 font-mono text-[10px] uppercase tracking-widest border border-brand text-brand bg-brand-dim hover:bg-brand hover:text-background cursor-none transition-all"
        >
          {initial ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export function FixedCostsPanel() {
  const { fixedCosts, removeFixedCost } = useFinanceStore();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<FixedCost | null>(null);

  const { categories } = useFinanceStore();

  return (
    <div className="flex flex-col gap-0 border border-stroke">
      <div className="flex items-center justify-between px-5 py-3 border-b border-stroke">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand">Fixed Costs</span>
        {!adding && !editing && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-text-muted hover:text-brand cursor-none transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        )}
      </div>

      {(adding) && (
        <div className="p-4">
          <AddFixedCostForm onDone={() => setAdding(false)} />
        </div>
      )}

      {fixedCosts.length === 0 && !adding && (
        <div className="px-5 py-8 text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            No fixed costs yet
          </span>
        </div>
      )}

      {fixedCosts.map((fc) => {
        const cat = categories.find((c) => c.id === fc.categoryId);
        return editing?.id === fc.id ? (
          <div key={fc.id} className="p-4">
            <AddFixedCostForm initial={fc} onDone={() => setEditing(null)} />
          </div>
        ) : (
          <div key={fc.id} className="flex items-center gap-3 px-5 py-3 border-b border-stroke last:border-b-0 group">
            {cat && <span className="text-base">{cat.icon}</span>}
            <div className="flex-1 min-w-0">
              <span className="font-mono text-xs text-text truncate block">{fc.name}</span>
              {cat && (
                <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest">{cat.name}</span>
              )}
            </div>
            <span className="font-['Bebas_Neue'] text-lg leading-none text-brand shrink-0">
              {fc.amount.toFixed(2)}
              <span className="font-mono text-[9px] text-text-dim ml-1">{FREQ_LABELS[fc.frequency]}</span>
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditing(fc)}
                className="text-text-muted hover:text-brand cursor-none transition-colors p-1"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => removeFixedCost(fc.id)}
                className="text-text-muted hover:text-red-400 cursor-none transition-colors p-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
