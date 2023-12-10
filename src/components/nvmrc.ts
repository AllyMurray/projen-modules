import { typescript, TextFile } from 'projen';
import { NodeVersion } from './npm.js';

export class Nvm {
  constructor(project: typescript.TypeScriptProject) {
    new TextFile(project, '.nvmrc', { lines: [`v${NodeVersion}`] });
    project.npmignore?.addPatterns('.nvmrc');
  }
}
