import React, { useState } from 'react';
import { RotateCw, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import { ITEM_BUILDS } from '../../data/heroes';
import './BuildRoulette.css';

const BuildRoulette = ({ results }) => {
  const [activeBuilds, setActiveBuilds] = useState({}); // { user: buildObject }
  const [ratings, setRatings] = useState({}); // { user: 'up' | 'down' }

  const rollBuild = React.useCallback((user, hero) => {
    const heroName = typeof hero === 'string' ? hero : hero.name;
    const heroId = heroName.toLowerCase();
    const curated = ITEM_BUILDS[heroId] || [];
    
    // logic moved inside useCallback
    const isMeme = Math.random() < 0.3;
    
    let picked;
    if (isMeme) {
        picked = {
            name: "MEME BUILD: " + getRandomMemeName(),
            items: getRandomItems(3),
            type: "Meme"
        };
    } else if (curated.length > 0) {
        picked = curated[Math.floor(Math.random() * curated.length)];
    } else {
        picked = {
            name: "Generic Balanced",
            items: ["Extra Health", "High Velocity Mag", "Mystic Burst"],
            type: "Balanced"
        };
    }

    setActiveBuilds(prev => ({ ...prev, [user]: picked }));
  }, []);

  const handleRate = (user, type) => {
    setRatings(prev => ({ ...prev, [user]: type }));
  };

  return (
    <div className="build-roulette-box">
      <div className="roulette-header">
        <RotateCw size={18} />
        <h3>Build Roulette</h3>
        <p>Optional hero builds for those who dare.</p>
      </div>

      <div className="builds-grid">
        {results.map((res) => {
console.log('res: ', res);


return ((
          <div key={res.user} className="player-build-card">
            <div className="player-info">
              <strong>{res.user}</strong>
              <span>{typeof res.hero === 'string' ? res.hero : res.hero.name}</span>
            </div>
            
            {activeBuilds[res.user] ? (
              <div className={`build-content ${activeBuilds[res.user].type.toLowerCase()}`}>
                <div className="build-type-badge">{activeBuilds[res.user].type}</div>
                <h5>{activeBuilds[res.user].name}</h5>
                <div className="build-items">
                  {activeBuilds[res.user].items.map((it, i) => (
                    <span key={i} className="item-chip">{it}</span>
                  ))}
                </div>
                
                <div className="build-actions">
                    <button 
                        className={`rate-btn ${ratings[res.user] === 'up' ? 'active-up' : ''}`}
                        onClick={() => handleRate(res.user, 'up')}
                    >
                        <ThumbsUp size={14} />
                    </button>
                    <button 
                        className={`rate-btn ${ratings[res.user] === 'down' ? 'active-down' : ''}`}
                        onClick={() => handleRate(res.user, 'down')}
                    >
                        <ThumbsDown size={14} />
                    </button>
                    <button className="re-roll-mini" onClick={() => rollBuild(res.user, res.hero)}>
                        <RotateCw size={12} />
                    </button>
                </div>
              </div>
            ) : (
              <button className="roll-btn" onClick={() => rollBuild(res.user, res.hero)}>
                Roll Build
              </button>
            )}
          </div>
        ))
        })}
      </div>
    </div>
  );
};

// Helpers
const getRandomMemeName = () => {
    const memes = ["The Turbo Slug", "Glass Cannon God", "Infinite Stamina", "Only Melee Abrams", "The Speed Demon", "100% Lifesteal", "The Wall", "Golden Idol"];
    return memes[Math.floor(Math.random() * memes.length)];
};

const getRandomItems = (count) => {
    const allItems = ["Superior Duration", "Superior Range", "Spirit Power", "Melee Lifesteal", "Spirit Strike", "Lifestrike", "Restorative Locket", "Healbane", "Reactive Barrier", "Extra Health", "High Velocity Mag", "Mystic Burst", "Combat Barrier", "Bullet Lifesteal", "Kinetic Dash"];
    const shuffled = [...allItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export default BuildRoulette;
