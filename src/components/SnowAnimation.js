import React, { useRef, useEffect } from 'react';
import './SnowAnimation.css';

/**
 * SnowAnimation component that renders a snow animation effect.
 * 
 * @param {object} animation - The animation prop passed to the component.
 */
const SnowAnimation = ({ animation }) => {
  // Log the animation prop for debugging purposes
  console.log('SnowAnimation prop:', animation);
  console.log('Rendering SnowAnimation');

  // Create a reference to the snow container element
  const snowContainerRef = useRef(null);

  /**
   * useEffect hook that runs once when the component mounts.
   * It sets up the snow animation by positioning and styling the snowflakes.
   */
  useEffect(() => {
    if (snowContainerRef.current) {
      // Get the snow container element
      const snowContainer = snowContainerRef.current;
      
      // Get all snowflake elements
      const snowflakes = document.querySelectorAll('.snow');
      
      // Get the height of the snow container
      const containerHeight = snowContainer.getBoundingClientRect().height;

      // Loop through each snowflake and set its styles
      snowflakes.forEach((snowflake, index) => {
        // Set a random left position for the snowflake
        snowflake.style.setProperty('--random-left', `${Math.random() * 100}%`);
        
        // Set the initial top position of the snowflake outside the viewport
        snowflake.style.setProperty('--random-top', `-${containerHeight + 100}px`);
        
        // Center the snowflake horizontally
        snowflake.style.left = `calc(${snowflake.style.getPropertyValue('--random-left')} - 2.5px)`;
        
        // Set a random animation delay for the snowflake
        snowflake.style.setProperty('--animation-delay', `${Math.random() * 5}s`);
        
        // Make the snowflake visible after a random delay
        setTimeout(() => {
          snowflake.style.opacity = '1';
        }, Math.random() * 1000);
      });
    }
  }, []);

  // Render the snow animation container and snowflakes
  return (
    <div className="snow-container" ref={snowContainerRef}>
      {/* Render 36 invisible snowflakes */}
      {Array.from({ length: 36 }, (_, i) => (
        <div key={i} className="snow snow-invisible"></div>
      ))}
      
      {/* Render the snow animation container */}
      <div className="snow-animation">
        {/* Render 36 snow drops */}
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} className="snow-drop"></div>
        ))}
      </div>
    </div>
  );
};

// Export the SnowAnimation component as the default export
export default SnowAnimation;