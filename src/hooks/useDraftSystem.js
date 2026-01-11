import { useState, useCallback } from 'react';
import { DEADLOCK_HEROES } from '../data/heroes';

// Simplified competitive draft order (1-1-1-1...) 
// Real Dota is complex (2 ban, 2 pick, 2 ban...), let's do a balanced custom flow:
// 2 Bans each -> 2 Picks each -> 2 Bans each -> 4 Picks each?
// Let's stick to a robust standard suitable for 12 players:
// Phase 1: 1 Ban each
// Phase 2: 1 Pick each (x6)
// Total 12 picks.
// Wait, 6v6 means 12 picks total.
// To make it strategic but fast:
// Ban A, Ban B, Ban A, Ban B (4 Bans Total) -> Then Snake Pick?
// Or: Ban A, Ban B, Pick A, Pick B, Pick B, Pick A...

// Draft Logic


export const useDraftSystem = () => {
    const [draftSteps, setDraftSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [bans, setBans] = useState([]);
    const [amberPicks, setAmberPicks] = useState([]);
    const [sapphirePicks, setSapphirePicks] = useState([]);
    const [isDraftStarted, setIsDraftStarted] = useState(false);
    
    // Derived state
    const isComplete = isDraftStarted && currentStepIndex >= draftSteps.length;
    const currentStep = (isDraftStarted && !isComplete) ? draftSteps[currentStepIndex] : null;
    const unavailableHeroes = [...bans, ...amberPicks, ...sapphirePicks];

    const initializeDraft = (teamSize) => {
        // Generate Steps
        const steps = [];
        
        // 1. Ban Phase (2 bans each)
        steps.push({ type: 'BAN', team: 'AMBER' });
        steps.push({ type: 'BAN', team: 'SAPPHIRE' });
        steps.push({ type: 'BAN', team: 'AMBER' });
        steps.push({ type: 'BAN', team: 'SAPPHIRE' });

        // 2. Pick Phase (teamSize picks each)
        // Using "Snake Draft" for fairness? Or Alternating?
        // Standard Alternating: A, B, A, B...
        for (let i = 0; i < teamSize; i++) {
             steps.push({ type: 'PICK', team: 'AMBER' });
             steps.push({ type: 'PICK', team: 'SAPPHIRE' });
        }
        
        setDraftSteps(steps);
        setBans([]);
        setAmberPicks([]);
        setSapphirePicks([]);
        setCurrentStepIndex(0);
        setIsDraftStarted(true);
    };

    const handleHeroSelect = (hero) => {
        if (!isDraftStarted || isComplete) return;
        if (unavailableHeroes.includes(hero.name)) return; // Already taken

        const step = draftSteps[currentStepIndex];

        if (step.type === 'BAN') {
            setBans(prev => [...prev, hero.name]);
        } else {
            if (step.team === 'AMBER') {
                setAmberPicks(prev => [...prev, hero.name]);
            } else {
                setSapphirePicks(prev => [...prev, hero.name]);
            }
        }

        setCurrentStepIndex(prev => prev + 1);
    };

    const resetDraft = () => {
        setIsDraftStarted(false);
        setCurrentStepIndex(0);
        setBans([]);
        setAmberPicks([]);
        setSapphirePicks([]);
    };

    return {
        isDraftStarted,
        currentStepIndex,
        currentStep,
        isComplete,
        bans,
        amberPicks,
        sapphirePicks,
        unavailableHeroes,
        handleHeroSelect,
        initializeDraft,
        resetDraft,
        totalSteps: draftSteps.length
    };
};
