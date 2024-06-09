import {useEffect} from 'react';
import Forecast from './components/Forecast';
import Temperature from './components/Temperature';
import useWeather from './context/WeatherContext';
import {getWeatherData} from './api/weatherApi';
import Search from './components/Search';

function App() {
  const {weather, setWeather, forecast, setForecast, coor, setCoor} =
    useWeather();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoor({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log('Geolocation is not available in your browser.');
    }
  }, [setCoor]);
  useEffect(() => {
    const fetchData = async () => {
      const [weatherData, forecastData]: any = await getWeatherData(
        coor.latitude,
        coor.longitude
      );
      setWeather(weatherData);
      setForecast(forecastData);
    };
    fetchData();
  }, [setForecast, setWeather, coor]);

  if (weather && forecast) {
    return (
      <main className="h-screen p-4 md:p-8 bg-custom-gradient relative">
        <button className='absolute'>darkmde</button>
        <div className="scrollbar flex flex-col md:flex-row gap-2 bg-white h-full rounded-xl p-3 overflow-y-scroll">
          <Temperature />
          <Forecast />
        </div>
      </main>
    );
  } else {
    return (
      <>
        <h1>Current Location Loading..</h1>
        <Search/>
      </>
    );
  }
}

export default App;
