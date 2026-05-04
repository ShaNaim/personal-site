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
import { useFinanceStore } from "@/stores/finance-store";

const DAY_HEADERS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2019 }, (_, i) => 2020 + i);

interface FinanceCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onDoubleClickDate?: (date: string) => void;
}

export function FinanceCalendar({ selectedDate, onSelectDate, onDoubleClickDate }: FinanceCalendarProps) {
  const [viewMonth, setViewMonth] = React.useState(new Date());
  const { expenses } = useFinanceStore();

  const dailyTotals = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const exp of expenses) {
      map[exp.date] = (map[exp.date] ?? 0) + exp.amount;
    }
    return map;
  }, [expenses]);

  const maxInMonth = React.useMemo(() => {
    const monthStart = format(startOfMonth(viewMonth), "yyyy-MM-dd");
    const monthEnd = format(endOfMonth(viewMonth), "yyyy-MM-dd");
    return Math.max(
      1,
      ...Object.entries(dailyTotals)
        .filter(([d]) => d >= monthStart && d <= monthEnd)
        .map(([, v]) => v),
    );
  }, [dailyTotals, viewMonth]);

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
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-stroke px-6 py-5">
        <div className="flex items-baseline gap-3">
          <h2 className="font-['Bebas_Neue'] text-[48px] leading-none tracking-wider text-text uppercase sm:text-[60px]">
            {format(viewMonth, "MMMM")}
          </h2>
          <select
            value={getYear(viewMonth)}
            onChange={handleYearChange}
            className="cursor-none appearance-none border-none bg-transparent font-mono text-base text-text-muted outline-none transition-colors hover:text-brand"
          >
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-bg text-text">
                {y}
              </option>
            ))}
          </select>
          <select
            value={getMonth(viewMonth)}
            onChange={handleMonthChange}
            className="cursor-none appearance-none border-none bg-transparent font-mono text-xs uppercase tracking-widest text-text-muted outline-none transition-colors hover:text-brand"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i} className="bg-bg text-text">
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="cursor-none flex h-9 w-9 items-center justify-center border border-stroke text-text-muted transition-all hover:border-brand hover:text-brand"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleToday}
            className="cursor-none h-9 border border-stroke px-5 font-mono text-xs uppercase tracking-[0.2em] text-text-muted transition-all hover:border-brand hover:text-brand"
          >
            Today
          </button>
          <button
            onClick={handleNext}
            className="cursor-none flex h-9 w-9 items-center justify-center border border-stroke text-text-muted transition-all hover:border-brand hover:text-brand"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* DAY HEADERS */}
      <div className="grid grid-cols-7 border-b border-stroke bg-bg-alt">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={d}
            className={cn(
              "py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-text-muted",
              i < 6 && "border-r border-stroke",
            )}
          >
            {d}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7">
        {allDays.map((day, i) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const total = dailyTotals[dateKey];
          const hasSpend = total !== undefined && total > 0;
          const isCurrentMonth = isSameMonth(day, viewMonth);
          const isToday = isDateToday(day);
          const isFutureDay = isFuture(day) && !isToday;
          const isSelected = dateKey === selectedDate;
          const isClickable = isCurrentMonth && !isFutureDay;

          const intensity = hasSpend && isCurrentMonth ? 0.12 + (total / maxInMonth) * 0.48 : 0;
          const isLastCol = (i + 1) % 7 === 0;
          const isLastRow = i >= allDays.length - 7;

          return (
            <button
              key={dateKey}
              onClick={() => {
                if (!isClickable) return;
                onSelectDate(dateKey);
              }}
              onDoubleClick={() => {
                if (isClickable && onDoubleClickDate) onDoubleClickDate(dateKey);
              }}
              disabled={!isClickable}
              className={cn(
                "group relative flex h-24 flex-col justify-between p-2.5 text-left transition-all duration-150 sm:h-28 sm:p-3",
                !isLastCol && "border-r border-stroke",
                !isLastRow && "border-b border-stroke",
                !isCurrentMonth && "pointer-events-none bg-bg-alt opacity-30",
                isCurrentMonth && isFutureDay && "pointer-events-none opacity-30",
                isSelected && isCurrentMonth && "ring-1 ring-inset ring-brand",
                isClickable && "cursor-none hover:bg-brand-dim",
              )}
              style={
                hasSpend && isCurrentMonth
                  ? { background: `rgba(255, 77, 0, ${intensity})` }
                  : undefined
              }
            >
              {/* Today corner triangle */}
              {isToday && (
                <div
                  className="pointer-events-none absolute left-0 top-0 h-0 w-0"
                  style={{
                    borderTop: "28px solid var(--color-brand)",
                    borderRight: "28px solid transparent",
                  }}
                />
              )}

              {/* Date number */}
              <span
                className={cn(
                  "font-mono text-base font-bold leading-none sm:text-xl",
                  isToday ? "pl-6 text-brand" : "text-text-muted",
                  hasSpend && !isToday && isCurrentMonth && "text-text",
                )}
              >
                {format(day, "d")}
              </span>

              {/* Daily total */}
              {hasSpend && isCurrentMonth && (
                <span className="font-['Bebas_Neue'] text-xl leading-none text-brand sm:text-3xl">
                  {total >= 1000
                    ? `${(total / 1000).toFixed(1)}k`
                    : total % 1 === 0
                      ? total
                      : total.toFixed(1)}
                </span>
              )}

              {/* Hover hint */}
              {isClickable && (
                <span
                  className={cn(
                    "absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100",
                    hasSpend ? "text-brand" : "text-text-dim",
                  )}
                >
                  dbl: log
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
