import { useRef, useEffect } from "react";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cursorTarget = useRef({ x: -100, y: -100 });
  const cursorDisplay = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorTarget.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cursorDisplay.current.x = lerp(cursorDisplay.current.x, cursorTarget.current.x, 0.1);
      cursorDisplay.current.y = lerp(cursorDisplay.current.y, cursorTarget.current.y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorTarget.current.x - 4}px, ${cursorTarget.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cursorDisplay.current.x - 18}px, ${cursorDisplay.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { dotRef, ringRef };
}
