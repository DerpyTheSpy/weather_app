import React, { useState, useEffect } from 'react';
import './WeatherInput.css';
import UserPreferences from './UserPreferences';

/**
 * WeatherInput component that allows users to input a city name and search for its weather.
 *
 * @param {function} onSearch - A callback function that is called when the user searches for a city.
 * @param {function} onLocationUpdate - A callback function that is called when the user updates their location.
 */
const WeatherInput = ({ onSearch, onLocationUpdate }) => {
  // State variable to store the user's input location
  const [location, setLocation] = useState('');

  /**
   * useEffect hook that updates the location when the user inputs a new city.
   */
  useEffect(() => {
    if (onLocationUpdate) {
      onLocationUpdate(location);
    }
  }, [location, onLocationUpdate]);

  /**
   * handleSearch function that is called when the user submits the search form.
   *
   * @param {event} e - The search form submission event.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) {
      alert('No input detected. Please enter a city name');
      return;
    }
    onSearch(location);
  };

  /**
   * handleInputChange function that updates the location state when the user inputs a new city.
   *
   * @param {event} e - The input change event.
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  // Render the weather input form component
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

// Export the WeatherInput component as the default export
export default WeatherInput;