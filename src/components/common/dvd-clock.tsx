import { useEffect, useRef } from "react";
import { AnalogClock } from "@/components/common/analog-clock";
import { useClockStore } from "@/stores/clock-store";

const SIZE = 24;
const SPEED = 1.2; // px per frame

export function DvdClock() {
  const now = useClockStore((s) => s.now);
  const containerRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 80, y: 80 });
  const vel = useRef({ x: SPEED, y: SPEED });
  const rafId = useRef<number>(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const container = containerRef.current;
      const div = divRef.current;
      if (!container || !div) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const W = container.clientWidth;
      const H = container.clientHeight;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Bounce off edges
      if (pos.current.x <= 0) {
        pos.current.x = 0;
        vel.current.x = Math.abs(vel.current.x);
      } else if (pos.current.x + SIZE >= W) {
        pos.current.x = W - SIZE;
        vel.current.x = -Math.abs(vel.current.x);
      }

      if (pos.current.y <= 0) {
        pos.current.y = 0;
        vel.current.y = Math.abs(vel.current.y);
      } else if (pos.current.y + SIZE >= H) {
        pos.current.y = H - SIZE;
        vel.current.y = -Math.abs(vel.current.y);
      }

      div.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div ref={divRef} className="absolute top-0 left-0 opacity-20" style={{ width: SIZE, height: SIZE, willChange: "transform" }}>
        <AnalogClock hours={now.getHours()} minutes={now.getMinutes()} seconds={now.getSeconds()} size={SIZE} />
      </div>
    </div>
  );
}
