"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have the cn helper we discussed

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Essential for Next.js hydration to avoid "Flash of Unstyled Content"
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10 border border-stroke-subtle" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        // Base: Sharp corners and custom strokes
        "relative flex items-center justify-center w-10 h-10 transition-all duration-300",
        "border border-stroke bg-transparent",
        "hover:border-brand hover:bg-brand-dim",
        "group cursor-none active:scale-95",
      )}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-500 ease-brutalist", // Using custom easing
          "rotate-0 scale-100 dark:-rotate-90 dark:scale-0",
          "text-text group-hover:text-brand",
        )}
      />

      {/* Moon Icon */}
      <Moon className={cn("absolute h-4 w-4 transition-all duration-500 ease-brutalist", "rotate-90 scale-0 dark:rotate-0 dark:scale-100", "text-text group-hover:text-brand")} />

      {/* Decorative corner (Brutalist detail) */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
