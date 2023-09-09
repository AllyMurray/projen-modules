import { readFileSync, writeFileSync } from 'fs';

// tsconfig is ignored by git but we copy the dev file so vscode can use it
const tsconfig = readFileSync('tsconfig.dev.json', 'utf8')
  .split('\n')
  .slice(1)
  .join('\n');

writeFileSync('tsconfig.json', tsconfig);
