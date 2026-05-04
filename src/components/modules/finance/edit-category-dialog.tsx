import { useState, useEffect, useRef } from "react";
import { X, Trash2, Plus } from "lucide-react";
import { useFinanceStore } from "@/stores/finance-store";
import type { Category } from "@/types/finance";

const PRESET_COLORS = [
  "#ff4d00", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#a855f7", "#ef4444", "#64748b", "#78716c",
];

const PRESET_ICONS = ["💸", "🍕", "☕", "🚗", "🛍️", "🎬", "💊", "🏠", "📱", "✈️", "🛒", "💰", "📚", "🎮", "💡"];

interface EditCategoryDialogProps {
  category: Category | null;
  onClose: () => void;
}

export function EditCategoryDialog({ category, onClose }: EditCategoryDialogProps) {
  const { updateCategory, deleteCategory } = useFinanceStore();
  const [name, setName] = useState(category?.name ?? "");
  const [color, setColor] = useState(category?.color ?? "#ff4d00");
  const [icon, setIcon] = useState(category?.icon ?? "💸");
  const [keywords, setKeywords] = useState<string[]>(category?.keywords ?? []);
  const [kwInput, setKwInput] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const kwRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!category) return;
    setName(category.name);
    setColor(category.color);
    setIcon(category.icon);
    setKeywords(category.keywords ?? []);
    setKwInput("");
    setConfirmDelete(false);
  }, [category]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!category) return null;

  const addKeyword = () => {
    const kw = kwInput.trim().toLowerCase();
    if (kw && !keywords.includes(kw)) setKeywords((prev) => [...prev, kw]);
    setKwInput("");
    kwRef.current?.focus();
  };

  const removeKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  const handleKwKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKeyword(); }
    if (e.key === "Backspace" && kwInput === "" && keywords.length > 0) {
      setKeywords((prev) => prev.slice(0, -1));
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    updateCategory(category.id, { name: name.trim(), color, icon, keywords });
    onClose();
  };

  const handleDelete = () => {
    if (confirmDelete) { deleteCategory(category.id); onClose(); }
    else setConfirmDelete(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm border border-brand bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand">Edit Category</span>
          <button onClick={onClose} className="cursor-none text-text-muted transition-colors hover:text-brand">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5">
          {/* Icon */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Icon</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_ICONS.map((em) => (
                <button
                  key={em}
                  onClick={() => setIcon(em)}
                  className={`flex h-10 w-10 cursor-none items-center justify-center border text-xl transition-all ${
                    icon === em ? "border-brand bg-brand-dim" : "border-stroke hover:border-text-muted"
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full cursor-none border border-stroke bg-transparent px-3 py-2.5 font-mono text-sm text-text outline-none transition-colors focus:border-brand"
            />
          </div>

          {/* Keywords */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
              Keywords / Aliases
            </span>
            <p className="font-mono text-[10px] text-text-dim">
              Any of these words in the quick log will map to this category.
            </p>

            {/* Tag display + input */}
            <div
              className="flex min-h-[42px] flex-wrap gap-1.5 border border-stroke p-2 transition-colors focus-within:border-brand cursor-text"
              onClick={() => kwRef.current?.focus()}
            >
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="flex items-center gap-1 border border-stroke bg-bg-alt px-2 py-0.5 font-mono text-xs text-text"
                >
                  {kw}
                  <button
                    onClick={() => removeKeyword(kw)}
                    className="cursor-none text-text-dim hover:text-red-400 transition-colors"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
              <input
                ref={kwRef}
                type="text"
                value={kwInput}
                onChange={(e) => setKwInput(e.target.value)}
                onKeyDown={handleKwKeyDown}
                placeholder={keywords.length === 0 ? "type keyword + Enter" : ""}
                className="min-w-[100px] flex-1 cursor-none bg-transparent font-mono text-xs text-text outline-none placeholder:text-text-dim"
              />
            </div>

            <button
              onClick={addKeyword}
              disabled={!kwInput.trim()}
              className="cursor-none flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-brand disabled:opacity-30"
            >
              <Plus className="h-3 w-3" /> Add keyword
            </button>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Color</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-7 w-7 cursor-none transition-all ${color === c ? "scale-110 ring-2 ring-brand ring-offset-2 ring-offset-background" : "hover:scale-105"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-stroke px-5 py-4">
          <button
            onClick={handleDelete}
            className={`flex cursor-none items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              confirmDelete
                ? "border-red-500 bg-red-500/10 text-red-500"
                : "border-stroke text-text-muted hover:border-red-400 hover:text-red-400"
            }`}
          >
            <Trash2 className="h-3 w-3" />
            {confirmDelete ? "Confirm" : "Delete"}
          </button>
          {confirmDelete && (
            <button
              onClick={() => setConfirmDelete(false)}
              className="cursor-none border border-stroke px-4 py-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-all hover:border-text-muted"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="ml-auto cursor-none border border-brand bg-brand-dim px-5 py-2 font-mono text-xs uppercase tracking-widest text-brand transition-all hover:bg-brand hover:text-background disabled:cursor-not-allowed disabled:opacity-30"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
