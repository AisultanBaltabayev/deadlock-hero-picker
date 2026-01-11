import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroPicker from './pages/HeroPicker';
import MatchDetail from './pages/MatchDetail';
import MatchHistoryPage from './pages/MatchHistoryPage';
import useHeroRandomizer from './hooks/useHeroRandomizer';
import DraftLobby from './pages/DraftLobby';
import Header from './components/Header/Header';
import './App.css';

const App = () => {
  const randomizer = useHeroRandomizer();
  
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <div className="card-container">
          <Routes>
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="/main" element={<HeroPicker {...randomizer} />} />
            <Route path="/draft" element={<DraftLobby />} />
            <Route path="/history" element={
              <MatchHistoryPage 
                  history={randomizer.history}
              />
            } />
            <Route path="/match/:matchId" element={
              <MatchDetail 
                  history={randomizer.history} 
                  updateMatchStatus={randomizer.updateMatchStatus} 
              />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
