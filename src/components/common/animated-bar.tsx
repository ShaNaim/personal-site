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
    }
  }, [inView, level, delay]);

  return (
    <div
      ref={ref}
      style={{
        height: "3px",
        background: "var(--color-stroke)",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: color,
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </div>
  );
}
