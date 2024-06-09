import {useState} from 'react';
import useWeather from '../context/WeatherContext';
import {fetchCities, getWeatherData} from '../api/weatherApi';
import {AsyncPaginate} from 'react-select-async-paginate';

const Search = () => {
  const {setCoor} = useWeather();
  // const [place, setPlace] = useState('');

  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '50%',
      borderRadius: '1rem',
      border: state.isFocused ? null : '2px solid #ccc',
      boxShadow: state.isFocused ? '0 0 0 2px #ccc' : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3699FF' : null,
      color: state.isFocused ? 'white' : null,
    }),
  };

  const onChangeHandler = async (enteredData) => {
    console.log(enteredData);
    const [latitude, longitude] = enteredData.value.split(' ');
    const result = await getWeatherData(latitude, longitude);
    console.log(result);

    // setSearchValue(enteredData);
    // setCoor(enteredData);
  };
  return (
      <AsyncPaginate
        placeholder="Search Cities"
        debounceTimeout={600}
        value={searchValue}
        onChange={onChangeHandler}
        styles={customStyles}
        loadOptions={loadOptions}
      />
  );
};

export default Search;
