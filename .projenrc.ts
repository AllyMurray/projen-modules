import { javascript } from 'projen';
import { projenDependency } from './src/components/projen.js';
import { createTypeScriptNpmPackage } from './src/projects/npm-package.js';

const project = createTypeScriptNpmPackage({
  name: 'projen-modules',
  packageName: '@ally-murray/projen-modules',
  description: 'External modules for the Projen project generator',
  repository: 'github.com:AllyMurray/projen-modules',
  deps: ['ts-command-line-args'],
  devDeps: [
    projenDependency,
    '@types/fs-extra',
    'comment-json',
    'fs-extra',
    'glob',
    'tsup',
    'vitest',
  ],
  peerDeps: [projenDependency],
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  typescriptVersion: '5.x',
  bin: { pjc: './lib/cli/create.js', pju: './lib/cli/upgrade.js' },
  tsUpOptions: {
    entry: ['!src/scripts/**/*'],
    onSuccess: 'ts-node src/scripts/make-scripts-executable.ts',
  },
});

project.synth();
