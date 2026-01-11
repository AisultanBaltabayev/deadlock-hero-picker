import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import HistoryRow from '../components/MatchHistory/HistoryRow';
import './MatchHistoryPage.css';

const MatchHistoryPage = ({ history }) => {
    const navigate = useNavigate();

    return (
        <div className="match-history-page">
            <div className="history-page-content">
                <div className="history-page-header">
                    <Clock size={32} className="history-icon" />
                    <h2 className="history-page-title">Match History</h2>
                </div>
                
                {history.length === 0 ? (
                    <div className="empty-history">
                        <p>No matches recorded yet.</p>
                        <button className="start-match-btn" onClick={() => navigate('/')}>
                            Start a Match
                        </button>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.map((match, index) => (
                            <HistoryRow 
                                key={match.timestamp} 
                                match={match} 
                                index={index}
                                onClick={() => navigate(`/match/${match.timestamp}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchHistoryPage;
