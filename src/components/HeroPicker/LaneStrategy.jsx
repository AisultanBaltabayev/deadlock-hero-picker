import React from 'react';
import { Map, Zap } from 'lucide-react';
import './LaneStrategy.css';

const LaneStrategy = ({ suggestedLanes }) => {
  if (!suggestedLanes || suggestedLanes.length === 0) return null;

  return (
    <div className="lane-strategy-box">
      <div className="strategy-header">
        <Map size={18} />
        <h3>Deployment Strategy</h3>
      </div>
      
      <div className="lanes-layout">
        {suggestedLanes.map((item, idx) => (
          <div key={idx} className="lane-assignment-card">
            <div className="lane-badge" style={{ backgroundColor: getLaneColor(item.lane) }}>
              {item.lane}
            </div>
            <div className="assignment-details">
              <span className="player-ref">{item.user}</span>
              <span className="hero-ref">{item.hero}</span>
              {item.advice && <span className="lane-advice">{item.advice}</span>}
              {item.priority === 'High' && (
                <span className="priority-tag">
                  <Zap size={10} /> Priority
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="strategy-footer">
        <p className="hint">* Suggested based on team synergy and player count. Lane priority indicates where resources should focus early game.</p>
      </div>
    </div>
  );
};

const getLaneColor = (name) => {
    if (!name) return '#666';
    if (name.includes('Yellow')) return '#f1c40f';
    if (name.includes('Blue')) return '#3498db';
    if (name.includes('Purple')) return '#9b59b6';
    return '#666';
};

export default LaneStrategy;
