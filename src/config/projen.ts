import { NodePackageManager } from 'projen/lib/javascript';

export class Projen {
  static defaultOptions = {
    defaultReleaseBranch: 'main',
    packageManager: NodePackageManager.PNPM,
    pnpmVersion: '8',
    projenrcTs: true,
    license: 'MIT',
    sampleCode: false,
    docgen: false,
  };
}
