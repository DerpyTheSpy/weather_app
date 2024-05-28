import React from 'react';
import './WeatherDisplay.css';

/**
 * WeatherDisplay component that displays weather data for a given city.
 *
 * @param {object} data - The weather data for the city.
 * @param {number} temperature - The current temperature for the city.
 * @param {string} units - The units for the temperature (metric or imperial).
 * @param {function} onUnitChange - A callback function that is called when the units are changed.
 */
const WeatherDisplay = ({ data, temperature, units, onUnitChange }) => {
  // Get the weather icon URL based on the weather data
  const icon = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`;

  /**
   * getFeelsLikeTemperature function that calculates the feels like temperature based on the units.
   *
   * @returns {number|null} The feels like temperature in the specified units, or null if the data is not available.
   */
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

  // Render the weather output component
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
              <span>{temperature} {units === 'metric'? '°C' : '°F'}</span>
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
              <span>{getFeelsLikeTemperature()} {units === 'metric'? '°C' : '°F'}</span>
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

// Export the WeatherDisplay component as the default export
export default WeatherDisplay;