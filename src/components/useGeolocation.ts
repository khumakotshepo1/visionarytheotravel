
import { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationInfo {
  locationInfo: Coordinates | null;
  locationError: string | null;
  loading: boolean;
}

export const useGeolocation = (): LocationInfo => {
  const [locationInfo, setLocationInfo] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    const successFn = (res: GeolocationPosition) => {
      setLocationInfo(res.coords);
      setLoading(false);
    };

    const errorFn = (error: GeolocationPositionError) => {
      setLocationError(error.message);
      setLoading(false);
    };

    geolocation.getCurrentPosition(successFn, errorFn);

    // Cleanup function
    return () => {
      setLocationInfo(null);
      setLocationError(null);
      setLoading(true);
    };
  }, []);

  return { locationInfo, locationError, loading };
};
