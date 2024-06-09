import axios from 'axios';

const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${
  import.meta.env.VITE_API_KEY
}&units=metric`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${
  import.meta.env.VITE_API_KEY
}&units=metric`;
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

const getWeatherData = async (lat: string, lon: string) => {
  try {
    const [weather, forecast] = await Promise.all([
      axios.get(WEATHER_API_URL + `&lat=${lat}&lon=${lon}`),
      axios.get(FORECAST_API_URL + `&lat=${lat}&lon=${lon}`),
    ]);
    const weatherData = weather.data;
    const forecastData = forecast.data;
    return [weatherData, forecastData];
  } catch (error) {
    console.log(error);
  }
};

const fetchCities = async (input: string) => {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export {getWeatherData, fetchCities};
