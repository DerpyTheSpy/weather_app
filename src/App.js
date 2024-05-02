import React, { useState} from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay.js';

const App = () => {
  const [data, setData] = useState(null);

  const handleSearch = async (location) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=85066c6de56d3de5fcc05b6934af3e9e`
    );

    const data = await response.json();
    setData(data);
  };

  return (
    <div className="App">
      <WeatherInput onSearch={handleSearch} />
      {data && <WeatherDisplay data={data} location={data.name} />}
    </div>
  );
};

export default App;