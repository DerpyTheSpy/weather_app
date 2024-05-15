import React from 'react';
import './ThunderstormAnimation.css';

const ThunderstormAnimation = ({ animation }) => {
  console.log('ThunderstormAnimation prop:', animation);
  console.log('Rendering ThunderstormAnimation');
  return (
    <div className="thunderstorm-container">
      <div className="lightning"></div>
      <div className="lightning"></div>
      <div className="lightning"></div>
      <div className="lightning"></div>
      <div className="lightning"></div>
    </div>
  );
};

export default ThunderstormAnimation;