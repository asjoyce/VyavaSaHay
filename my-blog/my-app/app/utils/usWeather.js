import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = '579d3a91e0076eec542dce67e3449e83'; // Replace with your weather API key
      const response = await fetch(
        `https://api.weatherstack.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
      );
      const data = await response.json();
      setWeather({
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        rainfall: data.current.precip_mm,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchWeather(latitude, longitude);
    })();
  }, []);

  return { weather, loading };
};

export default useWeather;
