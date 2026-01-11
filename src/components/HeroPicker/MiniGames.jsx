import React, { useState } from 'react';
import { Gamepad2, Trophy, Coins } from 'lucide-react';
import { DEADLOCK_HEROES } from '../../data/heroes';
import './MiniGames.css';

const MiniGames = ({ results }) => {
  const [triviaActive, setTriviaActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [predictions, setPredictions] = useState({}); // { user: predictedCarry }
  const [points, setPoints] = useState(100);

  const startTrivia = () => {
    const randomHero = DEADLOCK_HEROES[Math.floor(Math.random() * DEADLOCK_HEROES.length)];
    const question = {
        hero: randomHero.name,
        options: [...DEADLOCK_HEROES].sort(() => 0.5 - Math.random()).slice(0, 3).map(h => h.name).concat(randomHero.name).sort(),
        answer: randomHero.name
    };
    setCurrentQuestion(question);
    setTriviaActive(true);
  };

  const handlePredict = (user, carry) => {
    setPredictions(prev => ({ ...prev, [user]: carry }));
  };

  return (
    <div className="mini-games-box">
      <div className="games-header">
        <Gamepad2 size={18} />
        <h3>Squad Mini-Games</h3>
        <div className="points-badge">
            <Coins size={14} /> {points} Souls
        </div>
      </div>

      <div className="games-grid">
        {/* Trivia Game */}
        <div className="game-card trivia">
            <h4><Trophy size={14} /> Hero Trivia</h4>
            {!triviaActive ? (
                <button className="game-btn" onClick={startTrivia}>Play Trivia</button>
            ) : (
                <div className="trivia-ui">
                    <p>Which hero has this image?</p>
                    <div className="trivia-options">
                        {currentQuestion.options.map(opt => (
                            <button 
                                key={opt} 
                                className="opt-btn"
                                onClick={() => {
                                    if (opt === currentQuestion.answer) {
                                        setPoints(p => p + 50);
                                        alert("Correct! +50 Souls");
                                    } else {
                                        alert("Wrong! It was " + currentQuestion.answer);
                                    }
                                    setTriviaActive(false);
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Prediction Game */}
        <div className="game-card prediction">
            <h4>Carry Prediction</h4>
            <p className="dim-text">Who will carry this match?</p>
            <div className="prediction-list">
                {results.map(res => (
                    <div key={res.user} className="predict-row">
                        <span>{res.user}</span>
                        <select 
                            value={predictions[res.user] || ""}
                            onChange={(e) => handlePredict(res.user, e.target.value)}
                        >
                            <option value="">Select Carry...</option>
                            {results.map(r => <option key={r.user} value={r.user}>{r.user} ({typeof r.hero === 'string' ? r.hero : r.hero.name})</option>)}
                        </select>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
