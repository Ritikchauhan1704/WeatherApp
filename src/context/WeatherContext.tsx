import {createContext, useContext} from 'react';

export const WeatherContext = createContext<any>(null);

export default function useWeather() {
  return useContext(WeatherContext);
}
