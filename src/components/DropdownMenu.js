import React from 'react';
import CityList from './CityList';

const DropdownMenu = ({ onCitySelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <button onClick={() => setIsOpen(!isOpen)}>
        Select City
      </button>
      {isOpen && <CityList onCitySelect={handleCitySelect} />}
    </div>
  );
};

export default DropdownMenu;