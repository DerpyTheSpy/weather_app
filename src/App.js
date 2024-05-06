import React, { useState, useEffect } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay.js';

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
      setData(data);
      document.body.style.backgroundImage = `url(${getBackgroundImage(data?.weather[0]?.icon)})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'top center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.height = '100vh';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ backgroundSize: 'cover' }}>
      <WeatherInput onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {data &&!loading && <WeatherDisplay data={data} location={data.name} />}
    </div>
  );
};

export default App;