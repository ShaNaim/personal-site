export function Footer() {
  return (
    <footer
      style={{
        padding: "24px 48px",
        borderTop: "1px solid var(--color-stroke-subtle)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        background: "var(--color-bg)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "var(--color-stroke)",
          letterSpacing: "0.1em",
        }}
      >
        © 2025 SHANAIM SHOUROV
      </span>
      <span
        style={{
          fontSize: 11,
          color: "var(--color-stroke)",
          letterSpacing: "0.1em",
        }}
      >
        BUILT WITH REACT + TYPESCRIPT
      </span>
      <span
        style={{
          fontSize: 11,
          color: "var(--color-brand)",
          letterSpacing: "0.1em",
        }}
      >
        BANGLADESH 🇧🇩
      </span>
    </footer>
  );
}
