import React from 'react';
import { Zap, AlertTriangle, Shield, Swords, Info } from 'lucide-react';
import './TeamAnalysis.css';

const TeamAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  const { synergies, weaknesses, roleCounts, damageTypes } = analysis;

  return (
    <div className="team-analysis-box">
      <div className="analysis-header">
        <Info size={18} />
        <h3>Strategic Analysis</h3>
      </div>

      <div className="analysis-grid">
        {/* Synergies */}
        <div className="analysis-section synergy">
          <h4><Zap size={16} /> Synergies</h4>
          {synergies.length > 0 ? (
            <ul>
              {synergies.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          ) : (
            <p className="dim">No major synergies detected.</p>
          )}
        </div>

        {/* Weaknesses */}
        <div className="analysis-section weakness">
          <h4><AlertTriangle size={16} /> Weaknesses</h4>
          {weaknesses.length > 0 ? (
            <ul>
              {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          ) : (
            <p className="success">Team composition looks balanced!</p>
          )}
        </div>

        {/* Role Coverage */}
        <div className="analysis-section roles">
          <h4><Shield size={16} /> Role Coverage</h4>
          <div className="role-tags">
            {Object.entries(roleCounts).map(([role, count]) => (
              <span key={role} className="role-tag">
                {role}: {count}
              </span>
            ))}
          </div>
        </div>

        {/* Damage Mix */}
        <div className="analysis-section damage">
          <h4><Swords size={16} /> Damage Type Mix</h4>
          <div className="damage-meters">
            {Object.entries(damageTypes).map(([type, count]) => {
                const total = Math.max(1, Object.values(damageTypes).reduce((a,b) => a+b, 0));
                const percent = (count / total) * 100;
                return (
                    <div key={type} className="damage-meter-row">
                        <span className="type-label">{type}</span>
                        <div className="meter-bg">
                            <div className="meter-fill" style={{ width: `${percent}%`, backgroundColor: type === 'Spirit' ? '#9b59b6' : '#f1c40f' }}></div>
                        </div>
                    </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysis;
