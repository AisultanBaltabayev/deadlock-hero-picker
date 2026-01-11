import React, { useState } from 'react';
import { ClipboardList, MessageSquare, Save } from 'lucide-react';
import './StrategyBoard.css';

const STRATEGY_TEMPLATES = [
    "Aggressive Lane Poke",
    "Defensive Farming",
    "Level 3 Gank Rotation",
    "Early Objective Push",
    "Jungling Focus",
    "Split Push Strategy"
];

const StrategyBoard = ({ strategyBoardTips = [] }) => {
  const [notes, setNotes] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  // Auto-fill notes with tips if any
  React.useEffect(() => {
    if (strategyBoardTips.length > 0 && notes === "") {
        setNotes("Automatic Scout Tips:\n" + strategyBoardTips.map(t => `- ${t}`).join('\n') + "\n\n" + notes);
    }
  }, [strategyBoardTips, notes]);

  const toggleTemplate = (name) => {
    if (selectedTemplates.includes(name)) {
      setSelectedTemplates(selectedTemplates.filter(t => t !== name));
    } else {
      setSelectedTemplates([...selectedTemplates, name]);
    }
  };

  return (
    <div className="strategy-board-box">
      <div className="status-header">
        <ClipboardList size={18} />
        <h3>War Room / Strategy Board</h3>
      </div>

      <div className="strategy-content">
        <div className="templates-section">
            <h4>Quick Templates</h4>
            <div className="template-grid">
                {STRATEGY_TEMPLATES.map(t => (
                    <button 
                        key={t}
                        className={`template-btn ${selectedTemplates.includes(t) ? 'active' : ''}`}
                        onClick={() => toggleTemplate(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>

        <div className="notes-section">
            <h4>Tactical Notes <MessageSquare size={14} /></h4>
            <textarea 
                placeholder="Type your team strategy details here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <div className="board-actions">
                <button className="save-board-btn">
                    <Save size={14} /> Save Strategy
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBoard;
