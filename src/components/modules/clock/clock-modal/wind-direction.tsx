export function WindDirection({ degrees }: { degrees: number }) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const label = dirs[Math.round(degrees / 45) % 8];

  return (
    <span>
      {label} {degrees}°
    </span>
  );
}
