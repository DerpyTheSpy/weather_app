import React, { useState, useEffect, useRef } from 'react';
import './RainAnimation.css';

const RainAnimation = ({ animation }) => {
  console.log('RainAnimation prop:', animation);
  console.log('Rendering RainAnimation');
  const rainContainerRef = useRef(null);

  useEffect(() => {
    const container = rainContainerRef.current;
    if (container) {
      const raindrops = container.querySelectorAll('.rain');
      const containerWidth = container.getBoundingClientRect().width;

      container.style.setProperty('--container-width', `${containerWidth}px`);

      raindrops.forEach((raindrop, index) => {
        raindrop.style.setProperty('--random-left', `${Math.random() * 100}%`); // Set random left position
        raindrop.style.setProperty('--random-top', `-${Math.random() * 100}px`); // Set random top position
        raindrop.style.left = `calc(${raindrop.style.getPropertyValue('--random-left')} - 1px)`; // Center the raindrop horizontally
        raindrop.style.setProperty('--animation-delay', `${Math.random() * 5}s`); // Set random animation delay
      });
    }
  }, [rainContainerRef]);

  return (
    <div className="rain-container" ref={rainContainerRef}>
      {Array.from({ length: 21 }, (_, i) => (
        <div key={i} className="rain"></div>
      ))}
    </div>
  );
};

export default RainAnimation;