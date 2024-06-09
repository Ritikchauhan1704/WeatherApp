//format the today's Forecast
export const getTodayForecastWeather = (
  response,
  current_date,
  current_datetime
) => {
  const all_today_forecasts: any = [];

  if (!response || Object.keys(response).length === 0 || response.cod === '404')
    return [];
  else
    response?.list.slice().map((item) => {
      if (item.dt_txt.startsWith(current_date.substring(0, 10))) {
        if (item.dt > current_datetime) {
          all_today_forecasts.push({
            time: item.dt_txt.split(' ')[1].substring(0, 5),
            icon: item.weather[0].icon,
            temperature: Math.round(item.main.temp) + ' °C',
          });
        }
      }
      return all_today_forecasts;
    });

  if (all_today_forecasts.length < 7) {
    return [...all_today_forecasts];
  } else {
    return all_today_forecasts.slice(-6);
  }
};

export function transformDateFormat() {
  const date = new Date();
  const month = date.toLocaleString('en-US', {month: '2-digit'});
  const day = date.toLocaleString('en-US', {day: '2-digit'});
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const newFormatDate = year.toString().concat('-', month, '-', day, ' ', time);
  return newFormatDate;
}

export function getMostFrequentWeather(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

const ALL_DESCRIPTIONS = [
  {icon: '01d.png', description: 'clear sky'},
  {icon: '02d.png', description: 'few clouds'},
  {icon: '03d.png', description: 'scattered clouds'},
  {icon: '04d.png', description: 'broken clouds'},
  {icon: '04d.png', description: 'overcast clouds'},
  {icon: '09d.png', description: 'shower rain'},
  {icon: '09d.png', description: 'light intensity drizzle'},
  {icon: '09d.png', description: 'drizzle'},
  {icon: '09d.png', description: 'heavy intensity drizzle'},
  {icon: '09d.png', description: 'light intensity drizzle rain'},
  {icon: '09d.png', description: 'drizzle rain'},
  {icon: '09d.png', description: 'heavy intensity drizzle rain'},
  {icon: '09d.png', description: 'shower rain and drizzle'},
  {icon: '09d.png', description: 'heavy shower rain and drizzle'},
  {icon: '09d.png', description: 'shower drizzle'},
  {icon: '09d.png', description: 'light intensity shower rain'},
  {icon: '09d.png', description: 'shower rain'},
  {icon: '09d.png', description: 'heavy intensity shower rain'},
  {icon: '09d.png', description: 'ragged shower rain'},
  {icon: '10d.png', description: 'rain'},
  {icon: '10d.png', description: 'light rain'},
  {icon: '10d.png', description: 'moderate rain'},
  {icon: '10d.png', description: 'heavy intensity rain'},
  {icon: '10d.png', description: 'very heavy rain'},
  {icon: '10d.png', description: 'extreme rain'},
  {icon: '11d.png', description: 'thunderstorm'},
  {icon: '11d.png', description: 'thunderstorm with light rain'},
  {icon: '11d.png', description: 'thunderstorm with rain'},
  {icon: '11d.png', description: 'thunderstorm with heavy rain'},
  {icon: '11d.png', description: 'light thunderstorm'},
  {icon: '11d.png', description: 'heavy thunderstorm'},
  {icon: '11d.png', description: 'ragged thunderstorm'},
  {icon: '11d.png', description: 'thunderstorm with light drizzle'},
  {icon: '11d.png', description: 'thunderstorm with drizzle'},
  {icon: '11d.png', description: 'thunderstorm with heavy drizzle'},
  {icon: '13d.png', description: 'snow'},
  {icon: '13d.png', description: 'freezing rain'},
  {icon: '13d.png', description: 'light snow'},
  {icon: '13d.png', description: 'Snow'},
  {icon: '13d.png', description: 'Heavy snow'},
  {icon: '13d.png', description: 'Sleet'},
  {icon: '13d.png', description: 'Light shower sleet'},
  {icon: '13d.png', description: 'Light rain and snow'},
  {icon: '13d.png', description: 'Rain and snow'},
  {icon: '13d.png', description: 'Light shower snow'},
  {icon: '13d.png', description: 'Shower snow'},
  {icon: '13d.png', description: 'Heavy shower snow'},
  {icon: '50d.png', description: 'mist'},
  {icon: '50d.png', description: 'Smoke'},
  {icon: '50d.png', description: 'Haze'},
  {icon: '50d.png', description: 'sand/ dust whirls'},
  {icon: '50d.png', description: 'fog'},
  {icon: '50d.png', description: 'sand'},
  {icon: '50d.png', description: 'dust'},
  {icon: '50d.png', description: 'volcanic ash'},
  {icon: '50d.png', description: 'squalls'},
  {icon: '50d.png', description: 'tornado'},
];

const descriptionToIconName = (desc) => {
  const iconName = ALL_DESCRIPTIONS.find((item) => item.description === desc);
  return iconName?.icon || 'unknown';
};

function getAverage(array, isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);

  return average;
}

function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      const {date, ...rest} = obj;
      acc[property] = acc[property] || [];
      acc[property].push(rest);
      return acc;
    }, {});
  };
}
//format the Weekly Forecast
export const getWeekForecastWeather = (response) => {
  const foreacast_data: any = [];
  const descriptions_data: any = [];

  if (!response || Object.keys(response).length === 0 || response.cod === '404')
    return [];
  else
    response?.list.slice().map((item, idx) => {
      descriptions_data.push({
        description: item.weather[0].description,
        date: item.dt_txt.substring(0, 10),
      });
      foreacast_data.push({
        date: item.dt_txt.substring(0, 10),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        clouds: item.clouds.all,
      });

      return {idx, item};
    });

  const groupByDate = groupBy('date');
  const grouped_forecast_data = groupByDate(foreacast_data);
  const grouped_forecast_descriptions = groupByDate(descriptions_data);

  const description_keys = Object.keys(grouped_forecast_descriptions);

  const dayDescList = [];

  description_keys.forEach((key) => {
    const singleDayDescriptions = grouped_forecast_descriptions[key].map(
      (item) => item.description
    );
    const mostFrequentDescription = getMostFrequentWeather(
      singleDayDescriptions
    );
    dayDescList.push(mostFrequentDescription);
  });

  const forecast_keys = Object.keys(grouped_forecast_data);
  const dayAvgsList: any = [];

  forecast_keys.forEach((key, idx) => {
    const dayTempsList = [];
    const dayHumidityList = [];
    const dayWindList = [];
    const dayCloudsList = [];

    for (let i = 0; i < grouped_forecast_data[key].length; i++) {
      dayTempsList.push(grouped_forecast_data[key][i].temp);
      dayHumidityList.push(grouped_forecast_data[key][i].humidity);
      dayWindList.push(grouped_forecast_data[key][i].wind);
      dayCloudsList.push(grouped_forecast_data[key][i].clouds);
    }

    dayAvgsList.push({
      date: key,
      temp: getAverage(dayTempsList),
      humidity: getAverage(dayHumidityList),
      wind: getAverage(dayWindList, false),
      clouds: getAverage(dayCloudsList),
      description: dayDescList[idx],
      icon: descriptionToIconName(dayDescList[idx]),
    });
  });

  return dayAvgsList;
};

//Get the direction using the degree provided by the api
export function getDirection(angle: number) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
}

//get array of weekDays based on today's day
export function getWeekDays() {
  const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dayInAWeek = new Date().getDay();
  const days = DAYS.slice(dayInAWeek, DAYS.length).concat(
    DAYS.slice(0, dayInAWeek)
  );
  return days;
}

//get today's day
export const getCurrentDay: any = () => {
  const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date();
  const day = date.getDay();
  return DAYS[day];
};
