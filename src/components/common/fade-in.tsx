import { useInView } from "@/hooks/use-in-view";
import type { Direction } from "@/types";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
}

const transforms: Record<Direction, string> = {
  up: "translateY(32px)",
  down: "translateY(-32px)",
  left: "translateX(-32px)",
  right: "translateX(32px)",
};

export function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
