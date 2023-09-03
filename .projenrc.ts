import { cdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
import { Prettier } from './src/config/prettier';
import { Projen } from './src/config/projen';

const projenDependency = 'projen@0.73.6';

const project = new cdk.JsiiProject({
  name: 'projen-modules',
  description: 'External modules for the Projen project generator',
  author: 'Ally Murray',
  authorAddress: 'allymurray88@gmail.com',
  packageName: '@ally-murray/projen-modules',
  repositoryUrl: 'git@github.com:AllyMurray/projen-modules.git',
  ...Prettier.defaultOptions,
  ...Projen.defaultOptions,
  devDeps: [projenDependency],
  peerDeps: [projenDependency],
  npmAccess: NpmAccess.PUBLIC,
});

project.synth();
