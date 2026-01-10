import { Clock } from 'lucide-react';
import './HistorySidebar.css';
import HistoryRow from './HistoryRow';

const HistorySidebar = ({ history }) => {
  return (
    <div className="history-sidebar">
      <div className="history-header">
        <Clock size={20} color="var(--color-text-dim)" />
        <h3 className="history-title">Match History</h3>
      </div>

      {history.length === 0 && (
        <div className="history-empty">
          No matches yet...
        </div>
      )}

      {history.map((match, index) => {

      return (<HistoryRow match={match} index={index}/>)
      })}
    </div>
  );
};

export default HistorySidebar;
