import * as React from "react";
import {
  format,
  isFuture,
  isToday as isDateToday,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  getYear,
  getMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWeightStore } from "@/hooks/use-weight-store";

const DAY_HEADERS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2019 }, (_, i) => 2020 + i);

interface WeightCalendarProps {
  onSelectDate?: (date: Date) => void;
}

export function WeightCalendar({ onSelectDate }: WeightCalendarProps) {
  const [viewMonth, setViewMonth] = React.useState(new Date());
  const { entries } = useWeightStore();

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const allDays = eachDayOfInterval({ start: calStart, end: calEnd });

  const handlePrev = () => setViewMonth((m) => subMonths(m, 1));
  const handleNext = () => setViewMonth((m) => addMonths(m, 1));
  const handleToday = () => setViewMonth(new Date());

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMonth((m) => {
      const d = new Date(m);
      d.setFullYear(parseInt(e.target.value));
      return d;
    });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMonth((m) => {
      const d = new Date(m);
      d.setMonth(parseInt(e.target.value));
      return d;
    });
  };

  return (
    <div className="border border-stroke">
      {/* ── HEADER ─────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-stroke px-6 py-4">
        <div className="flex items-baseline gap-3">
          <h2 className="font-['Bebas_Neue'] text-[40px] leading-none tracking-wider text-[var(--color-text)] uppercase sm:text-[52px]">
            {format(viewMonth, "MMMM")}
          </h2>

          {/* Year dropdown */}
          <select
            value={getYear(viewMonth)}
            onChange={handleYearChange}
            className="cursor-none bg-transparent font-mono text-sm text-[var(--color-text-muted)] border-none outline-none appearance-none hover:text-[var(--color-brand)] transition-colors"
          >
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-[var(--color-bg)] text-[var(--color-text)]">
                {y}
              </option>
            ))}
          </select>

          {/* Month dropdown */}
          <select
            value={getMonth(viewMonth)}
            onChange={handleMonthChange}
            className="cursor-none bg-transparent font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] border-none outline-none appearance-none hover:text-[var(--color-brand)] transition-colors"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i} className="bg-[var(--color-bg)] text-[var(--color-text)]">
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="cursor-none flex h-8 w-8 items-center justify-center border border-stroke text-[var(--color-text-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleToday}
            className="cursor-none h-8 px-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] border border-stroke hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all"
          >
            Today
          </button>
          <button
            onClick={handleNext}
            className="cursor-none flex h-8 w-8 items-center justify-center border border-stroke text-[var(--color-text-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all"
            aria-label="Next month"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── DAY HEADERS ───────────────────────────── */}
      <div className="grid grid-cols-7 border-b border-stroke bg-[var(--color-bg-alt)]">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={d}
            className={cn(
              "py-2.5 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]",
              i < 6 && "border-r border-stroke",
            )}
          >
            {d}
          </div>
        ))}
      </div>

      {/* ── CALENDAR GRID ─────────────────────────── */}
      <div className="grid grid-cols-7">
        {allDays.map((day, i) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const weight = entries[dateKey];
          const isCurrentMonth = isSameMonth(day, viewMonth);
          const isToday = isDateToday(day);
          const isFutureDay = isFuture(day) && !isToday;
          const isClickable = isCurrentMonth && !isFutureDay;
          const hasWeight = weight !== undefined;

          const isLastCol = (i + 1) % 7 === 0;
          const isLastRow = i >= allDays.length - 7;

          return (
            <button
              key={dateKey}
              onClick={() => isClickable && onSelectDate?.(day)}
              disabled={!isClickable}
              className={cn(
                "group relative flex flex-col justify-between p-2 sm:p-3 h-[72px] sm:h-24 text-left transition-all duration-150",
                !isLastCol && "border-r border-stroke",
                !isLastRow && "border-b border-stroke",

                // Background states
                !isCurrentMonth && "bg-[var(--color-bg-alt)] opacity-30 pointer-events-none",
                isCurrentMonth && !hasWeight && !isToday && isFutureDay && "opacity-30 pointer-events-none",
                hasWeight && isCurrentMonth && "bg-[var(--color-brand-dim)]",
                isToday && "bg-[var(--color-brand-dim)]",

                // Interactions
                isClickable && "cursor-none hover:bg-[var(--color-brand-dim)]",
              )}
            >
              {/* Today corner triangle */}
              {isToday && (
                <div
                  className="absolute top-0 left-0 h-0 w-0 pointer-events-none"
                  style={{
                    borderTop: "20px solid var(--color-brand)",
                    borderRight: "20px solid transparent",
                  }}
                />
              )}

              {/* Logged dot */}
              {hasWeight && isCurrentMonth && !isToday && (
                <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] opacity-60" />
              )}

              {/* Date number */}
              <span
                className={cn(
                  "font-mono text-xs font-bold leading-none sm:text-sm",
                  isToday ? "text-[var(--color-brand)] pl-4" : "text-[var(--color-text-muted)]",
                  hasWeight && !isToday && isCurrentMonth && "text-[var(--color-text)]",
                )}
              >
                {format(day, "d")}
              </span>

              {/* Weight value */}
              {hasWeight && isCurrentMonth && (
                <div className="flex items-baseline gap-0.5 leading-none">
                  <span className="font-['Bebas_Neue'] text-lg text-[var(--color-brand)] sm:text-2xl leading-none">
                    {weight % 1 === 0 ? weight : weight.toFixed(1)}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-brand)] opacity-60 uppercase">kg</span>
                </div>
              )}

              {/* Hover hint */}
              {isClickable && (
                <span
                  className={cn(
                    "absolute bottom-1.5 right-2 font-mono text-[8px] uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100",
                    hasWeight ? "text-[var(--color-brand)]" : "text-[var(--color-text-dim)]",
                  )}
                >
                  {hasWeight ? "edit" : "+ log"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
