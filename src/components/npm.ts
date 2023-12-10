import { typescript } from 'projen';

export const NodeVersion: Readonly<string> = '20.10.0';

export class NpmConfig {
  constructor(project: typescript.TypeScriptProject) {
    project.npmrc.addConfig('fund', 'false');
    project.npmrc.addConfig('legacy-peer-deps', 'true');
    project.npmrc.addConfig('no-bin-links', 'true');
    project.npmrc.addConfig('node-linker', 'hoisted');
    project.npmrc.addConfig('save-exact', 'true');
  }
}
