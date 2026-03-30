import { useState, useEffect } from "react";
export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Dhaka",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-12 py-6 bg-bg border-t border-stroke-subtle">
      {/* Copyright */}
      <span className="text-[11px] text-stroke tracking-widest uppercase">© 2025 SHANAIM SHOUROV</span>

      {/* Tech Stack Info */}
      <span className="text-[11px] text-stroke tracking-widest uppercase">BUILT WITH REACT + TYPESCRIPT</span>

      {/* Location Branding */}
      <span className="text-[11px] text-brand tracking-widest uppercase">BANGLADESH 🇧🇩 — {time}</span>
    </footer>
  );
}
