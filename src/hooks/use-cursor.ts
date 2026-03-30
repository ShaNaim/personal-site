import { useRef, useEffect } from "react";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cursorTarget = useRef({ x: -100, y: -100 });
  const cursorDisplay = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorTarget.current = { x: e.clientX, y: e.clientY };

      // Update dot immediately for 1:1 tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursorTarget.current.x - 4}px, ${cursorTarget.current.y - 4}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cursorDisplay.current.x = lerp(cursorDisplay.current.x, cursorTarget.current.x, 0.15);
      cursorDisplay.current.y = lerp(cursorDisplay.current.y, cursorTarget.current.y, 0.15);

      if (ringRef.current) {
        const hw = ringRef.current.offsetWidth / 2 + 2;
        const hh = ringRef.current.offsetHeight / 2 + 2;
        ringRef.current.style.transform = `translate3d(${cursorDisplay.current.x - hw}px, ${cursorDisplay.current.y - hh}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { dotRef, ringRef };
}
