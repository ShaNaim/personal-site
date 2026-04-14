import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeightMap } from "@/types/weight";

interface WeightStore {
  entries: WeightMap;
  setEntry: (date: string, weight: number) => void;
  removeEntry: (date: string) => void;
  getEntry: (date: string) => number | undefined;
}

export const useWeightStore = create<WeightStore>()(
  persist(
    (set, get) => ({
      entries: {},

      setEntry: (date, weight) =>
        set((state) => ({
          entries: { ...state.entries, [date]: weight },
        })),

      removeEntry: (date) =>
        set((state) => {
          const next = { ...state.entries };
          delete next[date];
          return { entries: next };
        }),

      getEntry: (date) => get().entries[date],
    }),
    { name: "weight-entries" },
  ),
);
