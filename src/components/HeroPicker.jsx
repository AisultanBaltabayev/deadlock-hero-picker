import React, { useState, useEffect } from 'react';
import InputSection from './InputSection';
import SpinnerWheel from './SpinnerWheel';
import ResultDisplay from './ResultDisplay';
import HistorySidebar from './HistorySidebar';
import { DEADLOCK_HEROES } from '../data/heroes';
import './HeroPicker.css';

const HeroPicker = () => {
  // Raw inputs
  const [userListText, setUserListText] = useState('');
  const [heroListText, setHeroListText] = useState('');
  const [roleListText, setRoleListText] = useState('');

  // App State
  const [isSpinning, setIsSpinning] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  
  // Logic State
  const [queue, setQueue] = useState([]);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('deadlock_picker_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
    return [];
  });
  
  // Data State
  const [availableHeroes, setAvailableHeroes] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Save history on change
  useEffect(() => {
    localStorage.setItem('deadlock_picker_history', JSON.stringify(history));
  }, [history]);


  const parseList = (text) => {
    return text.split(/[\n,]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  // Helper to resolve hero name to object (if using custom list) or get Image
  const resolveHero = (name) => {
    const known = DEADLOCK_HEROES.find(h => h.name.toLowerCase() === name.toLowerCase());
    return known || { name: name, image: null };
  };

  const handleStart = () => {
    const users = parseList(userListText);
    
    // Check if user is using the custom hero list input OR wants to use the preset
    // If text box is empty, use our full PRESET list? 
    // User requirement: "It must contain to inputs that takes first User list and Hero list."
    // V2 update: We have images. If they type strings that match our data, we map them.
    
    let heroes = [];
    const customHeroes = parseList(heroListText);
    
    if (customHeroes.length > 0) {
      // Resolve custom names to objects if possible
      heroes = customHeroes.map(name => resolveHero(name));
    } else {
      // Optional: If empty, use ALL DEADLOCK HEROES?
      // Let's assume yes for convenience in V2, user might like it.
      // But adhering to strict "input first" rule from V1:
      // If V1 said "takes input", we stick to it unless they want all.
      // Let's default to ALL if input is empty, maybe? 
      // Safe bet: stick to input, but maybe pre-fill the text area with names?
      // Let's rely on their input, but map it.
      if (customHeroes.length === 0) {
          alert("Please define the Hero Pool!");
          return;
      }
    }

    if (users.length === 0) {
      alert("Please add at least one player!");
      return;
    }

    const roles = parseList(roleListText);
    if (roles.length === 0) {
      // Default roles if none provided, or enforce? 
      // User asked for "input", so let's warn if empty but allow running without roles?
      // "It must also choose subtype like spirit or gun". This implies roles are expected.
      // Let's default to Core/Support if empty.
      roles.push("Core (Weapon)", "Core (Spirit)", "Support", "Tank"); 
    }

    if (heroes.length < users.length) {
       // Allow duplicates if pool is smaller? Or just warn?
       // V2 goal: "Prevent from duplicating".
       // If pool < users, we cannot prevent duplicates perfectly without refill.
       // We will just proceed and handle running out.
    }

    setAvailableHeroes([...heroes]);
    setAvailableRoles([...roles]);
    setQueue([...users]);
    setResults([]);
    
    // Start
    setIsSpinning(true);
    setCurrentUser(users[0]);
  };

  const handleSpinResult = (pickedHero) => {
    // Pick a random role (with replacement, since multiple people can have same role usually)
    // Unless we want unique roles? Usually roles are less unique than heroes.
    // Let's assume replacement is fine for roles.
    let pickedRole = availableRoles[Math.floor(Math.random() * availableRoles.length)];

    // Logic: "if for example randomizer selects core it must also choose subtype lit spirit or gun"
    // If the string is EXACTLY "Core" (case insensitive), we split it.
    if (pickedRole.toLowerCase() === 'core') {
      const subtypes = ['Spirit', 'Gun'];
      const subtype = subtypes[Math.floor(Math.random() * subtypes.length)];
      pickedRole = `Core (${subtype})`;
    }

    // Add result
    const newResult = { user: currentUser, hero: pickedHero, role: pickedRole };
    setResults(prev => [...prev, newResult]); // Add to end or start? Display usually top-down.

    // Remove hero from available (No Duplicates rule)
    setAvailableHeroes(prev => prev.filter(h => h.name !== pickedHero.name));

    const remainingQueue = queue.slice(1);
    setQueue(remainingQueue);

    if (remainingQueue.length > 0) {
      setCurrentUser(remainingQueue[0]);
    } else {
      // All done
      setIsSpinning(false);
      setCurrentUser(null);
      
      // Save to History
      const matchRecord = {
        timestamp: Date.now(),
        results: [...results, newResult]
      };
      setHistory(prev => [matchRecord, ...prev]);
    }
  };

  const handleReroll = (userToReroll) => {
    // Find current hero
    const currentResult = results.find(r => r.user === userToReroll);
    if (!currentResult) return;

    // Return current hero to pool? 
    // Usually re-roll means "I don't want this".
    // If we return it, they might get it back instantly if pool is small.
    // Let's NOT return it immediately, or return it but ensure next pick is different?
    // Simpler: Just pick from implementation availableHeroes.
    
    if (availableHeroes.length === 0) {
      alert("No heroes left to re-roll into!");
      return;
    }

    // Pick new
    const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    
    // Update Result
    setResults(results.map(r => 
      r.user === userToReroll ? { ...r, hero: randomHero } : r
    ));

    // Swap pool: Old hero goes back, New hero leaves logic?
    // "Prevent duplicates" -> The old hero is now free for someone else?
    // Yes.
    const oldHero = currentResult.hero;
    const newPool = availableHeroes.filter(h => h.name !== randomHero.name);
    setAvailableHeroes([...newPool, oldHero]);
  };

  return (
    <div className="hero-picker-container">
      
      {showHistory && <HistorySidebar history={history} />}

      <div className="main-content" style={{ marginRight: showHistory ? '300px' : '0' }}>
        
        {!isSpinning && results.length === 0 && (
          <React.Fragment>
            <div className="toolbar">
               <button className="toolbar-btn" onClick={() => setShowHistory(!showHistory)}>
                 {showHistory ? 'Hide History' : 'Show History'}
               </button>
               <button 
                className="toolbar-btn"
                onClick={() => setHeroListText(DEADLOCK_HEROES.map(h => h.name).join(', '))}
               >
                 Pre-fill All Heroes
               </button>
               <button 
                className="toolbar-btn"
                onClick={() => setRoleListText("Core\nSupport\nTank")}
               >
                 Pre-fill Roles
               </button>
            </div>

            <InputSection 
              userList={userListText}
              setUserList={setUserListText}
              heroList={heroListText}
              setHeroList={setHeroListText}
              roleList={roleListText}
              setRoleList={setRoleListText}
            />
            <button 
              className="start-btn"
              onClick={handleStart}
            >
              START MATCH
            </button>
          </React.Fragment>
        )}

        {isSpinning && currentUser && (
          <SpinnerWheel 
            key={currentUser} 
            currentUser={currentUser}
            animationHeroes={DEADLOCK_HEROES} // Always animate with full visuals if possible
            availableHeroes={availableHeroes}
            onComplete={handleSpinResult}
          />
        )}

        {(results.length > 0 || isSpinning) && (
          <div style={{ marginTop: '2rem' }}>
            <ResultDisplay 
              results={results} 
              onReroll={!isSpinning ? handleReroll : null} 
            />
          </div>
        )}

        {!isSpinning && results.length > 0 && (
          <button 
            className="new-match-btn"
            onClick={() => setResults([])}
          >
            NEW MATCH
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroPicker;
