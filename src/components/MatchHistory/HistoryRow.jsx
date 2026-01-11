import React from 'react';
import './HistorySidebar.css';

const HistoryRow = ({ match, index, onClick }) => {
//   const [showAll, setShowAll] = useState(false);
//   const showUsersCount = showAll ? match.results.length : 3;
  
  const statusClass = match.status ? match.status : '';

  return (
        <div 
          key={index} 
          className={`history-item ${statusClass}`}
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          <div className="history-meta">
            <span>{new Date(match.timestamp).toLocaleTimeString()}</span>
            <span>{match.results.length} Players</span>
          </div>
          
          <div className="history-results">
            {/* {match.results.slice(0, showUsersCount).map((res, i) => ( */}
            {match.results.map((res, i) => (
              <div key={i} className="history-row">
                <span className="history-user">{res.user}</span>
                <span className="history-hero">
                  {res.hero.name || res.hero} 
                  {res.role && <span style={{fontSize:'0.8em', color: '#666', marginLeft:'5px'}}>({res.role})</span>}
                </span>
              </div>
            ))}
            {/* {match.results.length > 3 && (
              <div className="history-more" onClick={() => setShowAll((prev)=> !prev)}>+ {match.results.length - 3} more</div>
            )} */}
          </div>
        </div>
      )
};

export default HistoryRow;
