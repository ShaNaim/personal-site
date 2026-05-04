import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";
import type { Category, Expense, FixedCost, Budget } from "@/types/finance";

const CATEGORY_COLORS = [
  "#ff4d00", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

const CATEGORY_ICONS: Record<string, string> = {
  food: "🍕", restaurant: "🍕", lunch: "🍱", breakfast: "🥐", dinner: "🍽️",
  coffee: "☕", cafe: "☕", drink: "🥤",
  transport: "🚗", taxi: "🚕", uber: "🚗", bus: "🚌", train: "🚆", fuel: "⛽", gas: "⛽",
  shopping: "🛍️", clothes: "👗", clothing: "👗",
  entertainment: "🎬", movie: "🎬", gaming: "🎮", games: "🎮",
  health: "💊", medical: "🏥", gym: "💪", fitness: "💪",
  rent: "🏠", housing: "🏠", utilities: "💡", electricity: "💡", water: "💧",
  internet: "🌐", phone: "📱", subscription: "📺",
  education: "📚", books: "📖",
  travel: "✈️", vacation: "🏖️", hotel: "🏨",
  groceries: "🛒", supermarket: "🛒",
  savings: "💰", investment: "📈",
  misc: "💸", other: "💸",
};

function guessIcon(name: string): string {
  const key = name.toLowerCase().trim();
  for (const [keyword, icon] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(keyword)) return icon;
  }
  return "💸";
}

function pickColor(index: number): string {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

interface FinanceStore {
  categories: Category[];
  expenses: Expense[];
  fixedCosts: FixedCost[];
  budget: Budget;

  // Expenses
  addExpenses: (date: string, items: { categoryName: string; amount: number; note?: string }[]) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Pick<Expense, "amount" | "categoryId" | "note" | "date">>) => void;

  // Categories
  addCategory: (name: string, color?: string, icon?: string, keywords?: string[]) => Category;
  updateCategory: (id: string, updates: Partial<Omit<Category, "id">>) => void;
  deleteCategory: (id: string) => void;
  findOrCreateCategory: (name: string) => Category;

  // Fixed Costs
  addFixedCost: (cost: Omit<FixedCost, "id">) => void;
  updateFixedCost: (id: string, updates: Partial<Omit<FixedCost, "id">>) => void;
  removeFixedCost: (id: string) => void;

  // Budget
  setBudget: (monthly: number) => void;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      categories: [],
      expenses: [],
      fixedCosts: [],
      budget: { monthly: 0 },

      addExpenses: (date, items) => {
        const newExpenses: Expense[] = items.map((item) => {
          const category = get().findOrCreateCategory(item.categoryName);
          return {
            id: crypto.randomUUID(),
            date,
            categoryId: category.id,
            amount: item.amount,
            note: item.note,
          };
        });
        set((state) => ({ expenses: [...state.expenses, ...newExpenses] }));
      },

      removeExpense: (id) =>
        set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),

      updateExpense: (id, updates) =>
        set((state) => ({
          expenses: state.expenses.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),

      addCategory: (name, color, icon, keywords) => {
        const { categories } = get();
        const newCategory: Category = {
          id: crypto.randomUUID(),
          name: name.trim(),
          color: color ?? pickColor(categories.length),
          icon: icon ?? guessIcon(name),
          keywords: keywords ?? [],
        };
        set({ categories: [...categories, newCategory] });
        return newCategory;
      },

      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          expenses: state.expenses.filter((e) => e.categoryId !== id),
          fixedCosts: state.fixedCosts.filter((fc) => fc.categoryId !== id),
        })),

      findOrCreateCategory: (name) => {
        const { categories } = get();
        const normalized = name.trim().toLowerCase();
        const existing = categories.find(
          (c) =>
            c.name.toLowerCase() === normalized ||
            c.keywords?.some((k) => k.toLowerCase() === normalized),
        );
        if (existing) return existing;
        return get().addCategory(name);
      },

      addFixedCost: (cost) =>
        set((state) => ({
          fixedCosts: [...state.fixedCosts, { ...cost, id: crypto.randomUUID() }],
        })),

      updateFixedCost: (id, updates) =>
        set((state) => ({
          fixedCosts: state.fixedCosts.map((fc) => (fc.id === id ? { ...fc, ...updates } : fc)),
        })),

      removeFixedCost: (id) =>
        set((state) => ({ fixedCosts: state.fixedCosts.filter((fc) => fc.id !== id) })),

      setBudget: (monthly) => set({ budget: { monthly } }),
    }),
    { name: "finance-store", version: 1 },
  ),
);

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Parses strings like:
 *   "food: 50, coffee: 8"
 *   "food: 40 + 60 + 100"                    → food=200
 *   "food: 40 + 60 + 100 + travel: 50 + 50"  → food=200, travel=100
 *
 * Rules:
 *   - Comma = hard category separator
 *   - Plus = either additional amount for current category OR new category (if followed by "name: amount")
 */
export function parseExpenseInput(raw: string): { categoryName: string; amount: number }[] {
  const accumulated = new Map<string, number>();

  const commaGroups = raw.split(",").map((s) => s.trim()).filter(Boolean);

  for (const group of commaGroups) {
    const tokens = group.split("+").map((s) => s.trim()).filter(Boolean);
    let currentCategory: string | null = null;

    for (const token of tokens) {
      // "category: amount" or "category amount" (name must start with a letter)
      const catMatch = token.match(/^([a-zA-Z-￿][^:+,]*?)[\s:]+(\d+(?:[.,]\d+)?)$/);
      // bare number
      const numMatch = !catMatch && token.match(/^(\d+(?:[.,]\d+)?)$/);

      if (catMatch) {
        currentCategory = catMatch[1].trim();
        const amount = parseFloat(catMatch[2].replace(",", "."));
        if (!isNaN(amount) && amount > 0) {
          accumulated.set(currentCategory, (accumulated.get(currentCategory) ?? 0) + amount);
        }
      } else if (numMatch && currentCategory) {
        const amount = parseFloat(numMatch[1].replace(",", "."));
        if (!isNaN(amount) && amount > 0) {
          accumulated.set(currentCategory, (accumulated.get(currentCategory) ?? 0) + amount);
        }
      }
    }
  }

  return [...accumulated.entries()].map(([categoryName, amount]) => ({ categoryName, amount }));
}

export function getTodayKey(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function getMonthlyFixedTotal(fixedCosts: FixedCost[]): number {
  return fixedCosts.reduce((sum, fc) => {
    if (fc.frequency === "monthly") return sum + fc.amount;
    if (fc.frequency === "weekly") return sum + fc.amount * 4.33;
    if (fc.frequency === "yearly") return sum + fc.amount / 12;
    return sum;
  }, 0);
}
