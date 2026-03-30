interface ConnectButtonProps {
  href: string;
  label: string;
  icon?: string;
  highlight?: boolean;
  isEmail?: boolean;
}

export function ConnectButton({ href, label, icon = "↗", highlight = false, isEmail = false }: ConnectButtonProps) {
  return (
    <a href={href} target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noreferrer"} style={{ textDecoration: "none", color: "inherit", cursor: "none" }}>
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 24px",
          border: `1px solid ${highlight ? "var(--color-brand)" : "var(--color-stroke-mid)"}`,
          fontFamily: "inherit",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: "transparent",
          color: highlight ? "var(--color-brand)" : "var(--color-text)",
          cursor: "none",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-brand)";
          e.currentTarget.style.color = "var(--color-brand)";
          e.currentTarget.style.background = "var(--color-brand-dim)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = highlight ? "var(--color-brand)" : "var(--color-stroke-mid)";
          e.currentTarget.style.color = highlight ? "var(--color-brand)" : "var(--color-text)";
          e.currentTarget.style.background = "transparent";
        }}
      >
        <span>{icon}</span>
        {label}
      </button>
    </a>
  );
}
