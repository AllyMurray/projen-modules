import fs from 'fs';
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
  gitignore: ['.DS_Store'],
});

new NpmConfig(project);

// tsconfig is ignored by git but we copy the dev file so vscode can use it
const tsconfig = fs
  .readFileSync('tsconfig.dev.json', 'utf8')
  .split('\n')
  .slice(1)
  .join('\n');
fs.writeFileSync('tsconfig.json', tsconfig);

project.synth();
