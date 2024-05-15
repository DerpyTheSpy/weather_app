import React from 'react';
import './SnowAnimation.css';

const SnowAnimation = () => {
  const snowflakes = document.querySelectorAll('.snow');

  snowflakes.forEach((snowflake) => {
    const randomNumber = Math.floor(Math.random() * 21) - 10;
    snowflake.style.setProperty('--random-number', randomNumber);
  });

  return (
    <div className="snow-container">
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
    </div>
  );
};

export default SnowAnimation;