import React from 'react';
import { Users, Sword, Dna } from 'lucide-react';
import './InputSection.css';

const InputSection = ({ 
  userList, 
  setUserList, 
  heroList, 
  setHeroList,
  roleList,
  setRoleList,
  isSpinning
}) => {
  return (
    <div className="input-section-container">
      
      {/* Users Input */}
      <div className="input-card">
        <div className="input-header">
          <Users size={20} color="var(--color-secondary)" />
          <h3 className="input-title">Players</h3>
        </div>
        <textarea
          className="input-textarea"
          value={userList}
          onChange={(e) => setUserList(e.target.value)}
          placeholder="Enter player names...&#10;Alice&#10;Bob"
          disabled={isSpinning}
        />
        <div className="input-counter">
          {userList.split(/[\n,]/).filter(s => s.trim()).length} Players
        </div>
      </div>

      {/* Heroes Input */}
      <div className="input-card">
        <div className="input-header">
          <Sword size={20} color="var(--color-primary)" />
          <h3 className="input-title">Heroes Pool</h3>
        </div>
        <textarea
          className="input-textarea"
          value={heroList}
          onChange={(e) => setHeroList(e.target.value)}
          placeholder="Enter hero names...&#10;Abrams&#10;Bebop"
          disabled={isSpinning}
        />
        <div className="input-counter">
          {heroList.split(/[\n,]/).filter(s => s.trim()).length} Heroes
        </div>
      </div>

      {/* Roles Input */}
      <div className="input-card">
        <div className="input-header">
          <Dna size={20} color="#e94560" />
          <h3 className="input-title">Play Styles</h3>
        </div>
        <textarea
          className="input-textarea"
          value={roleList}
          onChange={(e) => setRoleList(e.target.value)}
          placeholder="Enter play styles...&#10;Core&#10;Support"
          disabled={isSpinning}
        />
        <div className="input-counter">
          {roleList.split(/[\n,]/).filter(s => s.trim()).length} Styles
        </div>
      </div>

    </div>
  );
};

export default InputSection;
