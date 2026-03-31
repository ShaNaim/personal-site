import { useClockStore, type ClockEntry } from "@/stores/clock-store";

interface ClockData {
  hours: number;
  minutes: number;
  seconds: number;
  offsetLabel: string; // e.g. "+6:00" or "-5:30"
  diffLabel: string; // e.g. "+3 hrs" or "same time"
  isDaytime: boolean;
  is24hAhead: boolean; // crosses day boundary forward
  is24hBehind: boolean; // crosses day boundary backward
}

export function useClock(entry: ClockEntry): ClockData {
  const now = useClockStore((s) => s.now);

  // Derive local time for this timezone
  const localTime = new Date(now.toLocaleString("en-US", { timeZone: entry.timezone }));

  // User's own local time
  const userTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  );

  // Raw offset in minutes between this clock and user local
  const offsetMs = localTime.getTime() - userTime.getTime();
  const offsetMinutes = Math.round(offsetMs / 60000);
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? "+" : "-";

  const offsetLabel = offsetMinutes === 0 ? "Local" : `${sign}${offsetHours}${offsetMins > 0 ? `:${String(offsetMins).padStart(2, "0")}` : ""}`;

  const diffLabel = offsetMinutes === 0 ? "Same time" : offsetMins > 0 ? `${sign}${offsetHours}h ${offsetMins}m` : `${sign}${offsetHours}h`;

  const hour = localTime.getHours();
  const isDaytime = hour >= 6 && hour < 20;

  return {
    hours: localTime.getHours(),
    minutes: localTime.getMinutes(),
    seconds: localTime.getSeconds(),
    offsetLabel,
    diffLabel,
    isDaytime,
    is24hAhead: offsetMinutes >= 1440,
    is24hBehind: offsetMinutes <= -1440,
  };
}
