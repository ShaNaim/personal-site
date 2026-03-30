import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionLabelProps {
  label: string;
  className?: string; // Added for occasional margin/spacing adjustments
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "text-[10px] tracking-[0.3em] uppercase text-brand mb-3 font-medium",
        "select-none pointer-events-none", // Typical for decorative brutalist labels
        className,
      )}
    >
      {label}
    </div>
  );
}
