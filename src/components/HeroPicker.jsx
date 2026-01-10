import React from 'react';
import { History as HistoryIcon } from 'lucide-react';
import InputSection from './InputSection';
import SpinnerWheel from './SpinnerWheel';
import ResultDisplay from './ResultDisplay';
import HistorySidebar from './HistorySidebar';
import { DEADLOCK_HEROES } from '../data/heroes';
import './HeroPicker.css';
import useInputManagement from '../hooks/useInputManagement';
// import useHeroRandomizer from '../hooks/useHeroRandomizer'; // Lifted to App

const HeroPicker = ({
    isSpinning,
    showHistory,
    history,
    results,
    currentUser,
    availableHeroes,
    handleStart,
    handleSpinResult,
    handleRerollHero,
    handleRerollRole,
    handleRerollBoth,
    rerollingIds,
    resetMatch,
    toggleHistory,
    options,
    setOptions
  }) => {
  // Use Custom Hooks
  const {
    userListText, setUserListText,
    heroListText, setHeroListText,
    roleListText, setRoleListText,
    parseList,
    prefillHeroes,
    prefillRoles
  } = useInputManagement();

  // Logic hook lifted to App.jsx defined via props now

  const onStartClick = () => {
    const users = parseList(userListText);
    const heroes = parseList(heroListText);
    const roles = parseList(roleListText);
    handleStart(users, heroes, roles);
  };

  return (
    <div className="hero-picker-container">
      
      {!showHistory && (
        <div 
            className="history-toggle-fixed" 
            onClick={toggleHistory}
            title="Show History"
        >
            <HistoryIcon size={24} />
        </div>
      )}

      {showHistory && <HistorySidebar history={history} onClose={toggleHistory} />}

      <div className="main-content" style={{ marginRight: showHistory ? '300px' : '0' }}>
        
        {!isSpinning && results.length === 0 && (
          <React.Fragment>
            <div className="toolbar">
               <button className="toolbar-btn" onClick={toggleHistory}>
                 {showHistory ? 'Hide History' : 'Show History'}
               </button>
               <button 
                className="toolbar-btn"
                onClick={prefillHeroes}
               >
                 Pre-fill All Heroes
               </button>
               <button 
                className="toolbar-btn"
                onClick={prefillRoles}
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
              options={options}
              setOptions={setOptions}
            />
            <button 
              className="start-btn"
              onClick={onStartClick}
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
              rerollingIds={rerollingIds}
              onRerollHero={!isSpinning ? handleRerollHero : null}
              onRerollRole={!isSpinning ? handleRerollRole : null}
              onRerollBoth={!isSpinning ? handleRerollBoth : null}
            />
          </div>
        )}

        {!isSpinning && results.length > 0 && (
          <button 
            className="new-match-btn"
            onClick={resetMatch}
          >
            NEW MATCH
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroPicker;
