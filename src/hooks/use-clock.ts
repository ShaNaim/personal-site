import { useClockStore, type ClockEntry } from "@/stores/clock-store";

interface ClockData {
  hours: number; // 12hr format (1–12)
  minutes: number;
  seconds: number;
  ampm: "AM" | "PM";
  diffLabel: string; // "+6h ahead" / "Same time"
  gmtLabel: string; // "GMT+6" / "GMT-5:30"
  isDaytime: boolean;
}

function getGmtLabel(timezone: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now);
  const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  // shortOffset gives "GMT+6", "GMT+5:30", "GMT-5" etc — exactly what we need
  return offset;
}

export function useClock(entry: ClockEntry): ClockData {
  const now = useClockStore((s) => s.now);

  const localTime = new Date(now.toLocaleString("en-US", { timeZone: entry.timezone }));

  const userTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  );

  // Diff from user local
  const offsetMs = localTime.getTime() - userTime.getTime();
  const offsetMinutes = Math.round(offsetMs / 60000);
  const absH = Math.floor(Math.abs(offsetMinutes) / 60);
  const absM = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes > 0 ? "+" : "-";

  const diffLabel = offsetMinutes === 0 ? "Your local time" : absM > 0 ? `${sign}${absH}h ${absM}m` : `${sign}${absH}h`;

  // 12hr conversion
  const raw24h = localTime.getHours();
  const ampm: "AM" | "PM" = raw24h >= 12 ? "PM" : "AM";
  const hours12 = raw24h % 12 === 0 ? 12 : raw24h % 12;

  const isDaytime = raw24h >= 6 && raw24h < 20;

  return {
    hours: hours12,
    minutes: localTime.getMinutes(),
    seconds: localTime.getSeconds(),
    ampm,
    diffLabel,
    gmtLabel: getGmtLabel(entry.timezone),
    isDaytime,
  };
}
