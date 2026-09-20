import { useState, useCallback } from "react";

// this URL can be used if we want to show the users position in a map:
// const MAP_URL = "https://www.openstreetmap.org/#map=18/";

/** `status` holds a message while locating or after a failure, and is empty otherwise. */
interface GeolocationState {
  status: string;
  latitude: number | null;
  longitude: number | null;
}

/**
 * Finds the user's position with the browser Geolocation API.
 *
 * @returns `status`, `latitude`, `longitude` (both `null` until found), and `getLocation()` to start the lookup.
 */
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
