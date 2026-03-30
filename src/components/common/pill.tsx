interface PillProps {
  children: React.ReactNode;
}

export function Pill({ children }: PillProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 12px",
        border: "1px solid var(--color-brand)",
        color: "var(--color-brand)",
        fontSize: 10,
        letterSpacing: "0.12em",
        borderRadius: "2px",
      }}
    >
      {children}
    </span>
  );
}
