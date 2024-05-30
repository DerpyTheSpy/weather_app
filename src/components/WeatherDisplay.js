import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, temperature, units, onUnitChange }) => {
  const icon = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`;

  const getFeelsLikeTemperature = () => {
    if (data && data.main) {
      switch (units) {
        case 'metric':
          return Math.round(data.main.feels_like - 273.15);
        case 'imperial':
          return Math.round(
            (data.main.feels_like - 273.15) * 1.8 + 32
          );
        default:
          return Math.round(data.main.feels_like - 273.15);
      }
    }
    return null;
  };

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
              <span>{temperature} {units === 'etric'? '°C' : '°F'}</span>
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
              <span>{getFeelsLikeTemperature()} {units === 'etric'? '°C' : '°F'}</span>
            </div>
            <div className="detail">
              <div>
                <label>Wind:</label>
                <span>{data.wind.speed} m/s</span>
                </div>
            </div>
            <div className="detail">
            <div>
                <label>Visibility:</label>
                <span>{data.visibility / 1000} km</span>
              </div>
            </div>
            <div className="detail flex">
              <div>
                <label>Sunrise:</label>
                <span>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span>
              </div>
              <div>
                <label>Sunset:</label>
                <span>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
              </div>
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