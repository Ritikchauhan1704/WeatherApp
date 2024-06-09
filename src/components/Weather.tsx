import useWeather from '../context/WeatherContext';
import {getDirection} from '../utils/utils';
import Card from './Card';
const Weather = () => {
  //get the current weather data
  const {weather} = useWeather();
  
  return (
    <div className="h-1/2 md:h-full md:w-[70%] lg:w-[40%] flex md:flex-col">
      <div className="flex flex-col w-1/2 md:w-full gap-2 items-center md:gap-4">
        <h1 className="uppercase">Current Weather</h1>
        <h1 className="text-5xl font-semibold">{weather.name}</h1>
        <div className="capitalize">{weather.weather[0].description}</div>
        <img
          src={`../../public/icons/${weather.weather[0].icon}.svg`}
          className="w-32 md:w-44"
        />
        <div className="font-bold text-2xl">
          {Math.ceil(weather.main.temp)} °C
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center md:w-full">
        <h1 className="font-semibold md:underline">AIR CONDITIONS</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full h-full p-2 ">
          <Card
            title="Humidty"
            icon="humidity.png"
            content={`${weather.main.humidity}%`}
          />
          <Card
            title="Wind direction"
            icon="compass.png"
            content={`${getDirection(weather.wind.deg)}`}
          />
          <Card
            title="Wind Speed"
            icon="wind.png"
            content={`${weather.wind.speed}\nm/s`}
          />
          <Card
            title="Visibility"
            icon="binocular.png"
            content={`${weather.visibility / 1000}\nKM`}
          />
        </div>
      </div>
    </div>
  );
};

export default Weather;
