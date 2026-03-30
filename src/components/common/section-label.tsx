interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--color-brand)",
        marginBottom: 12,
      }}
    >
      {label}
    </div>
  );
}
