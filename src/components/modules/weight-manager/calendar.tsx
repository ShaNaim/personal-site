import * as React from "react";
import { format, isFuture, isToday as isDateToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useWeightStore } from "@/hooks/use-weight-store";

interface WeightCalendarProps {
  onSelectDate?: (date: Date) => void;
}

export function WeightCalendar({ onSelectDate }: WeightCalendarProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date());
  const { entries } = useWeightStore();

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    if (date && onSelectDate) {
      onSelectDate(date);
    }
  };

  return (
    <div className="w-full mx-auto bg-black p-4 rounded-xl border border-zinc-800">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
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
          weeks: "w-full",
          week: "grid grid-cols-7 w-full mt-1",
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

            return (
              <button
                {...props}
                onClick={() => {
                  if (!isDisabled && !isOutside) handleSelect(day.date);
                }}
                className={cn(
                  "group relative h-full w-full flex flex-col items-center justify-center rounded-lg transition-all outline-none",
                  "hover:bg-zinc-800/50 focus-visible:ring-1 focus-visible:ring-[#ff4500]",
                  isOutside && "opacity-10 pointer-events-none",
                  weight && !isOutside && "bg-zinc-900 border border-zinc-800",
                  isSelected && "border-[#ff4500] ring-1 ring-[#ff4500]/30 bg-zinc-900/50",
                )}
              >
                <span className={cn("text-[13px] font-bold transition-colors", isOutside ? "text-zinc-700" : "text-zinc-100", isSelected && "text-[#ff4500]")}>{day.date.getDate()}</span>
                {weight && !isOutside && <span className="text-[10px] font-mono text-[#ff4500] font-bold leading-none mt-1">{weight}kg</span>}
              </button>
            );
          },
        }}
      />
    </div>
  );
}
