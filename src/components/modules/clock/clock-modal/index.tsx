import { useEffect, useRef } from "react";
import { X, Wind, Droplets, Eye, Thermometer, Sun } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useClock } from "@/hooks/use-clock";
import { CopyField } from "./copy-field";
import { WindDirection } from "./wind-direction";
import { WeatherStatCard } from "./weather-stat-card";
import type { ClockEntry } from "@/stores/clock-store";

interface ClockModalProps {
  entry: ClockEntry;
  onClose: () => void;
}

export function ClockModal({ entry, onClose }: ClockModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { position } = useGeolocation();

  const lat = entry.id === "local" ? position?.lat : entry.lat;
  const lng = entry.id === "local" ? position?.lng : entry.lng;

  const { data: weather, isLoading: weatherLoading } = useWeather(lat, lng);
  const { hours, minutes, seconds, ampm, gmtLabel, diffLabel, isDaytime } = useClock(entry);

  // eslint-disable-next-line react-hooks/purity
  const epoch = Math.floor(Date.now() / 1000);

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
    <div ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose()} className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
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
          {/* Section: Time */}
          <section>
            <div className="text-[9px] tracking-[0.3em] uppercase text-text-faint mb-3">Current Time</div>
            <div className="grid grid-cols-1 gap-2">
              <CopyField label="Local time" value={timeString} />
              <CopyField label="Date" value={dateString} />
              <CopyField label="Diff from your time" value={diffLabel} />
            </div>
          </section>

          {/* Section: Epoch */}
          <section>
            <div className="text-[9px] tracking-[0.3em] uppercase text-text-faint mb-3">Unix / Epoch</div>
            <div className="grid grid-cols-1 gap-2">
              <CopyField label="Epoch (seconds)" value={String(epoch)} />
              <CopyField label="Epoch (milliseconds)" value={String(epoch * 1000)} />
              <CopyField label="ISO 8601" value={new Date().toISOString()} />
            </div>
          </section>

          {/* Section: Weather */}
          <section>
            <div className="text-[9px] tracking-[0.3em] uppercase text-text-faint mb-3">Weather</div>
            {!lat || !lng ? (
              <div className="text-[11px] text-text-faint tracking-wider border border-stroke px-3 py-3 rounded-sm">{entry.id === "local" ? "Allow location access to see local weather" : "No coordinates available"}</div>
            ) : weatherLoading ? (
              <div className="text-[11px] text-text-faint tracking-wider animate-pulse">Fetching weather...</div>
            ) : weather ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 flex items-center gap-3 px-3 py-3 border border-stroke rounded-sm">
                  <span className="text-3xl">{weather.weatherEmoji}</span>
                  <div>
                    <div className="text-[13px] text-text tracking-wide">{weather.weatherLabel}</div>
                    <div className="text-[10px] text-text-faint tracking-wider">{weather.isDay ? "Daytime" : "Nighttime"} conditions</div>
                  </div>
                </div>

                <WeatherStatCard icon={Thermometer} label="Temp" value={weather.temp} unit="°C" />
                <WeatherStatCard icon={Thermometer} label="Feels like" value={weather.feelsLike} unit="°C" iconColor="text-text-faint" />
                <WeatherStatCard icon={Droplets} label="Humidity" value={weather.humidity} unit="%" />
                <WeatherStatCard icon={Wind} label="Wind" value={weather.windSpeed} unit=" km/h">
                  <div className="text-[9px] text-text-faint">
                    <WindDirection degrees={weather.windDirection} />
                  </div>
                </WeatherStatCard>
                <WeatherStatCard icon={Eye} label="Visibility" value={weather.visibility} unit=" km" />
                <WeatherStatCard icon={Sun} label="UV Index" value={weather.uvIndex} />

                {weather.precipitation > 0 && <WeatherStatCard icon={Droplets} label="Precipitation" value={weather.precipitation} unit=" mm" iconColor="text-text-faint" />}
              </div>
            ) : (
              <div className="text-[11px] text-text-faint tracking-wider border border-stroke px-3 py-3 rounded-sm">Weather unavailable</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
