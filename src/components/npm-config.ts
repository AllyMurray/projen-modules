import { typescript } from 'projen';

export class NpmConfig {
  constructor(project: typescript.TypeScriptProject) {
    project.npmrc.addConfig('fund', 'false');
    project.npmrc.addConfig('no-bin-links', 'true');
    project.npmrc.addConfig('legacy-peer-deps', 'true');
    project.npmrc.addConfig('node-linker', 'hoisted');
    project.npmrc.addConfig('save-exact', 'true');
  }
}