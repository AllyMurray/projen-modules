import { TypeScriptProject } from 'projen/lib/typescript';

export class NpmConfig {
  constructor(project: TypeScriptProject) {
    project.npmrc.addConfig('save-exact', 'true');
  }
}
