import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PillProps {
  children: React.ReactNode;
  className?: string; // Flexibility for layout-specific tweaks
}

export function Pill({ children, className }: PillProps) {
  return (
    <span className={cn("inline-block px-3 py-[3px] border border-[var(--color-brand)] rounded-[2px]", "text-[10px] text-[var(--color-brand)] tracking-[0.12em] uppercase font-medium", "whitespace-nowrap select-none", className)}>
      {children}
    </span>
  );
}
