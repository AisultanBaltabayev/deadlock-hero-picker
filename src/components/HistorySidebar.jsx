
import { useNavigate } from 'react-router-dom';
import { Clock, X } from 'lucide-react';
import './HistorySidebar.css';
import HistoryRow from './HistoryRow';

const HistorySidebar = ({ history, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="history-sidebar">
      <div className="history-header">
        <div style={{display: 'flex', alignItems: 'justify', gap: '0.5rem'}}>
            <Clock size={20} color="var(--color-text-dim)" />
            <h3 className="history-title">Match History</h3>
        </div>
        {onClose && (
            <button onClick={onClose} className="history-close-btn" title="Close History">
                <X size={18} />
            </button>
        )}
      </div>

      {history.length === 0 && (
        <div className="history-empty">
          No matches yet...
        </div>
      )}

      {history.map((match, index) => {
        return (
            <HistoryRow 
                key={match.timestamp} 
                match={match} 
                index={index}
                onClick={() => navigate(`/match/${match.timestamp}`)}
            />
        )
      })}
    </div>
  );
};

export default HistorySidebar;
