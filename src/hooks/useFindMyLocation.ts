import { useState, useCallback } from "react";

// const MAP_URL = "https://www.openstreetmap.org/#map=18/";

interface GeolocationState {
  status: string;
  latitude: number | null;
  longitude: number | null;
}

export const useFindMyLocation = () => {
  const [state, setState] = useState<GeolocationState>({
    status: "",
    latitude: null,
    longitude: null,
  });

  const getLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState((s) => ({
        ...s,
        status: "Geolocation is not supported by your browser",
      }));
      return;
    }

    setState((s) => ({
      ...s,
      status: "Locating...",
      latitude: null,
      longitude: null,
    }));

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setState({ status: "", latitude, longitude });
      },
      () => {
        setState((s) => ({ ...s, status: "Unable to get your location." }));
      },
    );
  }, []);

  return { ...state, getLocation };
};
