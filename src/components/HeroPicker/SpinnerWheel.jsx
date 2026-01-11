import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SpinnerWheel.css';

const SpinnerWheel = ({ currentUser, animationHeroes, availableHeroes, onComplete }) => {
  const [displayHero, setDisplayHero] = useState(animationHeroes[0] || {});
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (!availableHeroes || availableHeroes.length === 0) {
      onComplete({ name: "No Heroes Left!" });
      return;
    }

    let interval;
    const duration = 2000;
    const intervalTime = 50;
    const startTime = Date.now();
    
    // Fallback if animationHeroes is empty (shouldn't happen if setup correctly)
    const pool = (animationHeroes && animationHeroes.length > 0) ? animationHeroes : availableHeroes;

    interval = setInterval(() => {
      const timePassed = Date.now() - startTime;
      
      const randomVisual = pool[Math.floor(Math.random() * pool.length)];
      setDisplayHero(randomVisual);

      if (timePassed > duration) {
        clearInterval(interval);
        setIsFinishing(true);
        const finalHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
        setDisplayHero(finalHero);
        
        setTimeout(() => {
          onComplete(finalHero);
        }, 800);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentUser, animationHeroes, availableHeroes, onComplete]);

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="spinner-container"
    >
      {/* Decorative lines */}
      <div className="spinner-line-v"></div>
      <div className="spinner-line-h"></div>

      <h2 className="picking-for-label">
        PICKING FOR
      </h2>
      
      <div className="current-user-name">
        {currentUser}
      </div>

      <div className="hero-display">
        {/* Hero Image */}
        {displayHero.image ? (
          <img 
            src={displayHero.image} 
            alt={displayHero.name} 
            className={`spinner-image ${isFinishing ? 'finishing' : 'spinning'}`}
          />
        ) : (
           <div className={`hero-text-fallback ${isFinishing ? 'finishing' : ''}`}>
             {displayHero.name}
           </div>
        )}
        
        {/* Name Overlay */}
        <div className="hero-name-overlay">
          {displayHero.name}
        </div>
      </div>

      {/* Decorative scanning line */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="scan-line"
      />
    </motion.div>
  );
};

export default SpinnerWheel;
