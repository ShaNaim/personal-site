import { useEffect, useState } from "react";

interface GeoPosition {
  lat: number;
  lng: number;
}

interface GeoState {
  position: GeoPosition | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeoState {
  const [state, setState] = useState<GeoState>({
    position: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ position: null, error: "Geolocation not supported", loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState({ position: null, error: err.message, loading: false });
      },
      { timeout: 10000, maximumAge: 3600000 }, // cache position for 1hr
    );
  }, []);

  return state;
}
