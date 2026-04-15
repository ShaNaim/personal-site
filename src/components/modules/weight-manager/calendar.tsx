import * as React from "react";
import { format, isFuture, isToday as isDateToday, isPast } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useWeightStore } from "@/hooks/use-weight-store";

interface WeightCalendarProps {
  onSelectDate?: (date: Date) => void;
}

export function WeightCalendar({ onSelectDate }: WeightCalendarProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  const { entries } = useWeightStore();

  const handleClick = (date: Date, isDisabled: boolean, isOutside: boolean) => {
    if (isDisabled || isOutside) return;

    // Second click on already-selected date → open modal
    if (selected && format(selected, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) {
      onSelectDate?.(date);
    } else {
      // First click → just select
      setSelected(date);
    }
  };

  return (
    <div className="w-full mx-auto bg-black p-4 rounded-xl border border-zinc-800">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 px-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-brand" />
          <span className="text-[11px] font-mono text-zinc-500">today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-100" />
          <span className="text-[11px] font-mono text-zinc-500">past</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="text-[11px] font-mono text-zinc-500">future</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-zinc-900 border border-zinc-700 ring-1 ring-brand/40" />
          <span className="text-[11px] font-mono text-zinc-500">logged</span>
        </div>
        <span className="ml-auto text-[11px] font-mono text-zinc-600">tap once to select · tap again to log</span>
      </div>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={(date) => isFuture(date) && !isDateToday(date)}
        showOutsideDays={true}
        className="m-0"
        classNames={{
          months: "w-full",
          month: "w-full space-y-4",
          caption: "flex justify-between pt-1 relative items-center mb-4 px-2",
          caption_label: "text-sm font-mono text-white font-bold",
          nav: "flex items-center gap-1",
          nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-zinc-700 text-white"),
          month_grid: "w-full border-collapse",
          weekdays: "grid grid-cols-7 mb-2",
          weekday: "text-zinc-500 font-normal text-[0.8rem] uppercase text-center",
          weeks: "w-full flex flex-col gap-2",
          week: "grid grid-cols-7 w-full mt-1 gap-3",
          day: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 aspect-square",
        }}
        components={{
          Chevron: ({ orientation }) => {
            const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
            return <Icon className="h-4 w-4" />;
          },
          DayButton: ({ day, modifiers, ...props }) => {
            const dateKey = format(day.date, "yyyy-MM-dd");
            const weight = entries[dateKey];
            const isOutside = modifiers.outside;
            const isDisabled = modifiers.disabled;
            const isSelected = modifiers.selected;
            const isToday = isDateToday(day.date);
            const isFutureDate = isFuture(day.date) && !isToday;
            const isPastDate = isPast(day.date) && !isToday;

            return (
              <button
                {...props}
                onClick={() => handleClick(day.date, !!isDisabled, !!isOutside)}
                className={cn(
                  "group relative h-full w-full flex flex-col items-center justify-center gap-0.5 rounded-lg transition-all outline-none",

                  // Base hover
                  !isDisabled && !isOutside && "hover:bg-zinc-800/60 cursor-pointer",

                  // Outside days
                  isOutside && "opacity-10 pointer-events-none",

                  // Future days — dimmed
                  isFutureDate && !isOutside && "opacity-30 cursor-not-allowed",

                  // Has a weight entry
                  weight && !isOutside && "bg-zinc-900 border border-zinc-800",

                  // Selected (first click)
                  isSelected && !isToday && "ring-2 ring-zinc-400 bg-zinc-800/60",

                  // Today
                  isToday && "ring-2 ring-brand bg-brand/10",

                  // Selected + today
                  isSelected && isToday && "ring-2 ring-brand bg-brand/20",
                )}
              >
                {/* Pulse dot for today */}
                {isToday && (
                  <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
                  </span>
                )}

                {/* Date number */}
                <span
                  className={cn(
                    "text-[13px] font-bold leading-none transition-colors",
                    isOutside && "text-zinc-700",
                    isPastDate && !isOutside && !isSelected && "text-zinc-100",
                    isFutureDate && "text-zinc-600",
                    isToday && "text-brand",
                    isSelected && !isToday && "text-white",
                  )}
                >
                  {day.date.getDate()}
                </span>

                {/* Weight value */}
                {weight && !isOutside ? (
                  <span className="text-[10px] font-mono text-brand font-bold leading-none">{weight % 1 === 0 ? `${weight}` : weight.toFixed(1)}kg</span>
                ) : (
                  // Reserve height so all cells are same size
                  <span className="text-[10px] leading-none opacity-0 select-none">0</span>
                )}

                {/* "tap again" hint on selected dates */}
                {isSelected && !weight && <span className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-mono text-zinc-500 leading-none">tap to log</span>}
                {isSelected && weight && <span className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-mono text-zinc-500 leading-none">tap to edit</span>}
              </button>
            );
          },
        }}
      />
    </div>
  );
}
