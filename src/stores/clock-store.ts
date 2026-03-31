import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { City } from "@/data/clock";

export interface ClockEntry {
  id: string;
  city: string;
  country: string;
  timezone: string;
  isPinned?: boolean;
}

interface ClockStore {
  now: Date;
  clocks: ClockEntry[];
  addClock: (city: City) => void;
  removeClock: (id: string) => void;
  _tick: () => void;
}

const MAX_CLOCKS = 10;

export const useClockStore = create<ClockStore>()(
  persist(
    (set, get) => ({
      now: new Date(),

      // Local time pinned by default — derived from system, no timezone needed
      clocks: [
        {
          id: "local",
          city: "Local",
          country: "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          isPinned: true,
        },
      ],

      addClock: (city) => {
        const { clocks } = get();

        // Enforce max (local pinned + 9 user clocks = 10 total)
        if (clocks.length >= MAX_CLOCKS) return;

        // Prevent duplicate timezones
        const exists = clocks.some((c) => c.timezone === city.timezone);
        if (exists) return;

        set({
          clocks: [
            ...clocks,
            {
              id: crypto.randomUUID(),
              city: city.city,
              country: city.country,
              timezone: city.timezone,
            },
          ],
        });
      },

      removeClock: (id) => {
        set({ clocks: get().clocks.filter((c) => c.id !== id) });
      },

      _tick: () => set({ now: new Date() }),
    }),
    {
      name: "clock-store",
      // Only persist clocks — not `now`, not functions
      partialize: (state) => ({ clocks: state.clocks }),
    },
  ),
);

// ── Global ticker — one setInterval for the entire app ──
// Lives outside the store so it's initialized once at module load
let tickerStarted = false;

export function startGlobalTicker() {
  if (tickerStarted) return;
  tickerStarted = true;
  setInterval(() => {
    useClockStore.getState()._tick();
  }, 1000);
}
