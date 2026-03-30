import { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";

interface AnimatedBarProps {
  level: number;
  color: string;
  delay?: number;
}

export function AnimatedBar({ level, color, delay = 0 }: AnimatedBarProps) {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView(0.1);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(t);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWidth(0);
    }
  }, [inView, level, delay]);

  return (
    <div ref={ref} className="h-[3px] w-full bg-[var(--color-stroke)] rounded-[2px] overflow-hidden">
      <div
        className="h-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `${width}%`,
          background: color,
          // Using 50 hex alpha for the glow (equivalent to 80 in your original CSS)
          boxShadow: `0 0 8px ${color}50`,
        }}
      />
    </div>
  );
}
