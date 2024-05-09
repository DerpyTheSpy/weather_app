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

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
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
        switch (weather) {
          case '500':
          case '501':
          case '502':
          case '503':
          case '504':
          case '511':
          case '520':
          case '521':
          case '522':
          case '531':
            setAnimation('rain');
            break;
          case '600':
          case '601':
          case '602':
          case '611':
          case '612':
          case '615':
          case '616':
          case '620':
          case '621':
          case '622':
            setAnimation('snow');
            break;
          case '200':
          case '201':
          case '202':
          case '210':
          case '211':
          case '212':
          case '221':
          case '230':
          case '231':
          case '232':
            setAnimation('thunderstorm');
            break;
          default:
            setAnimation(null);
        }
      } else {
        setError('Error, unknown input.');
        setInputValue('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error, unknown input.');
      setInputValue('');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  
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
          <WeatherDisplay data={data} location={data.name} />
          {animation && (
            <div className="animation-container">
              {animation === 'rain' && <RainAnimation />}
              {animation === 'snow' && <SnowAnimation />}
              {animation === 'thunderstorm' && <ThunderstormAnimation />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;