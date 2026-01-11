import React from 'react';
import { DEADLOCK_HEROES } from '../../data/heroes';
import './EnemyPicker.css';

const EnemyPicker = ({ enemyTeam, setEnemyTeam }) => {
  const toggleHero = (heroName) => {
    if (enemyTeam.includes(heroName)) {
      setEnemyTeam(enemyTeam.filter(n => n !== heroName));
    } else {
      if (enemyTeam.length < 6) {
        setEnemyTeam([...enemyTeam, heroName]);
      }
    }
  };

  return (
    <div className="enemy-picker-box">
      <div className="enemy-picker-header">
        <h4>Select Enemy Team ({enemyTeam.length}/6)</h4>
        <button className="clear-btn" onClick={() => setEnemyTeam([])}>Clear All</button>
      </div>
      
      <div className="enemy-heroes-grid">
        {DEADLOCK_HEROES.map(hero => (
          <div 
            key={hero.id} 
            className={`enemy-hero-card ${enemyTeam.includes(hero.name) ? 'selected' : ''}`}
            onClick={() => toggleHero(hero.name)}
          >
            <img src={hero.image} alt={hero.name} />
            <div className="hero-name-label">{hero.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnemyPicker;
