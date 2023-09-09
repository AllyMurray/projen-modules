import { TypeScriptProject } from 'projen/lib/typescript';

export class NpmConfig {
  constructor(project: TypeScriptProject) {
    project.npmrc.addConfig('fund', 'false');
    project.npmrc.addConfig('legacy-peer-deps', 'true');
    project.npmrc.addConfig('node-linker', 'hoisted');
    project.npmrc.addConfig('save-exact', 'true');
  }
}
