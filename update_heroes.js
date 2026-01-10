const crypto = require('crypto');

const heroes = [
  "Abrams", "Bebop", "Billy", "Calico", "The Doorman", "Drifter", "Dynamo", 
  "Grey Talon", "Haze", "Holliday", "Infernus", "Ivy", "Kelvin", "Lady Geist", 
  "Lash", "McGinnis", "Mina", "Mirage", "Mo & Krill", "Paige", "Paradox", 
  "Pocket", "Seven", "Shiv", "Sinclair", "Victor", "Vindicta", "Viscous", 
  "Vyper", "Warden", "Wraith", "Yamato"
];

const generateUrl = (name) => {
  const filename = name.replace(/ /g, '_') + '_card.png';
  const hash = crypto.createHash('md5').update(filename).digest('hex');
  const a = hash.substring(0, 1);
  const ab = hash.substring(0, 2);
  // Using 300px for better quality, user example was 190px.
  // URL: https://deadlock.wiki/images/thumb/[a]/[ab]/[Filename]/[Size]-[Filename]
  return `https://deadlock.wiki/images/thumb/${a}/${ab}/${filename}/300px-${filename}`;
};

const deadlockHeroes = heroes.map(name => {
  const id = name.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and');
  return {
    id: id,
    name: name,
    image: generateUrl(name)
  };
});

const fileContent = `export const DEADLOCK_HEROES = ${JSON.stringify(deadlockHeroes, null, 2)};

export const HEROES = ${JSON.stringify(heroes)};

export const hero_list = \`
${heroes.join('\n')}
\`;

export const user_list = \`
Ice
Baya
Simon
Erna
Jasik
\`;
`;

const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'src', 'data', 'heroes.js');
fs.writeFileSync(outputPath, fileContent);
console.log('Successfully updated src/data/heroes.js');
