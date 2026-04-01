import { memo } from "react";

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
  size?: number;
}

export const AnalogClock = memo(function AnalogClock({ hours, minutes, seconds, size = 24 }: AnalogClockProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2; // radius with small padding

  // Angles in degrees — 12 o'clock = -90deg offset
  const secondDeg = seconds * 6 - 90;
  const minuteDeg = minutes * 6 + seconds * 0.1 - 90; // smooth sweep
  const hourDeg = (hours % 12) * 30 + minutes * 0.5 - 90; // smooth sweep

  function handCoords(deg: number, length: number) {
    const rad = (deg * Math.PI) / 180;
    return {
      x2: cx + Math.cos(rad) * length,
      y2: cy + Math.sin(rad) * length,
    };
  }

  const hourHand = handCoords(hourDeg, r * 0.5);
  const minuteHand = handCoords(minuteDeg, r * 0.72);
  const secondHand = handCoords(secondDeg, r * 0.82);

  // Hour tick marks
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const deg = i * 30 - 90;
    const rad = (deg * Math.PI) / 180;
    const isQuarter = i % 3 === 0;
    const inner = isQuarter ? r * 0.78 : r * 0.85;
    return {
      x1: cx + Math.cos(rad) * inner,
      y1: cy + Math.sin(rad) * inner,
      x2: cx + Math.cos(rad) * r,
      y2: cy + Math.sin(rad) * r,
      isQuarter,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      {/* Face */}
      <circle cx={cx} cy={cy} r={r} fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth={1} />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.isQuarter ? "var(--color-brand)" : "var(--color-stroke-mid)"} strokeWidth={t.isQuarter ? 1.5 : 0.75} strokeLinecap="round" />
      ))}

      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hourHand.x2} y2={hourHand.y2} stroke="var(--color-text)" strokeWidth={2} strokeLinecap="round" />

      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={minuteHand.x2} y2={minuteHand.y2} stroke="var(--color-text-muted)" strokeWidth={1.5} strokeLinecap="round" />

      {/* Second hand */}
      <line x1={cx} y1={cy} x2={secondHand.x2} y2={secondHand.y2} stroke="var(--color-brand)" strokeWidth={0.75} strokeLinecap="round" />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={1.5} fill="var(--color-brand)" />
    </svg>
  );
});
