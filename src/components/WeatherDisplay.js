import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, temperature, units, onUnitChange }) => {
  const icon = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`;

  return (
    <div className="weather-output">
      {data && data.name? (
        <>
          <h2>{data.name}</h2>
          <div className="detail">
            <img src={icon}></img>
          </div>
          <div className="weather-details">
            <div className="detail">
              <label>Current Temp:</label>
              <span>{temperature} {units === 'metric' ? '°C' : '°F'}</span>
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
              <span>{data.main.feels_like} {units === 'metric' ? '°C' : '°F'}</span>
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
            <div className="detail">
              <label>Units:</label>
              <select value={units} onChange={(event) => onUnitChange(event.target.value)}>
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <h2>No city found</h2>
      )}
    </div>
  );
};

export default WeatherDisplay;