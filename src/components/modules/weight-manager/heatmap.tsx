import { eachDayOfInterval, subWeeks, startOfWeek, endOfWeek, format, isFuture, getDay } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWeightStore } from "@/hooks/use-weight-store";
import { cn } from "@/lib/utils";

const WEEKS = 26;

function getIntensity(weight: number, min: number, max: number): string {
  if (min === max) return "opacity-60";
  const ratio = (weight - min) / (max - min);
  if (ratio < 0.25) return "opacity-30";
  if (ratio < 0.5) return "opacity-50";
  if (ratio < 0.75) return "opacity-70";
  return "opacity-100";
}

export function WeightHeatmap() {
  const { entries } = useWeightStore();

  const today = new Date();
  const start = startOfWeek(subWeeks(today, WEEKS - 1), { weekStartsOn: 0 });
  const end = endOfWeek(today, { weekStartsOn: 0 });
  const allDays = eachDayOfInterval({ start, end });

  const weights = Object.values(entries);
  const minW = weights.length ? Math.min(...weights) : 0;
  const maxW = weights.length ? Math.max(...weights) : 0;

  const weeks: Date[][] = [];
  let week: Date[] = [];
  allDays.forEach((day, i) => {
    if (i > 0 && getDay(day) === 0) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });
  if (week.length) weeks.push(week);

  const monthLabels: { label: string; colIndex: number }[] = [];
  weeks.forEach((wk, i) => {
    const firstDay = wk[0];
    if (i === 0 || firstDay.getDate() <= 7) {
      const label = format(firstDay, "MMM");
      if (!monthLabels.length || monthLabels[monthLabels.length - 1].label !== label) {
        monthLabels.push({ label, colIndex: i });
      }
    }
  });

  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalCols = weeks.length;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-full">
        {/* Month labels */}
        <div className="flex w-full pl-8 mb-1">
          {weeks.map((_, i) => {
            const label = monthLabels.find((m) => m.colIndex === i);
            return (
              <div key={i} className="font-mono text-[10px] text-muted-foreground text-left truncate" style={{ width: `${100 / totalCols}%` }}>
                {label?.label ?? ""}
              </div>
            );
          })}
        </div>

        {/* Grid rows */}
        {DAY_LABELS.map((dayLabel, dayIndex) => (
          <div key={dayLabel} className="flex items-center w-full gap-0 mb-[3px]">
            {/* Row label — fixed 2rem gutter */}
            <span className="w-8 shrink-0 text-right pr-1 font-mono text-[10px] text-muted-foreground/60 select-none">{dayIndex % 2 === 1 ? dayLabel : ""}</span>

            {/* Cells — flex-1 so they fill remaining width */}
            <div className="flex flex-1 gap-[3px]">
              {weeks.map((wk, wi) => {
                const day = wk.find((d) => getDay(d) === dayIndex);
                if (!day) return <div key={wi} className="flex-1 aspect-square" />;

                const dateKey = format(day, "yyyy-MM-dd");
                const weight = entries[dateKey];
                const future = isFuture(day);
                const hasEntry = weight !== undefined;

                return (
                  <Tooltip key={wi}>
                    <TooltipTrigger asChild>
                      <div className={cn("flex-1 aspect-square rounded-[2px] cursor-default transition-all", future ? "bg-muted/30" : hasEntry ? cn("bg-brand", getIntensity(weight, minW, maxW)) : "bg-muted/60 hover:bg-muted")} />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-mono text-xs">
                      <span className="text-muted-foreground">{format(day, "MMM d, yyyy")}</span>
                      {hasEntry && (
                        <>
                          <span className="mx-1 text-accent">·</span>
                          <span className="text-muted-foreground">{weight.toFixed(1)} kg</span>
                        </>
                      )}
                      {!hasEntry && !future && (
                        <>
                          <span className="mx-1 text-muted-foreground/50">·</span>
                          <span className="text-muted-foreground/70">no entry</span>
                        </>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
