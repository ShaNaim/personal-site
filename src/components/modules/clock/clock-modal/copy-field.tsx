import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyFieldProps {
  label: string;
  value: string;
}

export function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onClick={copy} className="flex items-center justify-between px-3 py-2.5 border border-stroke hover:border-brand group transition-all duration-200 cursor-pointer rounded-sm">
      <div>
        <div className="text-[9px] tracking-[0.2em] uppercase text-text-faint mb-0.5">{label}</div>
        <div className="font-mono text-[13px] text-text-muted group-hover:text-text transition-colors">{value}</div>
      </div>
      {copied ? <Check size={12} className="text-brand shrink-0" /> : <Copy size={12} className="text-text-faint group-hover:text-brand shrink-0 transition-colors" />}
    </div>
  );
}
