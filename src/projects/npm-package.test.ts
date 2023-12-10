import { TypeScriptNpmPackage } from './npm-package.js';
import { synthSnapshot } from '../utils/test/synth.js';

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

  it('should set repository url', () => {
    const project = new TypeScriptNpmPackage({
      name: 'test',
      authorName: 'Ally Murray',
      defaultReleaseBranch: 'main',
      repository: 'https://github.com/AllyMurray/comic-vine',
    });

    const output = synthSnapshot(project)['package.json'];

    expect(output.repository.url).toBe(
      'https://github.com/AllyMurray/comic-vine.git',
    );
  });

  it('should set homepage url', () => {
    const project = new TypeScriptNpmPackage({
      name: 'test',
      authorName: 'Ally Murray',
      defaultReleaseBranch: 'main',
      repository: 'https://github.com/AllyMurray/comic-vine',
    });

    const output = synthSnapshot(project)['package.json'];

    expect(output.homepage).toBe(
      'https://github.com/AllyMurray/comic-vine#readme',
    );
  });

  it('should set bugs url', () => {
    const project = new TypeScriptNpmPackage({
      name: 'test',
      authorName: 'Ally Murray',
      defaultReleaseBranch: 'main',
      repository: 'https://github.com/AllyMurray/comic-vine',
    });

    const output = synthSnapshot(project)['package.json'];

    expect(output.bugs.url).toBe(
      'https://github.com/AllyMurray/comic-vine/issues',
    );
  });
});
