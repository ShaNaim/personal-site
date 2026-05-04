export interface Category {
  id: string;
  name: string;
  color: string; // hex
  icon: string; // emoji
  keywords?: string[]; // aliases that map to this category
}

export interface Expense {
  id: string;
  date: string; // yyyy-MM-dd
  categoryId: string;
  amount: number;
  note?: string;
}

export interface FixedCost {
  id: string;
  name: string;
  amount: number;
  categoryId: string;
  frequency: "monthly" | "weekly" | "yearly";
}

export interface Budget {
  monthly: number;
}

export interface ParsedExpenseItem {
  rawCategory: string;
  amount: number;
}
