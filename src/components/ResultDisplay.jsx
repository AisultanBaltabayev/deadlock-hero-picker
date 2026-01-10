import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import './ResultDisplay.css';

const ResultDisplay = ({ results, onReroll }) => {
  return (
    <div className="results-container">
      
      {results.length > 0 && (
        <h3 className="results-title">
          Matchups
        </h3>
      )}

      <div className="results-list">
        <AnimatePresence>
          {results.map((item) => (
            <motion.div
              key={item.user + (item.hero.name || item.hero)} // Use name if object
              className="result-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* User Name */}
              <div className="user-name">{item.user}</div>
              
              {/* Hero Info */}
              <div className="hero-info">
                {/* Image Thumbnail */}
                {(item.hero.image) ? (
                  <img 
                    src={item.hero.image} 
                    alt={item.hero.name} 
                    className="hero-image"
                  />
                ) : (
                  <div className="hero-placeholder">
                    ?
                  </div>
                )}
                
                <span className="hero-name">
                  {item.hero.name || item.hero}
                </span>
              </div>

              {/* Role Badge */}
              {item.role && (
                <div className="role-badge">
                  {item.role}
                </div>
              )}

              {/* Re-roll Button */}
              {onReroll && (
                <button 
                  className="reroll-btn"
                  onClick={() => onReroll(item.user)}
                  title="Re-roll Hero"
                >
                  <RefreshCw size={18} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultDisplay;
