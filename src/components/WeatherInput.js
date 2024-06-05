import React, { useState, useEffect } from 'react';
import './WeatherInput.css';

const WeatherInput = ({ onSearch, onLocationUpdate }) => {
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // New state for error message

  useEffect(() => {
    if (onLocationUpdate) {
      onLocationUpdate(location);
    }
  }, [location, onLocationUpdate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message
    if (!location.trim()) {
      setErrorMessage('No input detected. Please enter a city name.'); // Set error message
      return;
    }
    if (!isNaN(location)) {
      setErrorMessage('Invalid city name. Please enter a valid city name.'); // Set error message
      return;
    }
    onSearch(location);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setErrorMessage(null); // Clear error message when input changes
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
      {errorMessage && ( // Display error message
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

export default WeatherInput;
