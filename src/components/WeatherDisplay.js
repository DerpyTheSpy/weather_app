import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, units, onUnitChange }) => {
  const icon = data?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null;

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1); // Conversion formula from Kelvin to Celsius
  };

  const convertKelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(1); // Conversion formula from Kelvin to Fahrenheit
  };

  const getConvertedTemperature = () => {
    if (data && data.main) {
      const kelvinTemp = data.main.temp;
      switch (units) {
        case 'metric':
          return `${convertKelvinToCelsius(kelvinTemp)} °C`;
        case 'imperial':
          return `${convertKelvinToFahrenheit(kelvinTemp)} °F`;
        default:
          return `${convertKelvinToCelsius(kelvinTemp)} °C`;
      }
    }
    return null;
  };

  const getFeelsLikeTemperature = () => {
    if (data && data.main) {
      const kelvinFeelsLike = data.main.feels_like;
      switch (units) {
        case 'metric':
          return `${convertKelvinToCelsius(kelvinFeelsLike)} °C`;
        case 'imperial':
          return `${convertKelvinToFahrenheit(kelvinFeelsLike)} °F`;
        default:
          return `${convertKelvinToCelsius(kelvinFeelsLike)} °C`;
      }
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
              <span>{getConvertedTemperature()}</span>
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
