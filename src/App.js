import React, { useState, useEffect } from 'react';
import WeatherInput from './components/WeatherInput.js';
import WeatherDisplay from './components/WeatherDisplay.js';
import RainAnimation from './components/RainAnimation.js';
import SnowAnimation from './components/SnowAnimation.js';
import ThunderstormAnimation from './components/ThunderstormAnimation.js';
import UserPreferences from './components/UserPreferences.js';
import './App.css'

const getBackgroundImage = (icon) => {
  const requireImage = (imageName) => require(`./components/Images/${imageName}.jpg`);
  switch (icon) {
    case '01d':
    case '01n':
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
    case '09d':
    case '10d':
    case '11d':
    case '13d':
    case '50d':
      return requireImage(icon);
    default:
      return requireImage('default');
  }
};

const preloadImages = (images) => {
  const imagePromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = image;
    });
  });

  return Promise.all(imagePromises);
};

const App = ({ selectedCity }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [preferences, setPreferences] = useState({ units: 'etric' });
  const [backgroundImages, setBackgroundImages] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); 
  const [errorDuration] = useState(5000); // Set error message duration to 5 seconds
  const [loadingDuration] = useState(1000); // Set loading duration to 1 second

  useEffect(() => {
    document.body.style.transition = 'background-image 0.5s ease';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'top center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  useEffect(() => {
    const images = [
      '01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n',
      '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n',
      '50d', '50n', 'default'
    ].map(icon => getBackgroundImage(icon));

    preloadImages(images).then(() => {
      setBackgroundImages(images.reduce((acc, image) => {
        acc[image] = true;
        return acc;
      }, {}));
    });
  }, []);
  
  const handleUnitChange = (unit) => {
    setPreferences({ units: unit });
  };

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
    }
  }, [data, animation]);

  const handleSearch = async (location, units) => {
    setLoading(true);
    setAnimation(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`
      );
  
      if (!response.ok) {
        if (response.status === 404) {
          setErrorMessage('Error: City not found.'); // Set error message
        } else {
          setErrorMessage('Error: An unexpected error occurred.'); // Set error message
        }
        setInputValue('');
        setTimeout(() => {
          setErrorMessage(null); // Clear error message after specified duration
        }, errorDuration);
        setTimeout(() => {
          setLoading(false);
        }, loadingDuration)
        return;
      }
  
      const data = await response.json();
      console.log('Data state:', data);
      if (data && data.weather && data.weather.length > 0) {
        setData(data);
        const backgroundImage = getBackgroundImage(data?.weather[0]?.icon);
        if (backgroundImages[backgroundImage]) {
          document.body.style.backgroundImage = `url(${backgroundImage})`;
        } else {
          const img = new Image();
          img.onload = () => {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
          };
          img.src = backgroundImage;
        }
      } else {
        setErrorMessage('Error: Unknown input.'); // Set error message
        setInputValue('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error: An unexpected error occurred.'); // Set error message
      setInputValue('');
      // Use setError here to handle the error
      setError(error);
    } finally {
      setTimeout(() => {
        setErrorMessage(null); // Clear error message after specified duration
        setLoading(false);
      }, errorDuration);
      setTimeout(() => {
        setLoading(false); // Clear loading message after specified duration
      }, loadingDuration);
    }
  };
  

  const handleLocationUpdate = (location) => {
    handleSearch(location, preferences.units);
  };

  const getConvertedTemperature = () => {
    if (data && data.main) {
      switch (preferences.units) {
        case 'metric':
          return Math.round(data.main.temp - 273.15);
        case 'imperial':
          return Math.round((data.main.temp - 273.15) * 1.8 + 32);
        default:
          return Math.round(data.main.temp - 273.15);
      }
    }
    return null;
  };

  return (
    <div className="App" style={{ backgroundSize: 'cover' }}>
      {errorMessage && ( // Display error message
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
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
