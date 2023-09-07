import { synthSnapshot } from 'projen/lib/util/synth';
import { TypeScriptNpmPackage } from '../../src/projects/npm-package';

describe('TypeScriptNpmPackage', () => {
  it('synthesizes', () => {
    const project = new TypeScriptNpmPackage({
      name: 'test',
      authorName: 'Ally Murray',
      defaultReleaseBranch: 'main',
    });

    const output = synthSnapshot(project);

    expect(output).toMatchSnapshot();
  });
});
