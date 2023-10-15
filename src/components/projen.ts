import { javascript } from 'projen';

export const projenDependency = 'projen@0.73.30';

export class Projen {
  static defaultOptions = {
    defaultReleaseBranch: 'main',
    packageManager: javascript.NodePackageManager.PNPM,
    pnpmVersion: '8',
    projenrcTs: true,
    license: 'MIT',
    sampleCode: false,
    docgen: false,
  };
}
