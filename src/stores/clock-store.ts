import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { City } from "@/data/clock";

export interface ClockEntry {
  id: string;
  city: string;
  country: string;
  timezone: string;
  isPinned?: boolean;
  lat?: number;
  lng?: number;
}

interface ClockStore {
  now: Date;
  clocks: ClockEntry[];
  addClock: (city: City) => void;
  removeClock: (id: string) => void;
  _tick: () => void;
}

const MAX_CLOCKS = 10;

function resolveLocal(): ClockEntry {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parts = tz.split("/");
  return {
    id: "local",
    city: parts[1]?.replace(/_/g, " ") ?? "Local",
    country: parts[0] ?? "",
    timezone: tz,
    isPinned: true,
    // no lat/lng — will use Geolocation API
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
    lat: 0,
    lng: 0,
  },
  {
    id: "gmt",
    city: "London",
    country: "GMT / UK",
    timezone: "Europe/London",
    isPinned: true,
    lat: 51.5074,
    lng: -0.1278,
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
        if (clocks.some((c) => c.timezone === city.timezone)) return;
        set({
          clocks: [
            ...clocks,
            {
              id: crypto.randomUUID(),
              city: city.city,
              country: city.country,
              timezone: city.timezone,
              lat: city.lat,
              lng: city.lng,
            },
          ],
        });
      },

      removeClock: (id) => set({ clocks: get().clocks.filter((c) => c.id !== id) }),

      _tick: () => set({ now: new Date() }),
    }),
    {
      name: "clock-store",
      version: 2,
      migrate: () => ({ clocks: DEFAULT_CLOCKS }),
      partialize: (state) => ({ clocks: state.clocks }),
    },
  ),
);

let tickerStarted = false;
export function startGlobalTicker() {
  if (tickerStarted) return;
  tickerStarted = true;
  setInterval(() => useClockStore.getState()._tick(), 1000);
}
