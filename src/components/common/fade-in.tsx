import { useInView } from "@/hooks/use-in-view";
import type { Direction } from "@/types";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string; // Added for layout flexibility
}

const directions: Record<Direction, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
};

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const [ref, inView] = useInView(0.1); // 10% visibility trigger

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // State-based values
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : undefined,

        // Transition logic (Keep inline for the dynamic delay)
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDelay: `${delay}ms`,
      }}
      // Fallback Tailwind classes for the initial transform state
      data-direction={!inView ? directions[direction] : undefined}
    >
      <div className={!inView ? directions[direction] : "translate-0 transition-transform"}>{children}</div>
    </div>
  );
}
