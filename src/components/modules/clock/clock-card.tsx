import { memo } from "react";
import { X, Sun, Moon } from "lucide-react";
import { ControlledFlipClock } from "@/components/common/controlled-flip-clock";
import { useClock } from "@/hooks/use-clock";
import { useClockStore, type ClockEntry } from "@/stores/clock-store";

interface ClockCardProps {
  entry: ClockEntry;
}

export const ClockCard = memo(function ClockCard({ entry }: ClockCardProps) {
  const removeClock = useClockStore((s) => s.removeClock);
  const { hours, minutes, seconds, ampm, diffLabel, gmtLabel, isDaytime } = useClock(entry);

  return (
    <div className="group relative border border-stroke bg-bg-card p-6 transition-all duration-300 hover:border-brand rounded-sm">
      {/* Remove — only for non-pinned */}
      {!entry.isPinned && (
        <button onClick={() => removeClock(entry.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-text-faint hover:text-brand p-1">
          <X size={12} />
        </button>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            {isDaytime ? <Sun size={11} className="text-brand opacity-70" /> : <Moon size={11} className="text-text-mid opacity-70" />}
            <span className="font-bebas text-[18px] tracking-widest text-text uppercase">{entry.city}</span>
            {entry.isPinned && entry.id === "local" && <span className="text-[8px] tracking-[0.2em] text-brand border border-brand px-1.5 py-0.5 leading-none uppercase">Local</span>}
          </div>

          {/* Country */}
          <div className="text-[10px] text-text-faint tracking-wider">{entry.country}</div>
        </div>

        {/* GMT + diff */}
        <div className="text-right shrink-0">
          <div className="font-mono text-[13px] text-brand tracking-wider">{gmtLabel}</div>
          <div className="text-[10px] text-text-faint tracking-wide mt-0.5">{diffLabel}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-stroke-subtle mb-4" />

      {/* Clock + AM/PM */}
      <div className="flex flex-col items-center gap-2">
        <ControlledFlipClock hours={hours} minutes={minutes} seconds={seconds} size="sm" variant="outline" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-text-faint uppercase">{ampm}</span>
      </div>
    </div>
  );
});
