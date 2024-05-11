import React, { useState, useEffect } from 'react';
import WeatherInput from './components/WeatherInput.js';
import WeatherDisplay from './components/WeatherDisplay.js';
import RainAnimation from './components/RainAnimation.js';
import SnowAnimation from './components/SnowAnimation.js';
import ThunderstormAnimation from './components/ThunderstormAnimation.js';
import './App.css'

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

const App = ({ selectedCity }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [inputValue, setInputValue] = useState('');

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

  const handleSearch = async (location) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=85066c6de56d3de5fcc05b6934af3e9e`
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
      if (data && data.weather && data.weather.length > 0) {
        setData(data);
        document.body.style.backgroundImage = `url(${getBackgroundImage(data?.weather[0]?.icon)})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'top center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.height = '100vh';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        setAnimation(null);
  
        const weather = data?.weather[0]?.id;
        switch (true) {
          case weather >= 500 && weather <= 531:
            setAnimation('rain');
            console.log('Animation: rain');
            break;
          case weather >= 600 && weather <= 622:
            setAnimation('snow');
            console.log('Animation: snow');
            break;
          case weather >= 200 && weather <= 232:
            setAnimation('thunderstorm');
            console.log('Animation: thunderstorm');
            break;
          default:
            setAnimation(null);
            console.log('Animation: none');
        }
        console.log('Animation state:', animation);
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

  useEffect(() => {
    if (selectedCity) {
      handleSearch(selectedCity);
    }
  }, [selectedCity]);

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
      {data &&!loading && (
        <>
          <div className="background-container">
            <div className="animation-container">
              {animation === 'rain' && <RainAnimation />}
              {animation === 'snow' && <SnowAnimation />}
              {animation === 'thunderstorm' && <ThunderstormAnimation />}
            </div>
            <WeatherDisplay data={data} location={data.name} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;