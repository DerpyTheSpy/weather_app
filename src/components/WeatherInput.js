import React, { useState } from 'react';

const WeatherInput = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) {
      setError('Please enter a city name');
    } else {
      onSearch(location);
      setError(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.trim().length > 0) {
      setLocation(value);
      setError(null);
    } else {
      setError('Please enter a city name');
      setLocation('');
    }
  };

  

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter a city"
        value={location}
        onChange={handleInputChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Search</button>
    </form>
  );
};

export default WeatherInput;