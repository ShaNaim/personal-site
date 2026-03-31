import type { LucideIcon } from "lucide-react";

interface WeatherStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  children?: React.ReactNode;
  iconColor?: string;
}

export function WeatherStatCard({ icon: Icon, label, value, unit = "", children, iconColor = "text-brand" }: WeatherStatCardProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
      <Icon size={12} className={`${iconColor} shrink-0`} />
      <div>
        <div className="text-[9px] tracking-widest uppercase text-text-faint">{label}</div>
        <div className="font-mono text-[13px] text-text">
          {value}
          {unit}
        </div>
        {children}
      </div>
    </div>
  );
}
