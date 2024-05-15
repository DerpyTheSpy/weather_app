import React from 'react';
import './SnowAnimation.css';

const SnowAnimation = () => {
  const snowContainer = document.querySelector('.snow-container');
  const snowflakes = document.querySelectorAll('.snow');
  const containerHeight = snowContainer.getBoundingClientRect().height;

  snowflakes.forEach((snowflake, index) => {
    snowflake.style.setProperty('--random-left', `${Math.random() * 100}%`); // Set random left position
    snowflake.style.setProperty('--random-top', `${Math.random() * containerHeight}px`); // Set random top position
    snowflake.style.left = `calc(${snowflake.style.getPropertyValue('--random-left')} - 2.5px)`; // Center the snowflake horizontally
    snowflake.style.setProperty('--animation-delay', `${Math.random() * 5}s`); // Set random animation delay
  });

  return (
    <div className="snow-container">
      {Array.from({ length: 36 }, (_, i) => (
        <div key={i} className="snow"></div>
      ))}
    <div className="snow-animation">
      {Array.from({ length: 36 }, (_, i) => (
        <div key={i} className="snow-drop"></div>
      ))}
    </div>
    </div>
  );
};

export default SnowAnimation;