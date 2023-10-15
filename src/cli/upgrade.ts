import { exec } from 'child_process';
import { projenDependency } from '../components/projen.js';

exec(`pnpm i ${projenDependency}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
