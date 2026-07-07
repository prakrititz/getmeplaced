const fs = require('fs');
const path = './src/App.jsx';

let content = fs.readFileSync(path, 'utf8');

// The colors we want to map
const colors = 'indigo|emerald|amber|rose|sky|red|yellow|green|blue|slate';

const patterns = [
  { regex: new RegExp(`\\btext-(${colors})-300\\b`, 'g'), replacement: 'text-$1-600 dark:text-$1-300' },
  { regex: new RegExp(`\\btext-(${colors})-400\\b`, 'g'), replacement: 'text-$1-600 dark:text-$1-400' },
  { regex: new RegExp(`\\bbg-(${colors})-900\\b`, 'g'), replacement: 'bg-$1-100 dark:bg-$1-900' },
  { regex: new RegExp(`\\bbg-(${colors})-950\\b`, 'g'), replacement: 'bg-$1-50 dark:bg-$1-950' },
  { regex: new RegExp(`\\bborder-(${colors})-900\\b`, 'g'), replacement: 'border-$1-200 dark:border-$1-900' }
];

for (const { regex, replacement } of patterns) {
  content = content.replace(regex, replacement);
}

// Ensure we don't accidentally get duplicate "dark:dark:..." or "text-indigo-600 dark:text-indigo-600 dark:text-indigo-300" 
// if script is run multiple times by cleaning it up if it happens.
// Actually since we just match standard boundary, it might match if we run twice but let's assume it runs once.

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed highlight colors successfully.');
