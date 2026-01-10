import { useState, useEffect } from 'react';
import { DEADLOCK_HEROES } from '../data/heroes';

const useHeroRandomizer = () => {
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
    
    // Start
    setIsSpinning(true);
    setCurrentUser(userList[0]);
  };

  const handleSpinResult = (pickedHero) => {
    let pickedBase = selectWeightedRole(availableRoles);
    let finalRoleObj = processRoleSubtype(pickedBase);

    // Add result
    const newResult = { 
        user: currentUser, 
        hero: pickedHero, 
        role: finalRoleObj.name, 
        roleChance: finalRoleObj.chance 
    };
    setResults(prev => [...prev, newResult]);

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

  const resetMatch = () => {
    setResults([]);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
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
    updateMatchStatus,
    getMatchById
  };
};

export default useHeroRandomizer;
