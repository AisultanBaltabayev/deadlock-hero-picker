import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, User, Shield, Dna } from 'lucide-react';
import { LANES } from '../data/heroes';
import './ResultDisplay.css';

const ResultDisplay = ({ results, rerollingIds = [], onRerollHero, onRerollRole, onRerollBoth }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (userId, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  const handleOptionClick = (action, userId) => {
    action(userId);
    setOpenDropdownId(null);
  };

  return (
    <div className="results-container">
      
      {results.length > 0 && (
        <h3 className="results-title">
          Matchups
        </h3>
      )}

      <div className="results-list" ref={dropdownRef}>
        <AnimatePresence mode="popLayout">
          {results.map((item) => {
            // If this user is currently rerolling, don't render their card (triggers exit)
            if (rerollingIds.includes(item.user)) return null;

            return (
                <motion.div
                key={item.user + (item.hero.name || item.hero) + item.role} 
                className="result-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} // Fast exit
                transition={{ duration: 0.3 }}
                style={{ zIndex: openDropdownId === item.user ? 50 : 1 }}
                >
                {/* User Name */}
                <div className="user-name">{item.user}</div>
                
                {/* Hero Info */}
                <div className="hero-info">
                    {(item.hero.image) ? (
                    <img src={item.hero.image} alt={item.hero.name} className="hero-image"/>
                    ) : (
                    <div className="hero-placeholder">?</div>
                    )}
                    
                    <span className="hero-name">
                    {item.hero.name || item.hero}
                    </span>
                </div>

                {/* Role Badge */}
                {item.role && (
                    <div className="role-badge-container">
                        <div className="role-badge">
                            {item.role}
                        </div>
                        {/* {item.roleChance && (
                            <span className="role-chance">
                                {item.roleChance}%
                            </span>
                        )} */}
                        {item.lane && (
                            <div 
                                className="lane-badge"
                                style={{ 
                                    border: `1px solid ${LANES.find(l => l.name === item.lane)?.color || '#fff'}`,
                                    color: LANES.find(l => l.name === item.lane)?.color || '#fff'
                                }}
                            >
                                {item.lane}
                            </div>
                        )}
                    </div>
                )}
                
                {/* Challenge */}
                {item.challenge && (
                    <div className="challenge-text">
                        ⚠️ {item.challenge}
                    </div>
                )}

                {/* Action Menu */}
                <div className="result-actions">
                    <div className="dropdown-container">
                        <button 
                            className={`reroll-menu-btn ${openDropdownId === item.user ? 'active' : ''}`}
                            onClick={(e) => toggleDropdown(item.user, e)}
                            title="Reroll Options"
                        >
                            <RefreshCw size={18} />
                        </button>
                        
                        {openDropdownId === item.user && (
                            <div className="dropdown-menu">
                                {onRerollHero && (
                                    <button onClick={() => handleOptionClick(onRerollHero, item.user)}>
                                        <User size={14} /> Reroll Hero
                                    </button>
                                )}
                                {onRerollRole && (
                                    <button onClick={() => handleOptionClick(onRerollRole, item.user)}>
                                        <Shield size={14} /> Reroll Role
                                    </button>
                                )}
                                {onRerollBoth && (
                                    <button onClick={() => handleOptionClick(onRerollBoth, item.user)}>
                                        <Dna size={14} /> Reroll Both
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultDisplay;
