import { externalApi } from "@/lib/axios";
import { WMO_CODES } from "@/data/clock/weather";
import type { WeatherData } from "@/types/weather";

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData> {
  const WEATHER_API: string = "https://api.open-meteo.com/v1/forecast";
  const { data } = await externalApi.get(WEATHER_API, {
    params: {
      latitude: lat,
      longitude: lng,
      current: ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "wind_speed_10m", "wind_direction_10m", "precipitation", "weather_code", "is_day", "uv_index", "visibility"].join(","),
      wind_speed_unit: "kmh",
      timezone: "auto",
    },
  });

  const c = data.current;
  const code = c.weather_code as number;
  const wmo = WMO_CODES[code] ?? { label: "Unknown", emoji: "🌡️" };

  return {
    temp: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    humidity: c.relative_humidity_2m,
    windSpeed: Math.round(c.wind_speed_10m),
    windDirection: c.wind_direction_10m,
    precipitation: c.precipitation,
    weatherCode: code,
    weatherLabel: wmo.label,
    weatherEmoji: wmo.emoji,
    isDay: c.is_day === 1,
    uvIndex: c.uv_index ?? 0,
    visibility: Math.round((c.visibility ?? 0) / 1000),
  };
}
