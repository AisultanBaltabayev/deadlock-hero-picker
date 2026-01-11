import React from 'react';
import { DEADLOCK_HEROES } from '../../data/heroes';
import './TeamFiller.css';

const TeamFiller = ({ availableHeroes, onAddHero, remainingSlots }) => {
  const [search, setSearch] = React.useState("");

  const filtered = availableHeroes.filter(h => 
    h && h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="team-filler-box">
      <div className="filler-header">
        <div className="filler-title-row">
            <h4>Complete Your Squad ({remainingSlots} slots left)</h4>
            <div className="filler-search">
                <input 
                    type="text" 
                    placeholder="Search hero..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
        <p className="dim-text">Pick heroes to reach a full 6-player team for detailed analysis.</p>
      </div>
      
      <div className="filler-grid">
        {filtered.length > 0 ? (
            filtered.map(hero => (
                <div 
                    key={hero.id} 
                    className="hero-fill-card"
                    onClick={() => onAddHero(hero)}
                >
                    <img src={hero.image} alt={hero.name} />
                    <div className="fill-overlay"><span>+</span></div>
                    <div className="hero-fill-name">{hero.name}</div>
                </div>
            ))
        ) : (
            <div className="no-heroes">No heroes found matching "{search}"</div>
        )}
      </div>
    </div>
  );
};

export default TeamFiller;
