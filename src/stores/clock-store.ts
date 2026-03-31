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

// Resolve user's local city/country from timezone string
// e.g. "Asia/Dhaka" → city: "Dhaka", country: "Asia"
function resolveLocal(): ClockEntry {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parts = tz.split("/");
  return {
    id: "local",
    city: parts[1]?.replace(/_/g, " ") ?? "Local",
    country: parts[0] ?? "",
    timezone: tz,
    isPinned: true,
  };
}

const DEFAULT_CLOCKS: ClockEntry[] = [
  resolveLocal(),
  {
    id: "utc",
    city: "UTC",
    country: "Universal Time",
    timezone: "UTC",
    isPinned: true,
  },
  {
    id: "gmt",
    city: "London",
    country: "GMT / UK",
    timezone: "Europe/London",
    isPinned: true,
  },
];

export const useClockStore = create<ClockStore>()(
  persist(
    (set, get) => ({
      now: new Date(),
      clocks: DEFAULT_CLOCKS,

      addClock: (city) => {
        const { clocks } = get();
        if (clocks.length >= MAX_CLOCKS) return;
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

      removeClock: (id) => set({ clocks: get().clocks.filter((c) => c.id !== id) }),

      _tick: () => set({ now: new Date() }),
    }),
    {
      name: "clock-store",
      partialize: (state) => ({ clocks: state.clocks }),
    },
  ),
);

let tickerStarted = false;

export function startGlobalTicker() {
  if (tickerStarted) return;
  tickerStarted = true;
  setInterval(() => {
    useClockStore.getState()._tick();
  }, 1000);
}
