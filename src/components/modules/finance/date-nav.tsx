import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, subDays, addDays, isToday, parseISO } from "date-fns";

interface DateNavProps {
  date: string;
  onChange: (date: string) => void;
}

export function DateNav({ date, onChange }: DateNavProps) {
  const parsed = parseISO(date);
  const atToday = isToday(parsed);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(format(subDays(parsed, 1), "yyyy-MM-dd"))}
        className="flex items-center justify-center w-8 h-8 border border-stroke hover:border-brand hover:text-brand text-text-muted transition-all cursor-none"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex flex-col items-center">
        <span className="font-['Bebas_Neue'] text-lg leading-none text-text">
          {format(parsed, "MMM d")}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
          {atToday ? "today" : format(parsed, "EEEE")}
        </span>
      </div>

      <button
        onClick={() => onChange(format(addDays(parsed, 1), "yyyy-MM-dd"))}
        disabled={atToday}
        className="flex items-center justify-center w-8 h-8 border border-stroke hover:border-brand hover:text-brand text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-none"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {!atToday && (
        <button
          onClick={() => onChange(format(new Date(), "yyyy-MM-dd"))}
          className="font-mono text-[9px] uppercase tracking-widest text-text-muted hover:text-brand border border-stroke hover:border-brand px-2 py-1 transition-all cursor-none"
        >
          Today
        </button>
      )}
    </div>
  );
}
