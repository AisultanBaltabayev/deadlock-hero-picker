import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHeroRandomizer from '../hooks/useHeroRandomizer';
import { ArrowLeft, Trophy, XCircle } from 'lucide-react';
import './MatchDetail.css';

const MatchDetail = ({ history, updateMatchStatus }) => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  
  // Note: We need access to history here. 
  // Ideally useHeroRandomizer state should be lifted or via Context.
  // For now, assuming we might need to pass props from App or Context.
  // But wait, if we use the hook inside component, it creates NEW state instance.
  // We need the SHARED state. 
  // Since we don't have Context yet, let's assume we lift state in App.jsx or use a simple hack.
  // Actually, for this Refactor, moving the hook usage to App.jsx and passing down is best.
  
  const match = history.find(m => m.timestamp.toString() === matchId);

  if (!match) return <div className="match-detail-container">Match not found</div>;

  return (
    <div className="match-detail-container">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft /> Back
        </button>
        <h2>Match Details</h2>
        <span className="match-date">
            {new Date(match.timestamp).toLocaleString()}
        </span>
      </div>

      <div className="match-heroes-grid">
        {match.results.map((result, idx) => (
            <div key={idx} className="match-hero-card">
                <img src={result.hero.image} alt={result.hero.name} className="detail-hero-image"/>
                <div className="detail-info">
                    <div className="detail-user">{result.user}</div>
                    <div className="detail-hero-name">{result.hero.name}</div>
                    <div className="detail-role">{result.role}</div>
                    {result.lane && <div className="detail-lane" style={{ color: '#aaa', fontSize: '0.8rem' }}>{result.lane}</div>}
                    {result.challenge && <div className="detail-challenge">⚠️ {result.challenge}</div>}
                </div>
            </div>
        ))}
      </div>

      <div className="match-actions">
        <h3>Match Outcome</h3>
        <div className="action-buttons">
            <button 
                className={`outcome-btn win ${match.status === 'win' ? 'active' : ''}`}
                onClick={() => updateMatchStatus(match.timestamp, 'win')}
            >
                <Trophy /> Victory
            </button>
            <button 
                className={`outcome-btn loss ${match.status === 'loss' ? 'active' : ''}`}
                onClick={() => updateMatchStatus(match.timestamp, 'loss')}
            >
                <XCircle /> Defeat
            </button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
