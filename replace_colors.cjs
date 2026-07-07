const fs = require('fs');
const path = './src/App.jsx';

let content = fs.readFileSync(path, 'utf8');

const replacements = {
  'bg-slate-950': 'bg-background',
  'bg-slate-900': 'bg-surface',
  'bg-slate-850': 'bg-surface-muted', // Just in case
  'bg-slate-800': 'bg-surface-muted',
  'bg-slate-700': 'bg-surface-muted', // map 700 to muted as well
  'text-slate-100': 'text-primary',
  'text-slate-200': 'text-primary',
  'text-slate-300': 'text-secondary',
  'text-slate-400': 'text-tertiary',
  'text-slate-500': 'text-tertiary',
  'text-slate-600': 'text-tertiary',
  'border-slate-900': 'border-subtle',
  'border-slate-850': 'border-subtle',
  'border-slate-800': 'border-subtle',
  'border-slate-700': 'border-strong',
  'border-slate-600': 'border-strong',
};

// Replace word boundaries
for (const [oldClass, newClass] of Object.entries(replacements)) {
  const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
  content = content.replace(regex, newClass);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced successfully.');
