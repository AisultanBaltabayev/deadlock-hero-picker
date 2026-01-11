import { useMemo } from 'react';
import { LANES, DEADLOCK_HEROES } from '../data/heroes';

const useTeamAnalysis = (results, enemyTeam = []) => {
  const analysis = useMemo(() => {
    if (!results || results.length === 0) return null;

    const teamHeroes = results.map(r => typeof r.hero === 'string' ? r.hero : r.hero.name);
    const heroDetails = results.map(r => 
        typeof r.hero === 'string' ? DEADLOCK_HEROES.find(h => h.name === r.hero) : r.hero
    ).filter(Boolean);

    // 1. Synergy Detection
    const synergies = [];
    heroDetails.forEach(hero => {
      hero.synergies?.forEach(synName => {
        if (teamHeroes.includes(synName)) {
          const pair = [hero.name, synName].sort().join(' + ');
          if (!synergies.includes(pair)) {
            synergies.push(pair);
          }
        }
      });
    });

    // 2. Role Distribution
    const roleCounts = {};
    heroDetails.forEach(hero => {
      (hero.tags || []).forEach(tag => {
        roleCounts[tag] = (roleCounts[tag] || 0) + 1;
      });
    });

    // 3. Damage Type Distribution
    const damageTypes = { Weapon: 0, Spirit: 0, Hybrid: 0 };
    heroDetails.forEach(hero => {
      if (hero.damageType) damageTypes[hero.damageType]++;
    });

    // 4. Weakness Detection
    const weaknesses = [];
    if (!roleCounts['Tank']) weaknesses.push("Missing front-line (Tank)");
    if (!roleCounts['Support'] && !roleCounts['Healer']) weaknesses.push("Low team sustain (Healer/Support)");
    if (!roleCounts['Control'] && !roleCounts['CC']) weaknesses.push("Lack of Crowd Control (CC)");
    
    const totalHeroes = heroDetails.length;
    if (damageTypes.Spirit / totalHeroes > 0.7) weaknesses.push("Heavy Spirit damage bias (Easy to counter-build)");
    if (damageTypes.Weapon / totalHeroes > 0.7) weaknesses.push("Heavy Weapon damage bias (Easy to counter-build)");

    // 5. Lane Suggestions (considering enemy team if available)
    const suggestedLanes = [];
    const availableLanes = LANES.filter(lane => lane.id !== 'orange');
    
    results.forEach((res, idx) => {
        const heroName = typeof res.hero === 'string' ? res.hero : res.hero.name;
        const laneIdx = Math.floor(idx / Math.ceil(results.length / availableLanes.length));
        const laneName = availableLanes[laneIdx % availableLanes.length].name;
        
        let matchupAdvice = "";
        if (enemyTeam.length > 0) {
            const counteringEnemies = enemyTeam.filter(eName => {
                const enemyHero = DEADLOCK_HEROES.find(h => h.name === eName);
                return enemyHero?.counters?.includes(heroName);
            });
            
            if (counteringEnemies.length > 0) {
                matchupAdvice = `Play safe: ${counteringEnemies.join(', ')} can shut you down.`;
            } else {
                matchupAdvice = "Look for aggressive trades in lane.";
            }
        }

        suggestedLanes.push({
            user: res.user,
            hero: heroName,
            lane: laneName,
            priority: (idx % 2 === 0) ? "High" : "Standard",
            advice: matchupAdvice
        });
    });

    // 6. Strategy Board Tips
    const strategyBoardTips = [];
    if (enemyTeam.length > 0) {
        const enemyDamage = { Weapon: 0, Spirit: 0 };
        enemyTeam.forEach(eName => {
            const h = DEADLOCK_HEROES.find(hero => hero.name === eName);
            if (h?.damageType) enemyDamage[h.damageType]++;
        });

        if (enemyDamage.Weapon > 3) strategyBoardTips.push("Enemy heavy Weapon damage: Rush Armor/Lifesteal.");
        if (enemyDamage.Spirit > 3) strategyBoardTips.push("Enemy heavy Spirit damage: Focus on Resist/Barrier.");
        
        const hasTankyEnemies = enemyTeam.some(eName => {
            const h = DEADLOCK_HEROES.find(hero => hero.name === eName);
            return h?.roles?.includes('Tank');
        });
        if (hasTankyEnemies) strategyBoardTips.push("Tanks detected: Build Percent Health damage.");
    }

    // 7. Counter Detection & Vulnerabilities
    const counterSuggestions = [];
    const vulnerabilities = [];
    if (enemyTeam.length > 0) {
        // We counter them
        heroDetails.forEach(hero => {
            const countered = hero.counters?.filter(c => enemyTeam.includes(c));
            if (countered?.length > 0) {
                counterSuggestions.push(`${hero.name} is strong against ${countered.join(', ')}`);
            }
        });

        // They counter us (vulnerabilities)
        results.forEach(res => {
            const heroName = typeof res.hero === 'string' ? res.hero : res.hero.name;
            const enemiesCounteringMe = enemyTeam.filter(eName => {
                const enemyHero = DEADLOCK_HEROES.find(h => h.name === eName);
                return enemyHero?.counters?.includes(heroName);
            });
            if (enemiesCounteringMe.length > 0) {
                vulnerabilities.push(`${res.user} (${heroName}) is vulnerable to ${enemiesCounteringMe.join(', ')}`);
            }
        });
    }

    // 8. Challenge Analysis
    results.forEach(res => {
        const heroName = typeof res.hero === 'string' ? res.hero : res.hero.name;
        if (res.challenge && typeof res.challenge === 'string') {
            // Conflict check
            if (res.challenge.includes("Melee Only") && heroName === "Vindicta") {
                weaknesses.push(`CAUTION: ${res.user} has "Melee Only" on a Sniper (Vindicta).`);
            }
            if (res.challenge.includes("No Spirit") && heroName === "Seven") {
                 weaknesses.push(`WARNING: ${res.user} has "No Spirit Items" on a Spirit-scaling hero (Seven).`);
            }
        }
    });

    return {
      synergies,
      roleCounts,
      damageTypes,
      weaknesses,
      suggestedLanes,
      counterSuggestions,
      vulnerabilities,
      strategyBoardTips
    };
  }, [results, enemyTeam]);

  return analysis;
};

export default useTeamAnalysis;
