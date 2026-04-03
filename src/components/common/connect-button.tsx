import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to handle conditional Tailwind classes cleanly
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ConnectButtonProps {
  href: string;
  label: string;
  icon?: string;
  highlight?: boolean;
  isEmail?: boolean;
}

export function ConnectButton({ href, label, icon = "↗", highlight = false, isEmail = false }: ConnectButtonProps) {
  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noreferrer"}
      className={cn(
        "btn-shine",
        "inline-flex items-center gap-2 px-6 py-2.5 border transition-all duration-200 cursor-none",
        "text-[11px] tracking-[0.15em] uppercase font-inherit",
        highlight ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "border-[var(--color-stroke-mid)] text-[var(--color-text)]",
        "hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-brand-dim)]",
      )}
    >
      <span className="relative z-10 shrink-0">{icon}</span>
      <span className="relative z-10">{label}</span>
    </a>
  );
}
