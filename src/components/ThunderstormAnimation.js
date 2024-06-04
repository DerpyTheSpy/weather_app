import React, { useRef, useEffect, useState } from 'react';
import './ThunderstormAnimation.css';
import RainAnimation from './RainAnimation';

const ThunderstormAnimation = ({ animation }) => {
  console.log('ThunderstormAnimation prop:', animation);
  console.log('Rendering ThunderstormAnimation');
  const thunderstormContainerRef = useRef(null);
  const [showThunderBolts, setShowThunderBolts] = useState(false);
  const [thunderBolts, setThunderBolts] = useState([]);

  useEffect(() => {
    if (thunderstormContainerRef.current) {
      setShowThunderBolts(true);
    }
  }, [thunderstormContainerRef]);

  useEffect(() => {
    if (showThunderBolts) {
      const intervalId = setInterval(() => {
        if (thunderBolts.length > 0) {
          const thunderBolt = thunderBolts[Math.floor(Math.random() * thunderBolts.length)];
          thunderBolt.style.left = `${Math.random() * 100}%`;
          thunderBolt.style.animationDelay = `${Math.random() * 5}s`;
          thunderstormContainerRef.current.appendChild(thunderBolt);
          thunderBolts.splice(thunderBolts.indexOf(thunderBolt), 1);
          setThunderBolts([...thunderBolts]);
        }
      }, 500);
      return () => clearInterval(intervalId);
    }
  }, [showThunderBolts, thunderBolts]);

  return (
    <div className="thunderstorm-container" ref={thunderstormContainerRef}>
      <RainAnimation animation={animation} />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="lightning" style={{ left: `${Math.random() * 100}%` }}></div>
      ))}
    </div>
  );
};

export default ThunderstormAnimation;
