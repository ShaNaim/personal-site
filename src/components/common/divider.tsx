interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Divider({ className, style }: DividerProps) {
  return (
    <div
      className={`h-px ${className ?? ""}`}
      style={{
        background: "linear-gradient(90deg, var(--color-brand), var(--color-brand-dim), transparent)",
        ...style,
      }}
    />
  );
}
