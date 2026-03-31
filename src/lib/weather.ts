import { externalApi } from "@/lib/axios";

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
  weatherLabel: string;
  weatherEmoji: string;
  isDay: boolean;
  uvIndex: number;
  visibility: number;
}

const WMO_CODES: Record<number, { label: string; emoji: string }> = {
  0: { label: "Clear sky", emoji: "☀️" },
  1: { label: "Mainly clear", emoji: "🌤️" },
  2: { label: "Partly cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  45: { label: "Foggy", emoji: "🌫️" },
  48: { label: "Icy fog", emoji: "🌫️" },
  51: { label: "Light drizzle", emoji: "🌦️" },
  53: { label: "Drizzle", emoji: "🌦️" },
  55: { label: "Heavy drizzle", emoji: "🌧️" },
  61: { label: "Light rain", emoji: "🌧️" },
  63: { label: "Rain", emoji: "🌧️" },
  65: { label: "Heavy rain", emoji: "🌧️" },
  71: { label: "Light snow", emoji: "🌨️" },
  73: { label: "Snow", emoji: "❄️" },
  75: { label: "Heavy snow", emoji: "❄️" },
  77: { label: "Snow grains", emoji: "🌨️" },
  80: { label: "Light showers", emoji: "🌦️" },
  81: { label: "Showers", emoji: "🌧️" },
  82: { label: "Heavy showers", emoji: "⛈️" },
  85: { label: "Snow showers", emoji: "🌨️" },
  86: { label: "Heavy snow showers", emoji: "❄️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
  96: { label: "Thunderstorm + hail", emoji: "⛈️" },
  99: { label: "Thunderstorm + hail", emoji: "⛈️" },
};

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData> {
  const { data } = await externalApi.get("https://api.open-meteo.com/v1/forecast", {
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
