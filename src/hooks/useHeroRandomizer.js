import { useState, useEffect } from 'react';
import { DEADLOCK_HEROES, LANES, CHALLENGES } from '../data/heroes';

const useHeroRandomizer = () => {
  // App State
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Logic State
  const [queue, setQueue] = useState([]);
  const [results, setResults] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);
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
  
  // V3 Logic State
  const [laneDeck, setLaneDeck] = useState([]);
  
  // V3 Options
  const [options, setOptions] = useState({
    enableLanes: false,
    enableChallenges: false,
    enableBalanced: false
  });

  // Save history on change
  useEffect(() => {
    localStorage.setItem('deadlock_picker_history', JSON.stringify(history));
  }, [history]);

  // Helper to resolve hero name to object (if using custom list) or get Image
  const resolveHero = (name) => {
    const known = DEADLOCK_HEROES.find(h => h.name.toLowerCase() === name.toLowerCase());
    return known || { name: name, image: null };
  };

  // Helper for Weighted Role Selection
  const selectWeightedRole = (roles) => {
    // Check if we have the standard Core/Support mix
    const hasCore = roles.some(r => r.toLowerCase() === 'core');
    const hasSupport = roles.some(r => r.toLowerCase() === 'support');

    if (hasCore && hasSupport && roles.length === 2) {
      // Apply 70/30 logic
      const roll = Math.random();
      const isCore = roll < 0.7;
      let pickedBase = isCore ? 'Core' : 'Support';
      let chance = isCore ? 70 : 30; // 70% chance for Core, 30% for Support
      
      // Case sensitive match from list(prefer capital Core/Support if present)
      const exactMatch = roles.find(r => r.toLowerCase() === pickedBase.toLowerCase());
      return { role: exactMatch || pickedBase, chance };
    }
    
    // Default uniform
    const chance = Math.round(100 / roles.length);
    return { 
        role: roles[Math.floor(Math.random() * roles.length)],
        chance 
    };
  };

  const processRoleSubtype = (roleBase) => {
      let roleName = roleBase.role;
      if (roleName.toLowerCase() === 'core') {
        const subtypes = ['Spirit', 'Gun'];
        const subtype = subtypes[Math.floor(Math.random() * subtypes.length)];
        return { name: `Core (${subtype})`, chance: roleBase.chance };
      }
      return { name: roleName, chance: roleBase.chance };
  };

  const handleStart = (userList, heroList, roleList) => {
    let heroes = [];
    
    if (heroList.length > 0) {
      // Resolve custom names to objects if possible
      heroes = heroList.map(name => resolveHero(name));
    } else {
      alert("Please define the Hero Pool!");
      return;
    }

    if (userList.length === 0) {
      alert("Please add at least one player!");
      return;
    }

    const roles = [...roleList];
    if (roles.length === 0) {
      roles.push("Core", "Support"); 
    }

    setAvailableHeroes([...heroes]);
    setAvailableRoles([...roles]);
    setQueue([...userList]);
    setResults([]);
    
    // V3: Initialize Lanes
    if (options.enableLanes) {
        // Standard distribution for 6 players: 1-1-2-2
        // For other counts, fill sequentially
        let deck = [];
        const baseLanes = LANES.map(l => l.name); // Yellow, Blue, Purple
        
        // Distribution logic
        // 4 lanes. Users N.
        // If 6 users: 2 lanes get 2, 2 lanes get 1.
        // Let's create a pool: Y, O, B, P, Y, O (example)
        // Better: Round robin fill.
        for (let i = 0; i < userList.length; i++) {
            deck.push(baseLanes[i % baseLanes.length]);
        }
        // Shuffle the deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        setLaneDeck(deck);
    }
    
    // Start
    setIsSpinning(true);
    setCurrentUser(userList[0]);
  };

  const handleSpinResult = (pickedHero) => {
    let pickedBase = selectWeightedRole(availableRoles);
    let finalRoleObj = processRoleSubtype(pickedBase);

    // V3: Assign Lane & Challenge
    let assignedLane = null;
    if (options.enableLanes && laneDeck.length > 0) {
        assignedLane = laneDeck[0];
        setLaneDeck(prev => prev.slice(1));
    }

    let assignedChallenge = null;
    if (options.enableChallenges) {
        assignedChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    }

    // Add result
    const newResult = { 
        user: currentUser, 
        hero: pickedHero, 
        role: finalRoleObj.name, 
        roleChance: finalRoleObj.chance,
        lane: assignedLane,
        challenge: assignedChallenge
    };
    setResults(prev => [...prev, newResult]);

    // Remove hero from available (No Duplicates rule)
    setAvailableHeroes(prev => {
        let nextPool = prev.filter(h => h && h.name !== pickedHero?.name);

        // V3 Balanced Logic: Rig the pool for the final players if needed
        if (options.enableBalanced && queue.length <= 2) { 
           // If we are down to last 1 or 2 players, check composition
           // Current team: results + newResult
           const currentTeam = [...results, newResult];
           
           // Check for frontline presence
           const hasTank = currentTeam.some(r => r.hero?.tags && (r.hero.tags.includes('Tank') || r.hero.tags.includes('Initiator')));

           // If missing Tank/Initiator and we are at last pick, FORCE it
           if (!hasTank && queue.length === 2) { // 2 because queue still has current user, so len 2 means 1 left after this
               const tanks = nextPool.filter(h => h && h.tags && (h.tags.includes('Tank') || h.tags.includes('Initiator')));
               if (tanks.length > 0) return tanks;
           }
           
           // If missing Support and we are at last pick (and tank is fine or prioritized)
           // Simple logic: Prioritize Tank first.
        }
        return nextPool;
    });

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

  const [rerollingIds, setRerollingIds] = useState([]);

  // ... (previous code)

  const handleRerollHero = (userToReroll) => {
    const currentResult = results.find(r => r.user === userToReroll);
    if (!currentResult) return;

    if (availableHeroes.length === 0) {
      alert("No heroes left to re-roll into!");
      return;
    }

    // 1. Mark as rerolling (starts exit animation)
    setRerollingIds(prev => [...prev, userToReroll]);

    const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    const oldHero = currentResult.hero;

    // 2. Modify Pool Immediately (so it's reserved/swapped)
    const newPool = availableHeroes.filter(h => h.name !== randomHero.name);
    setAvailableHeroes([...newPool, oldHero]);

    // 3. Wait for exit animation, then update results
    setTimeout(() => {
        setResults(prevResults => {
            const updatable = prevResults.map(r => 
                r.user === userToReroll ? { ...r, hero: randomHero } : r
            );
            
            // Sync History inside the timeout to match the result update
            setHistory(prevHist => {
                if (prevHist.length === 0) return prevHist;
                const newHistory = [...prevHist];
                newHistory[0] = { ...newHistory[0], results: updatable };
                return newHistory;
            });

            return updatable;
        });
        
        // 4. Unmark rerolling (starts enter animation)
        setRerollingIds(prev => prev.filter(id => id !== userToReroll));
    }, 600); // 600ms delay for smooth transition
  };

  const handleRerollRole = (userToReroll) => {
    if (availableRoles.length === 0) return;

    setRerollingIds(prev => [...prev, userToReroll]);

    let pickedBase = selectWeightedRole(availableRoles);
    let finalRoleObj = processRoleSubtype(pickedBase);

    setTimeout(() => {
        setResults(prevResults => {
             const updatable = prevResults.map(r => 
                r.user === userToReroll ? { ...r, role: finalRoleObj.name, roleChance: finalRoleObj.chance } : r
            );

            setHistory(prevHist => {
                if (prevHist.length === 0) return prevHist;
                const newHistory = [...prevHist];
                newHistory[0] = { ...newHistory[0], results: updatable };
                return newHistory;
            });
            return updatable;
        });
        setRerollingIds(prev => prev.filter(id => id !== userToReroll));
    }, 600);
  };

  const handleRerollBoth = (userToReroll) => {
    const currentResult = results.find(r => r.user === userToReroll);
    if (!currentResult) return;

    if (availableHeroes.length === 0) {
      alert("No heroes left to re-roll into!");
      return;
    }

    setRerollingIds(prev => [...prev, userToReroll]);

    const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    const oldHero = currentResult.hero;
    
    // Role selection
    let newRole = currentResult.role;
    let newChance = currentResult.roleChance;
    if (availableRoles.length > 0) {
        let pickedBase = selectWeightedRole(availableRoles);
        let finalRoleObj = processRoleSubtype(pickedBase);
        newRole = finalRoleObj.name;
        newChance = finalRoleObj.chance;
    }

    // Update Pool
    const newPool = availableHeroes.filter(h => h.name !== randomHero.name);
    setAvailableHeroes([...newPool, oldHero]);

    setTimeout(() => {
        setResults(prevResults => {
            const updatable = prevResults.map(r => 
                r.user === userToReroll ? { ...r, hero: randomHero, role: newRole, roleChance: newChance } : r
            );

            setHistory(prevHist => {
                if (prevHist.length === 0) return prevHist;
                const newHistory = [...prevHist];
                newHistory[0] = { ...newHistory[0], results: updatable };
                return newHistory;
            });
            return updatable;
        });
        setRerollingIds(prev => prev.filter(id => id !== userToReroll));
    }, 600);
  };

  const addManualResult = (hero) => {
    if (results.length >= 6) return;
    
    // Create a deterministic unique ID for manual players to avoid key collisions
    const manualUser = `Player ${results.length + 1} (Manual)`;

    const newResult = {
      user: manualUser,
      hero: hero,
      role: "Manual Pick",
      roleChance: 100,
      lane: null,
      challenge: null,
      isManual: true,
      manualId: Date.now() // Unique ID for removal
    };
    
    setResults(prev => {
        const updatable = [...prev, newResult];
        setHistory(prevHist => {
            if (prevHist.length === 0) return prevHist;
            const newHistory = [...prevHist];
            newHistory[0] = { ...newHistory[0], results: updatable };
            return newHistory;
        });
        return updatable;
    });

    setAvailableHeroes(prev => prev.filter(h => h && h.name !== hero.name));
  };

  const removeManualResult = (manualId) => {
    const toRemove = results.find(r => r.manualId === manualId);
    if (!toRemove) return;

    setResults(prev => {
        const filtered = prev.filter(r => r.manualId !== manualId);
        
        // Return hero to pool
        setAvailableHeroes(pool => {
            const alreadyIn = pool.some(h => h && h.name === toRemove.hero.name);
            if (alreadyIn) return pool;
            return [...pool, toRemove.hero].sort((a, b) => a.name.localeCompare(b.name));
        });

        // Sync history
        setHistory(prevHist => {
            if (prevHist.length === 0) return prevHist;
            const newHistory = [...prevHist];
            newHistory[0] = { ...newHistory[0], results: filtered };
            return newHistory;
        });

        return filtered;
    });
  };

  const resetMatch = () => {
    setResults([]);
  };

  const updateMatchStatus = (timestamp, status) => {
    setHistory(prev => prev.map(match => 
      match.timestamp === timestamp ? { ...match, status } : match
    ));
  };

  const getMatchById = (timestamp) => {
    return history.find(m => m.timestamp.toString() === timestamp.toString());
  };

  return {
    isSpinning,
    history,
    results,
    currentUser,
    availableHeroes,
    handleStart,
    handleSpinResult,
    handleRerollHero,
    handleRerollRole,
    handleRerollBoth,
    options,
    setOptions,
    rerollingIds,
    resetMatch,
    updateMatchStatus,
    getMatchById,
    enemyTeam,
    setEnemyTeam,
    addManualResult,
    removeManualResult
  };
};

export default useHeroRandomizer;
