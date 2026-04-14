export interface WeightEntry {
  date: string; // yyyy-MM-dd
  weight: number; // kg
}

export type WeightMap = Record<string, number>; // date string → kg
