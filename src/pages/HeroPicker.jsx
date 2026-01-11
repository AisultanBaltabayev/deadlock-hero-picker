import React from 'react';
import InputSection from '../components/HeroPicker/InputSection';
import SpinnerWheel from '../components/HeroPicker/SpinnerWheel';
import ResultDisplay from '../components/HeroPicker/ResultDisplay';
import TeamAnalysis from '../components/HeroPicker/TeamAnalysis';
import EnemyPicker from '../components/HeroPicker/EnemyPicker';
import LaneStrategy from '../components/HeroPicker/LaneStrategy';
import BuildRoulette from '../components/HeroPicker/BuildRoulette';
import StrategyBoard from '../components/HeroPicker/StrategyBoard';
import MiniGames from '../components/HeroPicker/MiniGames';
import TeamFiller from '../components/HeroPicker/TeamFiller';
import { DEADLOCK_HEROES } from '../data/heroes';
import './HeroPicker.css';
import useInputManagement from '../hooks/useInputManagement';
import useTeamAnalysis from '../hooks/useTeamAnalysis';
// import useHeroRandomizer from '../hooks/useHeroRandomizer'; // Lifted to App

const HeroPicker = ({
    isSpinning,
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
    options,
    setOptions,
    enemyTeam,
    setEnemyTeam,
    addManualResult,
    removeManualResult
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

  const analysis = useTeamAnalysis(results, enemyTeam);

  // Logic hook lifted to App.jsx defined via props now

  const onStartClick = () => {
    const users = parseList(userListText);
    const heroes = parseList(heroListText);
    const roles = parseList(roleListText);
    handleStart(users, heroes, roles);
  };

  return (
    <div className="hero-picker-container">
      <div className="main-content">
        
        {!isSpinning && results.length === 0 && (
          <React.Fragment>
            <div className="toolbar">
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
              onRemoveManual={!isSpinning ? removeManualResult : null}
            />
          </div>
        )}

        {!isSpinning && results.length > 0 && (
          <div className="strategy-section">
            
            {results.length < 6 && (
                <TeamFiller 
                    availableHeroes={availableHeroes} 
                    onAddHero={addManualResult} 
                    remainingSlots={6 - results.length} 
                />
            )}
            
            <TeamAnalysis analysis={analysis} />

            <BuildRoulette results={results} />
            
            {enemyTeam.length > 0 && (
                <div className="enemy-dependent-strategy">
                    <LaneStrategy suggestedLanes={analysis?.suggestedLanes} />
                    <StrategyBoard strategyBoardTips={analysis?.strategyBoardTips} />
                </div>
            )}
            
            <MiniGames results={results} />
            <div className="enemy-scouting">
                <h3>Enemy Scouting</h3>
                <p className="dim-text">Select heroes the enemy team picked to see counter-picks and balance tips.</p>
                <EnemyPicker enemyTeam={enemyTeam} setEnemyTeam={setEnemyTeam} />
                
                {(analysis?.counterSuggestions || []).length > 0 && (
                    <div className="counter-tips">
                        <h4>Counter-Picking Tips</h4>
                        <ul>
                            {analysis.counterSuggestions.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                )}
            </div>

            <button 
                className="new-match-btn"
                onClick={resetMatch}
            >
                NEW MATCH
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPicker;
