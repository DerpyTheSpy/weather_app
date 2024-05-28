import React, { useRef, useEffect, useState } from 'react';
import './ThunderstormAnimation.css';
import RainAnimation from './RainAnimation';

/**
 * ThunderstormAnimation component that renders a thunderstorm animation effect.
 *
 * @param {object} animation - The animation prop passed to the component.
 */
const ThunderstormAnimation = ({ animation }) => {
  // Log the animation prop for debugging purposes
  console.log('ThunderstormAnimation prop:', animation);
  console.log('Rendering ThunderstormAnimation');

  // Create a reference to the thunderstorm container element
  const thunderstormContainerRef = useRef(null);

  // State variable to control the visibility of thunder bolts
  const [showThunderBolts, setShowThunderBolts] = useState(false);

  // State variable to store the thunder bolts elements
  const [thunderBolts, setThunderBolts] = useState([]);

  /**
   * useEffect hook that runs once when the component mounts, and whenever the thunderstormContainerRef changes.
   * It sets up the thunderstorm animation by showing the thunder bolts.
   */
  useEffect(() => {
    // Get the thunderstorm container element
    const thunderstormContainer = thunderstormContainerRef.current;

    // Check if the container element exists
    if (thunderstormContainer) {
      // Get the bounding client rect of the container
      const boundingClientRect = thunderstormContainer.getBoundingClientRect();

      // Show the thunder bolts
      setShowThunderBolts(true);
    }
  }, [thunderstormContainerRef]);

  /**
   * useEffect hook that runs whenever the showThunderBolts or thunderBolts state variables change.
   * It animates the thunder bolts by moving them randomly and removing them from the DOM.
   */
  useEffect(() => {
    // Check if the thunder bolts should be shown
    if (showThunderBolts) {
      // Create an interval to animate the thunder bolts
      const intervalId = setInterval(() => {
        // Check if there are any thunder bolts left
        if (thunderBolts.length > 0) {
          // Choose a random thunder bolt
          const thunderBolt = thunderBolts[Math.floor(Math.random() * thunderBolts.length)];

          // Set a random left position for the thunder bolt
          thunderBolt.style.left = `${Math.random() * 100}%`;

          // Set a random animation delay for the thunder bolt
          thunderBolt.style.animationDelay = `${Math.random() * 5}s`;

          // Append the thunder bolt to the thunderstorm container
          thunderstormContainerRef.current.appendChild(thunderBolt);

          // Remove the thunder bolt from the thunderBolts array
          thunderBolts.splice(thunderBolts.indexOf(thunderBolt), 1);

          // Update the thunderBolts state variable
          setThunderBolts([...thunderBolts]);
        }
      }, 500);

      // Return a cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [showThunderBolts, thunderBolts]);

  // Render the thunderstorm animation container, rain animation, and lightning elements
  return (
    <div className="thunderstorm-container" ref={thunderstormContainerRef}>
      {/* Render the rain animation */}
      <RainAnimation animation={animation} />

      {/* Render 5 lightning elements with random left positions */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="lightning" style={{ left: `${Math.random() * 100}%` }}></div>
      ))}
    </div>
  );
};

// Export the ThunderstormAnimation component as the default export
export default ThunderstormAnimation;