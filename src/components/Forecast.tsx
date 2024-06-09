import {useEffect, useState} from 'react';
import {
  getCurrentDay,
  getTodayForecastWeather,
  getWeekDays,
  getWeekForecastWeather,
  transformDateFormat,
} from '../utils/utils';
import useWeather from '../context/WeatherContext';
import Search from './Search';

const Forecast = () => {
  const [todayForecast, setTodayForecast] = useState<any>();
  const [weekForecast, setWeekForecast] = useState<any>();
  const {forecast} = useWeather();

  const forecastDays = getWeekDays();

  //formatting the forecast for today's forecast and weekly forecast
  useEffect(() => {
    const currentDate = transformDateFormat();
    const date = new Date();
    const dt_now = Math.floor(date.getTime() / 1000);
    const all_today_forecasts_list = getTodayForecastWeather(
      forecast,
      currentDate,
      dt_now
    );
    const all_week_forecasts_list = getWeekForecastWeather(forecast);
    setTodayForecast(all_today_forecasts_list);
    setWeekForecast(all_week_forecasts_list);
  }, [forecast]);

  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <div className="h-full bg-[#F7F7F7] md:w-[60%] p-2 rounded-lg dark:bg-custom-dark-gradient">
      {/* Search Bar */}
      <div className="w-full h-[10%] flex ">
        <div className="w-[70%] md:w-full">
          <Search />
        </div>
        <div className="">
          {getCurrentDay()}, {ctime}
        </div>
      </div>

      {/* Forecast */}
      <div className="flex h-[90%] items-center md:flex-col md:w-full ">
        {/* Today's Forecast */}
        <div className="w-1/2 h-full p-4 flex flex-col md:h-1/2 md:w-full items-center ">
          <h1 className="uppercase mb-5 font-semibold">Todays forecast</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3">
            {todayForecast &&
              todayForecast.map((item: any) => (
                <div
                  key={item.time}
                  className="flex gap-4  md:flex-col md:gap-1 justify-center md:items-center p-1 rounded-lg md:shadow-md"
                >
                  <div className="">{item.temperature}</div>
                  <img src={`/icons/${item.icon}.svg`} className="w-6" alt="" />
                  <div className="">{item.time}</div>
                </div>
              ))}
          </div>
        </div>
        {/* Weekly Forecast */}
        <div className="w-1/2 h-full p-4 flex flex-col md:h-1/2 md:w-full items-center ">
          <h1 className="mb-5 font-semibold uppercase">Weekly Forecast</h1>
          <div className="flex flex-col items-start w-full md:grid md:grid-cols-3">
            {weekForecast &&
              weekForecast.map((item: any, i: any) => (
                <div
                  className="flex w-full gap-4 md:flex-col md:gap-1  md:items-center p-1 rounded-lg md:shadow-md  items-center justify-start"
                  key={item.date}
                >
                  <div className="">{item.temp}°C</div>
                  <div className="flex gap-2">
                    <img
                      src={`/icons/${item.icon.split('.')[0]}.svg`}
                      className="w-6"
                      alt=""
                    />
                    <div className="capitalize">{item.description}</div>
                  </div>
                  <div className="">{forecastDays[i]}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
