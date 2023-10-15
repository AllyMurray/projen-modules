import { type Options } from 'tsup';
import { Component } from './component.js';
import { SourceCode } from './source-code.js';
import type { TypeScriptNpmPackage } from '../projects/npm-package.js';
import { merge } from '../utils/merge.js';

export type TsUpOptions = Options;

export function legacyEntryPoints() {
  return {
    // CJS fall-back for older versions of Node.js
    entrypoint: 'lib/index.cjs',
    // Fall-back for older versions of TypeScript
    entrypointTypes: 'lib/index.d.cts',
  };
}

function defaultTsUpOptions(): TsUpOptions {
  return {
    bundle: false,
    clean: true,
    dts: true,
    entry: ['src/**/*.ts'],
    format: ['cjs', 'esm'],
    minify: false,
    outDir: 'lib',
    shims: true,
    sourcemap: true,
    splitting: false,
  };
}

export class TsUp extends Component {
  options: TsUpOptions;

  constructor(project: TypeScriptNpmPackage, options?: TsUpOptions) {
    super(project);
    this.options = merge(defaultTsUpOptions(), options ?? {});
    this.addNpmPackages();
    this.configurePackageJson();
    this.setCompileTask();
    this.project.package.addField('type', 'module');
    this.project.npmignore?.addPatterns('tsup.config.ts');
  }

  private addNpmPackages() {
    this.project.addDevDeps('tsup');
  }

  private setCompileTask() {
    const compileTask = this.project.tasks.tryFind('compile');
    if (compileTask) {
      // Reset the default compile task
      compileTask.reset(`npx tsup`);
    }
  }

  private configurePackageJson() {
    this.project.package.addField('type', 'module');
    this.project.package.addField('module', 'lib/index.js');
    this.project.package.addField('exports', {
      '.': {
        // ES Modules entrypoint
        import: {
          // Where typescript will look for the types
          types: './lib/index.d.ts',
          // Where Node.js will look
          default: './lib/index.js',
        },
        // CommonJS entrypoint
        require: {
          // Where typescript will look for the types
          types: './lib/index.d.cts',
          // Where Node.js will look
          default: './lib/index.cjs',
        },
      },
    });
  }

  preSynthesize(): void {
    new SourceCode(this.project, 'tsup.config.ts', {
      codeBlock: `
        import { defineConfig } from 'tsup';

        export function tsup() {
          return defineConfig(
            ${JSON.stringify(this.options, undefined, 2)
              .split('\n')
              .map((line) => `  ${line}`)
              .join('\n')}
          );
        }
      `,
    });
  }
}
