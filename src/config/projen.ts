import { javascript } from 'projen';

export class Projen {
  static defaultOptions = {
    defaultReleaseBranch: 'main',
    packageManager: javascript.NodePackageManager.NPM,
    projenrcTs: true,
    license: 'MIT',
    sampleCode: false,
    docgen: false,
  };
}
