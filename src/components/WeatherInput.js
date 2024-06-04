import React, { useState, useEffect } from 'react';
import './WeatherInput.css';


const WeatherInput = ({ onSearch, onLocationUpdate }) => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (onLocationUpdate) {
      onLocationUpdate(location);
    }
  }, [location, onLocationUpdate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      alert('No input detected. Please enter a city name.');
      return;
    }
    if (!isNaN(location)) {
      alert('Invalid city name. Please enter a valid city name.');
      return;
    }
    onSearch(location);
  };
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  return (
    <form onSubmit={handleSearch} className="weather-input-form">
      <div className="weather-input-container"> {/* Wrap input and button in a container */}
        <input
          type="text"
          placeholder="Enter a city"
          value={location}
          onChange={handleInputChange}
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default WeatherInput;