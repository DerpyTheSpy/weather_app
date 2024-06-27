import React, { useState, useEffect, useRef } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, units, onUnitChange }) => {
  const [displayData, setDisplayData] = useState(null);
  const [unit, setUnit] = useState(units);
  const originalUnit = useRef(units); // Using useRef to store the original unit

  useEffect(() => {
    if (data) {
      setDisplayData(data);
    }
  }, [data]);

  useEffect(() => {
    setUnit(units);
  }, [units]);

  const handleUnitChange = (event) => {
    const newUnit = event.target.value;
    setUnit(newUnit);
    onUnitChange(newUnit);

    if (newUnit !== originalUnit.current) {
      convertData(data, newUnit);
    } else {
      setDisplayData(data);
    }
  };

  const convertData = (dataToConvert, unitToConvert) => {
    const newData = unitToConvert === 'metric' ? convertToMetric(dataToConvert) : convertToImperial(dataToConvert);
    setDisplayData(newData);
  };

  const convertToMetric = (dataToConvert) => {
    return {
      ...dataToConvert,
      unit: 'metric',
      main: {
        ...dataToConvert.main,
        temp: ((dataToConvert.main.temp - 32) * 5) / 9,
        feels_like: ((dataToConvert.main.feels_like - 32) * 5) / 9,
      },
      wind: {
        ...dataToConvert.wind,
        speed: dataToConvert.wind.speed * 0.44704, // Convert mph to m/s
      },
      visibility: dataToConvert.visibility * 1.60934, // Convert miles to km
    };
  };

  const convertToImperial = (dataToConvert) => {
    return {
      ...dataToConvert,
      unit: 'imperial',
      main: {
        ...dataToConvert.main,
        temp: (dataToConvert.main.temp * 9) / 5 + 32,
        feels_like: (dataToConvert.main.feels_like * 9) / 5 + 32,
      },
      wind: {
        ...dataToConvert.wind,
        speed: dataToConvert.wind.speed / 0.44704, // Convert m/s to mph
      },
      visibility: dataToConvert.visibility / 1.60934, // Convert km to miles
    };
  };

  const getTemperature = () => {
    if (displayData && displayData.main) {
      return `${Math.round(displayData.main.temp)} ${unit === 'metric' ? '°C' : '°F'}`;
    }
    return null;
  };

  const getFeelsLikeTemperature = () => {
    if (displayData && displayData.main) {
      return `${Math.round(displayData.main.feels_like)} ${unit === 'metric' ? '°C' : '°F'}`;
    }
    return null;
  };

  const getWindSpeed = () => {
    if (displayData && displayData.wind) {
      return `${Math.round(displayData.wind.speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`;
    }
    return null;
  };

  const getVisibility = () => {
    if (displayData && displayData.visibility) {
      return `${unit === 'metric' ? Math.round(displayData.visibility / 1000) : Math.round(displayData.visibility / 1609)} ${unit === 'metric' ? 'km' : 'miles'}`;
    }
    return null;
  };

  const icon = displayData?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${displayData.weather[0].icon}@2x.png` : null;

  return (
    <div className="weather-output">
      {displayData && displayData.name ? (
        <>
          <h2>{displayData.name}</h2>
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
              <span>{displayData.weather[0].description}</span>
            </div>
            <div className="detail">
              <label>Humidity:</label>
              <span>{displayData.main.humidity}%</span>
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
                <span>{new Date(displayData.sys.sunrise * 1000).toLocaleTimeString()}</span>
              </div>
              <div>
                <label>Sunset:</label>
                <span>{new Date(displayData.sys.sunset * 1000).toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="detail">
              <label>Units:</label>
              <select value={unit} onChange={handleUnitChange}>
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
