import { useEffect, useRef } from "react";
import { X, Copy, Check, Wind, Droplets, Eye, Thermometer, Sun } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useClock } from "@/hooks/use-clock";
import { useState } from "react";
import type { ClockEntry } from "@/stores/clock-store";

interface ClockModalProps {
  entry: ClockEntry;
  onClose: () => void;
}

function CopyField({ label, value }: { label: string; value: string }) {
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

function WindDirection({ degrees }: { degrees: number }) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const label = dirs[Math.round(degrees / 45) % 8];
  return (
    <span>
      {label} {degrees}°
    </span>
  );
}

export function ClockModal({ entry, onClose }: ClockModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { position } = useGeolocation();

  // Use geolocation for local card, otherwise use stored coords
  const lat = entry.id === "local" ? position?.lat : entry.lat;
  const lng = entry.id === "local" ? position?.lng : entry.lng;

  const { data: weather, isLoading: weatherLoading } = useWeather(lat, lng);
  const { hours, minutes, seconds, ampm, gmtLabel, diffLabel, isDaytime } = useClock(entry);

  // Current epoch
  // eslint-disable-next-line react-hooks/purity
  const epoch = Math.floor(Date.now() / 1000);

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
  const dateString = new Date().toLocaleDateString("en-US", {
    timeZone: entry.timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div ref={overlayRef} onClick={handleOverlayClick} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-bg-card border border-stroke rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-stroke">
          <div>
            <div className="text-label tracking-[0.3em] uppercase text-brand mb-1">
              {gmtLabel} · {isDaytime ? "☀️ Daytime" : "🌙 Nighttime"}
            </div>
            <h2 className="font-bebas text-[32px] leading-none text-text tracking-[0.05em] uppercase">{entry.city}</h2>
            <div className="text-[11px] text-text-faint tracking-wider mt-1">
              {entry.country} · {entry.timezone}
            </div>
          </div>
          <button onClick={onClose} className="text-text-faint hover:text-brand transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
          {/* Time */}
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-text-faint mb-3">Current Time</div>
            <div className="grid grid-cols-1 gap-2">
              <CopyField label="Local time" value={timeString} />
              <CopyField label="Date" value={dateString} />
              <CopyField label="Diff from your time" value={diffLabel} />
            </div>
          </div>

          {/* Epoch */}
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-text-faint mb-3">Unix / Epoch</div>
            <div className="grid grid-cols-1 gap-2">
              <CopyField label="Epoch (seconds)" value={String(epoch)} />
              <CopyField label="Epoch (milliseconds)" value={String(epoch * 1000)} />
              <CopyField label="ISO 8601" value={new Date().toISOString()} />
            </div>
          </div>

          {/* Weather */}
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-text-faint mb-3">Weather</div>

            {!lat || !lng ? (
              <div className="text-[11px] text-text-faint tracking-wider border border-stroke px-3 py-3 rounded-sm">{entry.id === "local" ? "Allow location access to see local weather" : "No coordinates available"}</div>
            ) : weatherLoading ? (
              <div className="text-[11px] text-text-faint tracking-wider animate-pulse">Fetching weather...</div>
            ) : weather ? (
              <div className="grid grid-cols-2 gap-2">
                {/* Condition */}
                <div className="col-span-2 flex items-center gap-3 px-3 py-3 border border-stroke rounded-sm">
                  <span className="text-3xl">{weather.weatherEmoji}</span>
                  <div>
                    <div className="text-[13px] text-text tracking-wide">{weather.weatherLabel}</div>
                    <div className="text-[10px] text-text-faint tracking-wider">{weather.isDay ? "Daytime" : "Nighttime"} conditions</div>
                  </div>
                </div>

                {/* Temp */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                  <Thermometer size={12} className="text-brand shrink-0" />
                  <div>
                    <div className="text-[9px] tracking-widest uppercase text-text-faint">Temp</div>
                    <div className="font-mono text-[13px] text-text">{weather.temp}°C</div>
                  </div>
                </div>

                {/* Feels like */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                  <Thermometer size={12} className="text-text-faint shrink-0" />
                  <div>
                    <div className="text-[9px] tracking-widest uppercase text-text-faint">Feels like</div>
                    <div className="font-mono text-[13px] text-text">{weather.feelsLike}°C</div>
                  </div>
                </div>

                {/* Humidity */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                  <Droplets size={12} className="text-brand shrink-0" />
                  <div>
                    <div className="text-[9px] tracking-widest uppercase text-text-faint">Humidity</div>
                    <div className="font-mono text-[13px] text-text">{weather.humidity}%</div>
                  </div>
                </div>

                {/* Wind */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                  <Wind size={12} className="text-brand shrink-0" />
                  <div>
                    <div className="text-[9px] tracking-widest uppercase text-text-faint">Wind</div>
                    <div className="font-mono text-[13px] text-text">{weather.windSpeed} km/h</div>
                    <div className="text-[9px] text-text-faint">
                      <WindDirection degrees={weather.windDirection} />
                    </div>
                  </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                  <Eye size={12} className="text-brand shrink-0" />
                  <div>
                    <div className="text-[9px] tracking-widest uppercase text-text-faint">Visibility</div>
                    <div className="font-mono text-[13px] text-text">{weather.visibility} km</div>
                  </div>
                </div>

                {/* UV Index */}
                <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                  <Sun size={12} className="text-brand shrink-0" />
                  <div>
                    <div className="text-[9px] tracking-widest uppercase text-text-faint">UV Index</div>
                    <div className="font-mono text-[13px] text-text">{weather.uvIndex}</div>
                  </div>
                </div>

                {/* Precipitation */}
                {weather.precipitation > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2.5 border border-stroke rounded-sm">
                    <Droplets size={12} className="text-text-faint shrink-0" />
                    <div>
                      <div className="text-[9px] tracking-widest uppercase text-text-faint">Precipitation</div>
                      <div className="font-mono text-[13px] text-text">{weather.precipitation} mm</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[11px] text-text-faint tracking-wider border border-stroke px-3 py-3 rounded-sm">Weather unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
