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
