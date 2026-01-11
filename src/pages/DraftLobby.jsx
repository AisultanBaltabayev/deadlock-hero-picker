import React, { useState } from 'react';
import { useDraftSystem } from '../hooks/useDraftSystem';
import { DEADLOCK_HEROES, user_list } from '../data/heroes';
import { Shuffle, RotateCcw, ArrowRight, ArrowLeft, ArrowDown, Users, UserPlus } from 'lucide-react';
import './DraftLobby.css';

const DraftLobby = () => {
    const {
        isDraftStarted,
        currentStep,
        isComplete,
        bans,
        amberPicks,
        sapphirePicks,
        unavailableHeroes,
        handleHeroSelect,
        initializeDraft,
        resetDraft
    } = useDraftSystem();

    const [rosterInput, setRosterInput] = useState(user_list.trim());
    const [teamAmber, setTeamAmber] = useState([]);
    const [teamSapphire, setTeamSapphire] = useState([]);
    const [spectators, setSpectators] = useState([]);

    const handleImportPlayers = () => {
        const names = rosterInput.split(/[\n,]/).map(s => s.trim()).filter(s => s);
        // Distribute to spectators initially
        setSpectators(prev => [...prev, ...names]);
        setRosterInput('');
    };

    const handleShuffleToTeams = () => {
        const allPlayers = [...teamAmber, ...teamSapphire, ...spectators];
        if (allPlayers.length < 2) {
            alert("Need at least 2 players!");
            return;
        }
        
        // Fisher-Yates shuffle
        const shuffled = [...allPlayers];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Split active players (max 6 per team usually, but let's just split evenly)
        // If we have > 12 players, extras go to spectators?
        // Let's just split evenly for now.
        const half = Math.ceil(shuffled.length / 2);
        setTeamAmber(shuffled.slice(0, half));
        setTeamSapphire(shuffled.slice(half));
        setSpectators([]);
    };

    const moveTo = (player, fromList, setFrom, toList, setTo) => {
        setFrom(prev => prev.filter(p => p !== player));
        setTo(prev => [...prev, player]);
    };

    const handleStartDraft = () => {
        if (teamAmber.length === 0 && teamSapphire.length === 0) return;
        // Determine pick count based on larger team to ensure coverage
        const maxTeamSize = Math.max(teamAmber.length, teamSapphire.length);
        initializeDraft(maxTeamSize);
    };

    const getHeroImage = (name) => DEADLOCK_HEROES.find(h => h.name === name)?.image;

    const getActivePlayerName = () => {
        if (!currentStep || currentStep.type !== 'PICK') return null;
        if (currentStep.team === 'AMBER') return teamAmber[amberPicks.length];
        return teamSapphire[sapphirePicks.length];
    };
    const activePlayerName = getActivePlayerName();

    return (
        <div className="draft-lobby">
            {/* SETUP PHASE or DRAFT PHASE - Always show rosters now for "Spectator/Rotation" visibility */}
            
            {!isDraftStarted ? (
                 <div className="setup-panel">
                    <h3>Lobby Roster</h3>
                    <div className="input-group">
                        <textarea 
                            className={`roster-input ${spectators.length > 0 ? "roster-input-filled" :""}`}
                            placeholder="Paste names to add..."
                            value={rosterInput}
                            onChange={(e) => setRosterInput(e.target.value)}
                        />
                        <button className="add-btn" onClick={handleImportPlayers}>
                            <UserPlus size={16}/> Add
                        </button>
                    </div>
                </div>
            ) : (
                <div className="status-bar-wrapper">
                    {/* Status Bar */}
                    <div className={`status-bar ${currentStep?.team} ${currentStep?.type}`}>
                        {!isComplete ? (
                            <h2>
                                {currentStep.team} TURN TO {currentStep.type}
                                {activePlayerName && <span className="active-player-highlight"> - {activePlayerName}</span>}
                            </h2>
                        ) : (
                            <h2>DRAFT COMPLETE</h2>
                        )}
                        <button onClick={resetDraft} className="reset-draft-btn" title="Reset Draft">
                            <RotateCcw size={16}/> New Draft
                        </button>
                    </div>
                </div>
            )}

            {/* TEAMS BOARD */}
            <div className="teams-board-layout">
                {/* Team Amber */}
                <div className="team-panel amber">
                    <div className="team-header">TEAM AMBER ({teamAmber.length})</div>
                    <div className="player-list">
                        {teamAmber.map((p, i) => {
                            const isActiveObj = isDraftStarted && currentStep?.team === 'AMBER' && currentStep?.type === 'PICK' && i === amberPicks.length;
                            return (
                                <div key={`${p}-${i}`} className={`player-slot ${isActiveObj ? 'active-turn' : ''}`}>
                                    <span className="player-name">{p}</span>
                                
                                {isDraftStarted ? (
                                    <>
                                        {amberPicks[i] && (
                                            <div className="picked-hero">
                                                <img src={getHeroImage(amberPicks[i])} alt={amberPicks[i]} />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="move-controls">
                                        <button onClick={() => moveTo(p, teamAmber, setTeamAmber, teamSapphire, setTeamSapphire)} title="Move to Sapphire">
                                            <ArrowRight size={14}/>
                                        </button>
                                        <button onClick={() => moveTo(p, teamAmber, setTeamAmber, spectators, setSpectators)} title="Move to Spectators">
                                            <ArrowDown size={14}/>
                                        </button>
                                    </div>
                                )}
                            </div>
                            );
                        })}
                    </div>
                </div>

                {/* MIDDLE: Draft Grid OR Setup Controls */}
                <div className="center-panel">
                    {!isDraftStarted ? (
                        <div className="setup-controls">
                             <button className="shuffle-btn" onClick={handleShuffleToTeams}>
                                <Shuffle size={16} /> Shuffle All to Teams
                            </button>
                            <button className="start-draft-btn" onClick={handleStartDraft} disabled={teamAmber.length === 0 && teamSapphire.length === 0}>
                                START DRAFT
                            </button>
                            <div className="spectators-box">
                                <h4>Spectators / Reserve ({spectators.length})</h4>
                                <div className="spectator-list">
                                    {spectators.map((p, i) => (
                                        <div key={i} className="spectator-item">
                                            <span>{p}</span>
                                            <div className="spec-controls">
                                                <button onClick={() => moveTo(p, spectators, setSpectators, teamAmber, setTeamAmber)} title="To Amber">
                                                    <ArrowLeft size={14} color="#e67e22"/>
                                                </button>
                                                <button onClick={() => moveTo(p, spectators, setSpectators, teamSapphire, setTeamSapphire)} title="To Sapphire">
                                                    <ArrowRight size={14} color="#3498db"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                             {/* Bans */}
                             <div className="bans-stripe">
                                {bans.map((b, i) => (
                                    <div key={i} className="ban-slot" title={b}>
                                        <img src={getHeroImage(b)} alt={b} />
                                        <div className="ban-overlay">X</div>
                                    </div>
                                ))}
                            </div>

                            {/* Hero Pool */}
                            <div className="hero-pool-grid">
                                {DEADLOCK_HEROES.map(hero => {
                                    const isTaken = unavailableHeroes.includes(hero.name);
                                    return (
                                        <button 
                                            key={hero.id}
                                            className={`pool-hero-btn ${isTaken ? 'taken' : ''}`}
                                            onClick={() => handleHeroSelect(hero)}
                                            disabled={isTaken || isComplete}
                                        >
                                            <div className="pool-img-wrapper">
                                                <img src={hero.image} alt={hero.name} />
                                                {isTaken && <div className="taken-overlay" />}
                                                {bans.includes(hero.name) && <div className="ban-mark">BANNED</div>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Team Sapphire */}
                <div className="team-panel sapphire">
                    <div className="team-header">TEAM SAPPHIRE ({teamSapphire.length})</div>
                    <div className="player-list">
                        {teamSapphire.map((p, i) => {
                            const isActiveObj = isDraftStarted && currentStep?.team === 'SAPPHIRE' && currentStep?.type === 'PICK' && i === sapphirePicks.length;
                            return (
                                <div key={`${p}-${i}`} className={`player-slot ${isActiveObj ? 'active-turn' : ''}`}>
                                    {/* Left side controls for Sapphire */}
                                    {!isDraftStarted && (
                                        <div className="move-controls">
                                            <button onClick={() => moveTo(p, teamSapphire, setTeamSapphire, teamAmber, setTeamAmber)} title="Move to Amber">
                                                <ArrowLeft size={14}/>
                                            </button>
                                            <button onClick={() => moveTo(p, teamSapphire, setTeamSapphire, spectators, setSpectators)} title="Move to Spectators">
                                                <ArrowDown size={14}/>
                                            </button>
                                        </div>
                                    )}
                                    <span className="player-name" style={{textAlign:'right', flex:1}}>{p}</span>
                                
                                {isDraftStarted && amberPicks ? ( 
                                    // Bug fix: Check if we are in draft 
                                    <>
                                        {sapphirePicks[i] && (
                                            <div className="picked-hero">
                                                <img src={getHeroImage(sapphirePicks[i])} alt={sapphirePicks[i]} />
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DraftLobby;
