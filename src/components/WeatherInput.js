import React, { useState } from 'react';

const WeatherInput = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter a city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default WeatherInput;