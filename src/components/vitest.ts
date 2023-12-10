import { type UserConfigExport } from 'vitest/config';
import { Component } from './component.js';
import { SourceCode } from './source-code.js';
import type { TypeScriptNpmPackage } from '../projects/npm-package.js';
import { merge } from '../utils/merge.js';

export type VitestOptions = UserConfigExport;

export function defaultVitestOptions(): VitestOptions {
  return {
    test: {
      clearMocks: true,
      coverage: {
        provider: 'v8',
        reporter: ['cobertura', 'text', 'html', 'clover', 'json'],
        // '100': true,
        thresholds: {
          lines: 89,
          functions: 88,
          branches: 87,
          statements: 89,
        },
        exclude: [
          'src/utils/test',
          '.projenrc.ts',
          'src/cli',
          'src/scripts',
          'lib',
        ],
      },
      exclude: ['.cache', '.git', '.idea', 'dist', 'lib', 'node_modules'],
      globals: true,
      silent: true,
      watch: false,
    },
  };
}

export class Vitest extends Component {
  options: VitestOptions;

  constructor(project: TypeScriptNpmPackage, options: VitestOptions = {}) {
    super(project);
    this.options = merge(defaultVitestOptions(), options);
    this.addNpmPackages();
    this.setTestTasks();
    this.project.npmignore?.addPatterns('vitest.config.ts');
  }

  private addNpmPackages() {
    this.project.addDevDeps('vitest', '@vitest/coverage-v8');
  }

  private setTestTasks() {
    const testCommand = 'vitest --dir=src --coverage';
    this.project.testTask.prependExec(testCommand, {
      receiveArgs: true,
    });
    this.project.addTask('test:watch', { exec: `${testCommand} --watch` });
  }

  preSynthesize(): void {
    new SourceCode(this.project, 'vitest.config.ts', {
      codeBlock: `
        import { defineConfig } from 'vitest/config';

        export default defineConfig(
          ${JSON.stringify(this.options, undefined, 2)
            .split('\n')
            .map((line) => `  ${line}`)
            .join('\n')}
        );
      `,
    });
  }
}
