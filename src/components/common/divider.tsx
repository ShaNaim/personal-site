interface DividerProps {
  style?: React.CSSProperties;
}

export function Divider({ style }: DividerProps) {
  return (
    <div
      style={{
        height: "1px",
        background: "linear-gradient(90deg, var(--color-brand), var(--color-brand-dim), transparent)",
        ...style,
      }}
    />
  );
}
