import useWeather from '../context/WeatherContext';
import {fetchCities} from '../api/weatherApi';
import {AsyncPaginate} from 'react-select-async-paginate';

const Search = () => {
  const {setCoor} = useWeather();

  // loading option based on typing value
  const loadOptions = async (inputValue: string) => {
    //featching all the cities based on the type
    //debouncing the input field
    const citiesList = await fetchCities(inputValue);
    return {
      options: citiesList.data.map((city: any) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };
  // cusstom style for search
  const customStyles = {
    control: (provided:any, state:any) => ({
      ...provided,
      width: '50%',
      borderRadius: '1rem',
      border: state.isFocused ? null : '2px solid #ccc',
      boxShadow: state.isFocused ? '0 0 0 2px #ccc' : null,
    }),
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3699FF' : null,
      color: state.isFocused ? 'white' : null,
    }),
  };
  // Get and change the coordinates of the city
  const onChangeHandler = async (enteredData: any) => {
    const [latitude, longitude] = enteredData.value.split(' ');
    setCoor({latitude, longitude});
  };
  return (
    // Using AsyncPaginate For debouncing
    <AsyncPaginate
      placeholder="Search Cities"
      debounceTimeout={600}
      onChange={onChangeHandler}
      styles={customStyles}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
