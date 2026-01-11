export const DEADLOCK_HEROES = [
  { 
    id: 'abrams', name: 'Abrams', 
    image: 'https://deadlock.wiki/images/thumb/6/6d/Abrams_card.png/190px-Abrams_card.png', 
    tags: ['Tank', 'Melee', 'Initiator'],
    damageType: 'Weapon',
    difficulty: 1,
    counters: ['Haze', 'Vindicta', 'Wraith'],
    synergies: ['Dynamo', 'Kelvin', 'Ivy']
  },
  { 
    id: 'bebop', name: 'Bebop', 
    image: 'https://deadlock.wiki/images/thumb/4/49/Bebop_card.png/190px-Bebop_card.png', 
    tags: ['Initiator', 'Burst', 'Hook'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Grey Talon', 'Seven', 'Vindicta'],
    synergies: ['Seven', 'Dynamo', 'Lady Geist']
  },
  { 
    id: 'calico', name: 'Calico', 
    image: 'https://deadlock.wiki/images/thumb/e/e4/Calico_card.png/190px-Calico_card.png', 
    tags: ['DPS', 'Anti-Carry'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Abrams', 'Viscous', 'Mo & Krill'],
    synergies: ['Ivy', 'Kelvin', 'Dynamo']
  },
  { 
    id: 'dynamo', name: 'Dynamo', 
    image: 'https://deadlock.wiki/images/thumb/7/70/Dynamo_card.png/190px-Dynamo_card.png', 
    tags: ['Support', 'Control', 'Teamfight'],
    damageType: 'Spirit',
    difficulty: 1,
    counters: ['Abrams', 'Shiv', 'Lash'],
    synergies: ['Seven', 'Bebop', 'Haze']
  },
  { 
    id: 'grey_talon', name: 'Grey Talon', 
    image: 'https://deadlock.wiki/images/thumb/5/5a/Grey_Talon_card.png/190px-Grey_Talon_card.png', 
    tags: ['Carry', 'Range', 'Spirit'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Bebop', 'Mo & Krill', 'Viscous'],
    synergies: ['Ivy', 'Dynamo', 'Kelvin']
  },
  { 
    id: 'infernus', name: 'Infernus', 
    image: 'https://deadlock.wiki/images/thumb/6/6b/Infernus_card.png/190px-Infernus_card.png', 
    tags: ['DPS', 'DoT', 'Spirit'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Abrams', 'Viscous', 'Kelvin'],
    synergies: ['Ivy', 'Dynamo', 'Lash']
  },
  { 
    id: 'ivy', name: 'Ivy', 
    image: 'https://deadlock.wiki/images/thumb/2/2c/Ivy_card.png/190px-Ivy_card.png', 
    tags: ['Support', 'Utility', 'Flying'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Abrams', 'Shiv', 'Lash'],
    synergies: ['Seven', 'Bebop', 'Abrams']
  },
  { 
    id: 'kelvin', name: 'Kelvin', 
    image: 'https://deadlock.wiki/images/thumb/7/76/Kelvin_card.png/190px-Kelvin_card.png', 
    tags: ['Support', 'Control', 'Slow'],
    damageType: 'Spirit',
    difficulty: 1,
    counters: ['Abrams', 'Shiv', 'Infernus'],
    synergies: ['Seven', 'Lady Geist', 'Abrams']
  },
  { 
    id: 'lady_geist', name: 'Lady Geist', 
    image: 'https://deadlock.wiki/images/thumb/e/e8/Lady_Geist_card.png/190px-Lady_Geist_card.png', 
    tags: ['Carry', 'Sustain', 'Burst'],
    damageType: 'Hybrid',
    difficulty: 3,
    counters: ['Shiv', 'Abrams', 'Bebop'],
    synergies: ['Kelvin', 'Ivy', 'Dynamo']
  },
  { 
    id: 'lash', name: 'Lash', 
    image: 'https://deadlock.wiki/images/thumb/5/5a/Lash_card.png/190px-Lash_card.png', 
    tags: ['Mobility', 'Initiator', 'Spirit'],
    damageType: 'Spirit',
    difficulty: 3,
    counters: ['Grey Talon', 'Vindicta', 'McGinnis'],
    synergies: ['Ivy', 'Viscous', 'Kelvin']
  },
  { 
    id: 'mcginnis', name: 'McGinnis', 
    image: 'https://deadlock.wiki/images/thumb/5/55/McGinnis_card.png/190px-McGinnis_card.png', 
    tags: ['Defense', 'Turret', 'Push'],
    damageType: 'Weapon',
    difficulty: 1,
    counters: ['Abrams', 'Shiv', 'Viscous'],
    synergies: ['Kelvin', 'Warden', 'Ivy']
  },
  { 
    id: 'mo_and_krill', name: 'Mo & Krill', 
    image: 'https://deadlock.wiki/images/thumb/a/a1/Mo_%26_Krill_card.png/190px-Mo_%26_Krill_card.png', 
    tags: ['Tank', 'Control', 'Burrow'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Abrams', 'Haze', 'Seven'],
    synergies: ['Lady Geist', 'Seven', 'Ivy']
  },
  { 
    id: 'paradox', name: 'Paradox', 
    image: 'https://deadlock.wiki/images/thumb/0/08/Paradox_card.png/190px-Paradox_card.png', 
    tags: ['Utility', 'Swap', 'Burst'],
    damageType: 'Hybrid',
    difficulty: 3,
    counters: ['Grey Talon', 'Vindicta', 'Wraith'],
    synergies: ['Ivy', 'Seven', 'Dynamo']
  },
  { 
    id: 'pocket', name: 'Pocket', 
    image: 'https://deadlock.wiki/images/thumb/0/06/Pocket_card.png/190px-Pocket_card.png', 
    tags: ['Burst', 'Mobility', 'Spirit'],
    damageType: 'Spirit',
    difficulty: 3,
    counters: ['Abrams', 'McGinnis', 'Viscous'],
    synergies: ['Lash', 'Ivy', 'Viscous']
  },
  { 
    id: 'seven', name: 'Seven', 
    image: 'https://deadlock.wiki/images/thumb/c/cf/Seven_card.png/190px-Seven_card.png', 
    tags: ['Carry', 'AoE', 'Spirit'],
    damageType: 'Spirit',
    difficulty: 1,
    counters: ['Abrams', 'Mo & Krill', 'Viscous'],
    synergies: ['Dynamo', 'Bebop', 'Ivy']
  },
  { 
    id: 'shiv', name: 'Shiv', 
    image: 'https://deadlock.wiki/images/thumb/b/b8/Shiv_card.png/190px-Shiv_card.png', 
    tags: ['Brawler', 'Bleed', 'Mobility'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Lady Geist', 'McGinnis', 'Ivy'],
    synergies: ['Infernus', 'Abrams', 'Ivy']
  },
  { 
    id: 'vindicta', name: 'Vindicta', 
    image: 'https://deadlock.wiki/images/thumb/6/69/Vindicta_card.png/190px-Vindicta_card.png', 
    tags: ['Carry', 'Sniper', 'Pick'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Abrams', 'Seven', 'Yamato'],
    synergies: ['Grey Talon', 'Wraith', 'Ivy']
  },
  { 
    id: 'viscous', name: 'Viscous', 
    image: 'https://deadlock.wiki/images/thumb/5/53/Viscous_card.png/190px-Viscous_card.png', 
    tags: ['Tank', 'Support', 'Goo'],
    damageType: 'Spirit',
    difficulty: 3,
    counters: ['Abrams', 'Shiv', 'Lash'],
    synergies: ['Seven', 'Lady Geist', 'Ivy']
  },
  { 
    id: 'vyper', name: 'Vyper', 
    image: 'https://deadlock.wiki/images/thumb/b/bd/Vyper_card.png/190px-Vyper_card.png', 
    tags: ['Control', 'Tank', 'Poison'],
    damageType: 'Hybrid',
    difficulty: 2,
    counters: ['Abrams', 'Viscous', 'Haze'],
    synergies: ['Dynamo', 'Warden', 'Ivy']
  },
  { 
    id: 'warden', name: 'Warden', 
    image: 'https://deadlock.wiki/images/thumb/1/10/Warden_card.png/190px-Warden_card.png', 
    tags: ['Brawler', 'Control', 'Tank'],
    damageType: 'Weapon',
    difficulty: 1,
    counters: ['Abrams', 'McGinnis', 'Viscous'],
    synergies: ['Kelvin', 'McGinnis', 'Ivy']
  },
  { 
    id: 'wraith', name: 'Wraith', 
    image: 'https://deadlock.wiki/images/thumb/8/85/Wraith_card.png/190px-Wraith_card.png', 
    tags: ['Carry', 'DPS', 'Mobility'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Abrams', 'Bebop', 'Seven'],
    synergies: ['Grey Talon', 'Vindicta', 'Ivy']
  },
  { 
    id: 'yamato', name: 'Yamato', 
    image: 'https://deadlock.wiki/images/thumb/2/2b/Yamato_card.png/190px-Yamato_card.png', 
    tags: ['Carry', 'Melee', 'Spirit'],
    damageType: 'Hybrid',
    difficulty: 3,
    counters: ['Shiv', 'McGinnis', 'Infernus'],
    synergies: ['Lash', 'Ivy', 'Viscous']
  },
  { 
    id: 'mirage', name: 'Mirage', 
    image: 'https://deadlock.wiki/images/thumb/7/77/Mirage_card.png/190px-Mirage_card.png', 
    tags: ['Utility', 'Roam', 'CC'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Wraith', 'Haze', 'McGinnis'],
    synergies: ['Abrams', 'Ivy', 'Seven']
  },
  { 
    id: 'haze', name: 'Haze', 
    image: 'https://deadlock.wiki/images/thumb/1/1b/Haze_card.png/190px-Haze_card.png', 
    tags: ['Assassin', 'Stealth', 'DPS'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Seven', 'Vindicta', 'Grey Talon'],
    synergies: ['Dynamo', 'Ivy', 'Kelvin']
  },
  { 
    id: 'holliday', name: 'Holliday', 
    image: 'https://deadlock.wiki/images/thumb/1/10/Holliday_card.png/190px-Holliday_card.png', 
    tags: ['Carry', 'Explosive'],
    damageType: 'Weapon',
    difficulty: 1,
    counters: ['Abrams', 'Shiv', 'McGinnis'],
    synergies: ['Kelvin', 'Dynamo', 'Ivy']
  },
  { 
    id: 'doorman', name: 'The Doorman', 
    image: 'https://deadlock.wiki/images/thumb/6/6f/The_Doorman_card.png/190px-The_Doorman_card.png', 
    tags: ['Control', 'Spirit', 'Utility'],
    damageType: 'Spirit',
    difficulty: 3,
    counters: ['Lash', 'Wraith', 'Haze'],
    synergies: ['Dynamo', 'Ivy', 'Kelvin']
  },
  { 
    id: 'mina', name: 'Mina', 
    image: 'https://deadlock.wiki/images/thumb/a/a5/Mina_card.png/190px-Mina_card.png', 
    tags: ['Assassin', 'Burst', 'Spirit'],
    damageType: 'Spirit',
    difficulty: 3,
    counters: ['Abrams', 'Viscous', 'Billy'],
    synergies: ['Dynamo', 'Ivy', 'Warden']
  },
  { 
    id: 'victor', name: 'Victor', 
    image: 'https://deadlock.wiki/images/thumb/3/3d/Victor_card.png/190px-Victor_card.png', 
    tags: ['Tank', 'Brawler', 'Sustain'],
    damageType: 'Spirit',
    difficulty: 1,
    counters: ['Grey Talon', 'Vindicta', 'Paige'],
    synergies: ['Kelvin', 'Ivy', 'Dynamo']
  },
  { 
    id: 'paige', name: 'Paige', 
    image: 'https://deadlock.wiki/images/thumb/b/b0/Paige_card.png/190px-Paige_card.png', 
    tags: ['Support', 'Utility', 'Healer'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Lash', 'Haze', 'Mina'],
    synergies: ['Abrams', 'Seven', 'Victor']
  },
  { 
    id: 'drifter', name: 'Drifter', 
    image: 'https://deadlock.wiki/images/thumb/4/4d/Drifter_card.png/190px-Drifter_card.png', 
    tags: ['Assassin', 'Mobility', 'Burst'],
    damageType: 'Weapon',
    difficulty: 2,
    counters: ['Abrams', 'Viscous', 'Victor'],
    synergies: ['Lash', 'Ivy', 'Viscous']
  },
  { 
    id: 'billy', name: 'Billy', 
    image: 'https://deadlock.wiki/images/thumb/e/e5/Billy_card.png/190px-Billy_card.png', 
    tags: ['Tank', 'Control', 'Melee'],
    damageType: 'Spirit',
    difficulty: 2,
    counters: ['Grey Talon', 'Vindicta', 'Drifter'],
    synergies: ['Seven', 'Dynamo', 'Lady Geist']
  },
  { 
    id: 'sinclair', name: 'Sinclair', 
    image: 'https://deadlock.wiki/images/thumb/4/41/Sinclair_card.png/190px-Sinclair_card.png', 
    tags: ['Control', 'Spirit', 'Utility', 'Mobility'],
    damageType: 'Spirit',
    difficulty: 3,
    counters: ['Abrams', 'Shiv', 'Kelvin'],
    synergies: ['Ivy', 'Dynamo', 'Lady Geist']
  },
];

export const LANES = [
  { id: 'yellow', name: 'Yellow Lane', color: '#f1c40f' },
  { id: 'blue', name: 'Blue Lane', color: '#3498db' },
  { id: 'purple', name: 'Purple Lane', color: '#9b59b6' },
];

export const CHALLENGES = [
  "Melee Only",
  "No Spirit Items",
  "Glass Cannon (No Health Items)",
  "Support Builds Only",
  "Active Items Only",
  "No Active Items",
  "Speed Demon (Move Speed Focus)",
  "Ability Haste Maxing",
  "Right Click Only",
  "Pacifist (Focus Objectives)",
  "No Healing Items",
  "Spirit Bullets Only",
  "Teleport Only (Ivy/Paradox focus)",
  "Breech Everything",
  "Stamina God (Focus on Extra Stamina)",
  "Debuff Master (Restrict to Debuff items)",
  "Wall-Jump God (Must wall-jump before every kill)",
  "Slide-Only (Always sliding in lane)",
  "No Ultimate Allowed",
  "Golden Idol Focus (Loot everything)"
];

export const ITEM_BUILDS = {
  abrams: [
    { name: "Punch Man", items: ["Melee Lifesteal", "Spirit Strike", "Lifestrike"], type: "Weapon" },
    { name: "Unkillable", items: ["Restorative Locket", "Healbane", "Reactive Barrier"], type: "Tank" }
  ],
  seven: [
    { name: "Ultimate nuke", items: ["Superior Duration", "Superior Range", "Spirit Power"], type: "Spirit" }
  ],
  holliday: [
    { name: "Explosive Bullets", items: ["Headshot Booster", "High Velocity Mag", "Long Range"], type: "Weapon" }
  ]
};

export const HEROES = DEADLOCK_HEROES.map(h => h.name);

export const hero_list = DEADLOCK_HEROES.map(h => h.name).join('\n');

export const user_list = `
Ice
Baya
Simon
Erna
Jasik
`;
