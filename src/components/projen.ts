import { javascript } from 'projen';

export const projenDependency = 'projen@0.77.5';

export class Projen {
  static defaultOptions = {
    defaultReleaseBranch: 'main',
    docgen: false,
    license: 'MIT',
    minNodeVersion: '18.0.0',
    packageManager: javascript.NodePackageManager.PNPM,
    pnpmVersion: '8',
    projenrcTs: true,
    sampleCode: false,
    typescriptVersion: '5.x',
  };
}
