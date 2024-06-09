import {useState} from 'react';
import {WeatherContext} from './WeatherContext';

const WeatherContextProvider = ({children}: {children: React.ReactNode}) => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [coor, setCoor] = useState<any>();
  return (
    <WeatherContext.Provider
      value={{weather, setWeather, forecast, setForecast, coor, setCoor}}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
