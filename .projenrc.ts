import { cdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
import { NpmConfig } from './src/config/npm-config';
import { Prettier } from './src/config/prettier';
import { Projen } from './src/config/projen';

const projenDependency = 'projen@0.73.15';

const project = new cdk.JsiiProject({
  name: 'projen-modules',
  description: 'External modules for the Projen project generator',
  author: 'Ally Murray',
  authorAddress: 'allymurray88@gmail.com',
  packageName: '@ally-murray/projen-modules',
  repositoryUrl: 'git@github.com:AllyMurray/projen-modules.git',
  ...Prettier.defaultOptions,
  ...Projen.defaultOptions,
  deps: ['ts-deepmerge'],
  bundledDeps: ['ts-deepmerge'],
  devDeps: [projenDependency, 'fs-extra'],
  peerDeps: [projenDependency],
  npmAccess: NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  jsiiVersion: '5.x',
  typescriptVersion: '5.x',
});

new NpmConfig(project);

project.synth();
