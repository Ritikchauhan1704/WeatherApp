import {useEffect} from 'react';
import useWeather from './context/WeatherContext';
import {getWeatherData} from './api/weatherApi';
import {Forecast, ModeBtn, Search, Weather} from './components';

function App() {
  const {weather, setWeather, forecast, setForecast, coor, setCoor} =
    useWeather();

  //Get Current Location and set its coordinates
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

  //Fetch the data of current coordinates
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

  //toggle between dark mode and light mode
  const handleClick = () => {
    document.querySelector('.top-root')?.classList.toggle('dark');
  };

  //If data if not empty show the current data otherwise show loader with search option
  if (weather && forecast) {
    return (
      <div className="top-root">
        <main className="h-screen p-4 md:p-8 bg-custom-gradient relative dark:bg-custom-dark-gradient">
          <button
            className="absolute top-6 left-6 md:top-10 md:left-8"
            onClick={handleClick}
          >
            <ModeBtn />
          </button>
          <div className="scrollbar flex flex-col md:flex-row gap-2 bg-white h-full rounded-xl p-3 overflow-y-scroll dark:bg-custom-dark-gradient-2 dark:text-white dark:shadow-2xl ">
            <Weather />
            <Forecast />
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <>
        <h1>Current Location Loading..</h1>
        <Search />
      </>
    );
  }
}

export default App;
