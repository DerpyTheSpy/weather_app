import React, { useState, useEffect } from 'eact';
import WeatherInput from './components/WeatherInput.js';
import WeatherDisplay from './components/WeatherDisplay.js';
import RainAnimation from './components/RainAnimation.js';
import SnowAnimation from './components/SnowAnimation.js';
import ThunderstormAnimation from './components/ThunderstormAnimation.js';
import UserPreferences from './components/UserPreferences.js';
import './App.css'

/**
 * getBackgroundImage function that returns the background image URL based on the weather icon.
 *
 * @param {string} icon - The weather icon.
 * @returns {string} The background image URL.
 */
const getBackgroundImage = (icon) => {
  switch (icon) {
    case '01d':
      return require('./components/Images/01d.jpg');
    case '01n':
      return require('./components/Images/01n.jpg');
    case '02d':
      return require('./components/Images/02d.jpg');
    case '02n':
      return require('./components/Images/02n.jpg');
    case '03d':
    case '03n':
      return require('./components/Images/03d.jpg');
    case '04d':
    case '04n':
      return require('./components/Images/04d.jpg');
    case '09d':
    case '09n':
      return require('./components/Images/09d.jpg');
    case '10d':
    case '10n':
      return require('./components/Images/10d.jpg');
    case '11d':
    case '11n':
      return require('./components/Images/11d.jpg');
    case '13d':
    case '13n':
      return require('./components/Images/13d.jpg');
    case '50d':
    case '50n':
      return require('./components/Images/50d.jpg');
    default:
      return require('./components/Images/default.jpg');
  }
};

/**
 * App component that handles the weather search and display.
 *
 * @param {string} selectedCity - The selected city.
 */
const App = ({ selectedCity }) => {
  // State variables to store the weather data, loading state, error message, animation state, input value, and user preferences
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [preferences, setPreferences] = useState({ units: 'etric' });

  /**
   * handleUnitChange function that updates the user preferences when the unit changes.
   *
   * @param {string} unit - The new unit.
   */
  const handleUnitChange = (unit) => {
    setPreferences({ units: unit });
  };

  // useEffect hook to set the default background image and styles
  useEffect(() => {
    document.body.style.transition = 'background-image 0.5s ease';
    document.body.style.backgroundImage = `url(${require('./components/Images/default.jpg')})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'top center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  // useEffect hook to handle the selected city
  useEffect(() => {
    if (selectedCity) {
      handleSearch(selectedCity);
    }
  }, [selectedCity]);

  // useEffect hook to update the animation state based on the weather data
  useEffect(() => {
    if (data && data.weather && data.weather.length > 0) {
      const weather = data?.weather[0]?.id;
      switch (true) {
        case weather >= 500 && weather <= 531:
          setAnimation('rain');
          break;
        case weather >= 600 && weather <= 622:
          setAnimation('snow');
          break;
        case weather >= 200 && weather <= 232:
          setAnimation('thunderstorm');
          break;
        default:
          setAnimation(null);
      }
      console.log('Animation state:', animation);
    }
  }, [data, animation]);

  /**
   * handleSearch function that handles the weather search.
   *
   * @param {string} location - The location to search for.
   * @param {string} units - The units to use.
   */
  const handleSearch = async (location, units) => {
    setLoading(true);
    setAnimation(null); // reset animation state to null
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=85066c6de56d3de5fcc05b6934af3e9e`
      );

if (!response.ok) {
        if (response.status === 404) {
          setError('Error: City not found.');
        } else {
          setError('Error: An unexpected error occurred.');
        }
        window.alert(error); // display an alert box with the error message
        setInputValue('');
        setTimeout(() => {
          setLoading(false); // set loading to false after half a second
        }, 500);
        return;
      }

      const data = await response.json();
      console.log('Data state:', data);
      if (data && data.weather && data.weather.length > 0) {
        setData(data);
        document.body.style.backgroundImage = `url(${getBackgroundImage(data?.weather[0]?.icon)})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'top center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.height = '100vh';
document.body.style.margin = '0';
        document.body.style.padding = '0';
     } else {
        setError('Error: Unknown input.');
        window.alert(error); // display an alert box with the error message
        setInputValue('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error: An unexpected error occurred.');
      window.alert(error); // display an alert box with the error message
      setInputValue('');
    } finally {
      setTimeout(() => {
        setLoading(false); // set loading to false after half a second
      }, 500);
    }
  };

  /**
   * handleLocationUpdate function that updates the location when the user updates their location.
   *
   * @param {string} location - The new location.
   */
  const handleLocationUpdate = (location) => {
    handleSearch(location, preferences.units);
  };

  /**
   * getConvertedTemperature function that returns the converted temperature based on the user preferences.
   *
   * @returns {number|null} The converted temperature.
   */
  const getConvertedTemperature = () => {
    if (data && data.main) {
      switch (preferences.units) {
        case 'metric':
          return Math.round(data.main.temp - 273.15);
        case 'imperial':
          return Math.round(
            (data.main.temp - 273.15) * 1.8 + 32
          );
        default:
          return Math.round(data.main.temp - 273.15);
      }
    }
    return null;
  };

  // Render the App component
  return (
    <div className="App" style={{ backgroundSize: 'cover' }}>
      <WeatherInput
        onSearch={handleSearch}
        error={error}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {loading && (
        <div className="loading-container">
          <p className="loading-text">Loading...</p>
        </div>
      )}
      {data && !loading && (
        <div className="weather-display-wrapper" style={{ position: 'relative' }}>
          <div className="animation-container">
            {animation === 'rain' && <RainAnimation />}
            {animation === 'snow' && <SnowAnimation animation={animation} />}
            {animation === 'thunderstorm' && <ThunderstormAnimation />}
          </div>
          <WeatherDisplay data={data} temperature={getConvertedTemperature()} units={preferences.units} onUnitChange={handleUnitChange} />
        </div>
      )}
      <UserPreferences onLocationUpdate={handleLocationUpdate} />
    </div>
  );
}

export default App;