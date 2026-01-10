import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPicker from './components/HeroPicker';
import MatchDetail from './components/MatchDetail';
import useHeroRandomizer from './hooks/useHeroRandomizer';
import './App.css';

function App() {
  const randomizer = useHeroRandomizer();

  return (
    <Router>
      <h1 className="deadlock-title">DEADLOCK HERO PICKER</h1>
      <div className="card">
        <Routes>
          <Route path="/" element={<HeroPicker {...randomizer} />} />
          <Route path="/match/:matchId" element={
            <MatchDetail 
                history={randomizer.history} 
                updateMatchStatus={randomizer.updateMatchStatus} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
