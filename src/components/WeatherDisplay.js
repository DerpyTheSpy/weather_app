import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, units, onUnitChange }) => {
  const icon = data?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null;

  const getTemperature = () => {
    if (data && data.main) {
      const temp = units === 'metric' ? data.main.temp : (data.main.temp * 9/5) + 32;
      return `${Math.round(temp)} ${units === 'metric' ? '°C' : '°F'}`;
    }
    return null;
  };

  const getFeelsLikeTemperature = () => {
    if (data && data.main) {
      const feelsLike = units === 'metric' ? data.main.feels_like : (data.main.feels_like * 9/5) + 32;
      return `${Math.round(feelsLike)} ${units === 'metric' ? '°C' : '°F'}`;
    }
    return null;
  };

  const getWindSpeed = () => {
    if (data && data.wind) {
      return `${Math.round(data.wind.speed)} ${units === 'metric' ? 'm/s' : 'mph'}`;
    }
    return null;
  };

  const getVisibility = () => {
    if (data && data.visibility) {
      return `${units === 'metric' ? Math.round(data.visibility / 1000) : Math.round(data.visibility / 1609)} ${units === 'metric' ? 'km' : 'miles'}`;
    }
    return null;
  };

  return (
    <div className="weather-output">
      {data && data.name ? (
        <>
          <h2>{data.name}</h2>
          <div className="detail">
            {icon && <img src={icon} alt="" />}
          </div>
          <div className="weather-details">
            <div className="detail">
              <label>Current Temp:</label>
              <span>{getTemperature()}</span>
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
              <span>{getFeelsLikeTemperature()}</span>
            </div>
            <div className="detail">
              <div>
                <label>Wind:</label>
                <span>{getWindSpeed()}</span>
              </div>
            </div>
            <div className="detail">
              <div>
                <label>Visibility:</label>
                <span>{getVisibility()}</span>
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
