import React, { useState } from 'react';

const WeatherInput = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) {
      alert('No input detected. Please enter a city name');
      return;
    }
    onSearch(location);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter a city"
        value={location}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default WeatherInput;
