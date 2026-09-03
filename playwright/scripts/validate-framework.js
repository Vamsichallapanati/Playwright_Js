import fs from 'node:fs';

const required = ['config', 'test-data', 'utils'];
const missing = required.filter((entry) => !fs.existsSync(entry));

if (missing.length) {
  console.error('Missing framework folders: ' + missing.join(', '));
  process.exit(1);
}

console.log('Framework scaffold validation passed.');