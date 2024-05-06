import React, { useState } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data }) => {
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-output">
      <h2>{data.name}</h2>
        <div className="detail">
          <img src={icon}></img>
        </div>
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