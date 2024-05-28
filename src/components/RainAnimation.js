import React, { useEffect, useRef } from 'react';
import './RainAnimation.css';

/**
 * RainAnimation component that renders a rain animation effect.
 * 
 * @param {object} animation - The animation prop passed to the component.
 */
const RainAnimation = ({ animation }) => {
  // Log the animation prop for debugging purposes
  console.log('RainAnimation prop:', animation);
  console.log('Rendering RainAnimation');

  // Create a reference to the rain container element
  const rainContainerRef = useRef(null);

  /**
   * useEffect hook that runs once when the component mounts, and whenever the rainContainerRef changes.
   * It sets up the rain animation by positioning and styling the raindrops.
   */
  useEffect(() => {
    // Get the rain container element
    const container = rainContainerRef.current;
    
    // Check if the container element exists
    if (container) {
      // Get all raindrop elements
      const raindrops = container.querySelectorAll('.rain');
      
      // Get the width of the rain container
      const containerWidth = container.getBoundingClientRect().width;
      
      // Set the container width as a CSS variable
      container.style.setProperty('--container-width', `${containerWidth}px`);

      // Loop through each raindrop and set its styles
      raindrops.forEach((raindrop, index) => {
        // Set a random left position for the raindrop
        raindrop.style.setProperty('--random-left', `${Math.random() * 100}%`);
        
        // Set a random top position for the raindrop
        raindrop.style.setProperty('--random-top', `-${Math.random() * 100}px`);
        
        // Center the raindrop horizontally
        raindrop.style.left = `calc(${raindrop.style.getPropertyValue('--random-left')} - 1px)`;
        
        // Set a random animation delay for the raindrop
        raindrop.style.setProperty('--animation-delay', `${Math.random() * 5}s`);
      });
    }
  }, [rainContainerRef]);

  // Render the rain animation container and raindrops
  return (
    <div className="rain-container" ref={rainContainerRef}>
      {/* Render 21 raindrops */}
      {Array.from({ length: 21 }, (_, i) => (
        <div key={i} className="rain"></div>
      ))}
    </div>
  );
};

// Export the RainAnimation component as the default export
export default RainAnimation;