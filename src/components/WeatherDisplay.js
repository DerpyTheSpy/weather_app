import React from 'react';
import './WeatherDisplay.css';
const WeatherDisplay = ({ data, location }) => {
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      <div className="search-container">
        <input className="search-input" value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} placeholder="Enter Location here" type="text" />
        <button className="search-button" onClick={searchLocation}>Search</button>
      </div>
    }
  }
  return (
    <div className="weather-output">
  <h2>{data.name}</h2>
  <div className="weather-details">
    <div className="detail">
      <label>Current Temp:</label>
      <span>{data.main.temp}°C</span>
    </div>
    <div className="detail">
      <label>Sky Conditions:</label>
      <span>{data.weather[0].description}</span>
    </div>
    <div className="detail">
      <label>Humidity:</label>
      <span>{data.main.humidity}%</span>
    </div>
    <div className="detail">
      <label>Feels Like:</label>
      <span>{data.main.feels_like}°C</span>
    </div>
    <div className="detail">
      <label>Wind:</label>
      <span>{data.wind.speed} m/s</span>
    </div>
    <div className="detail">
      <label>Sunrise:</label>
      <span>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span>
    </div>
    <div className="detail">
      <label>Sunset:</label>
      <span>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
    </div>
    <div className="detail">
      <label>Visibility:</label>
      <span>{data.visibility / 1000} km</span>
    </div>
  </div>
</div>
  );
};

export default WeatherDisplay;