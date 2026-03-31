export interface City {
  city: string;
  country: string;
  timezone: string;
  lat: number;
  lng: number;
}

export const CITIES: City[] = [
  { city: "Dhaka", country: "Bangladesh", timezone: "Asia/Dhaka", lat: 23.8103, lng: 90.4125 },
  { city: "London", country: "UK", timezone: "Europe/London", lat: 51.5074, lng: -0.1278 },
  { city: "New York", country: "USA", timezone: "America/New_York", lat: 40.7128, lng: -74.006 },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", lat: 34.0522, lng: -118.2437 },
  { city: "Chicago", country: "USA", timezone: "America/Chicago", lat: 41.8781, lng: -87.6298 },
  { city: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", lat: -23.5505, lng: -46.6333 },
  { city: "Paris", country: "France", timezone: "Europe/Paris", lat: 48.8566, lng: 2.3522 },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin", lat: 52.52, lng: 13.405 },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata", lat: 19.076, lng: 72.8777 },
  { city: "Kolkata", country: "India", timezone: "Asia/Kolkata", lat: 22.5726, lng: 88.3639 },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", lat: 35.6762, lng: 139.6503 },
  { city: "Seoul", country: "South Korea", timezone: "Asia/Seoul", lat: 37.5665, lng: 126.978 },
  { city: "Shanghai", country: "China", timezone: "Asia/Shanghai", lat: 31.2304, lng: 121.4737 },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong", lat: 22.3193, lng: 114.1694 },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", lat: -37.8136, lng: 144.9631 },
  { city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", lat: -36.8485, lng: 174.7633 },
  { city: "Moscow", country: "Russia", timezone: "Europe/Moscow", lat: 55.7558, lng: 37.6173 },
  { city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul", lat: 41.0082, lng: 28.9784 },
  { city: "Cairo", country: "Egypt", timezone: "Africa/Cairo", lat: 30.0444, lng: 31.2357 },
  { city: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi", lat: -1.2921, lng: 36.8219 },
  { city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos", lat: 6.5244, lng: 3.3792 },
  { city: "Karachi", country: "Pakistan", timezone: "Asia/Karachi", lat: 24.8607, lng: 67.0011 },
  { city: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh", lat: 24.7136, lng: 46.6753 },
  { city: "Tehran", country: "Iran", timezone: "Asia/Tehran", lat: 35.6892, lng: 51.389 },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto", lat: 43.6532, lng: -79.3832 },
  { city: "Vancouver", country: "Canada", timezone: "America/Vancouver", lat: 49.2827, lng: -123.1207 },
  { city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", lat: 19.4326, lng: -99.1332 },
];

export const MAX_CLOCKS = 12;
export const SEARCH_MAX_LENNGTH = CITIES.length;
