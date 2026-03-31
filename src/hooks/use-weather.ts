import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/services/weather.service";
import type { WeatherData } from "@/types/weather";

export function useWeather(lat?: number, lng?: number) {
  return useQuery<WeatherData>({
    queryKey: ["weather", lat, lng],
    queryFn: () => fetchWeather(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 1000 * 60 * 60, // 1hr — won't refetch until stale
    gcTime: 1000 * 60 * 60 * 2, // keep in cache for 2hrs
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
