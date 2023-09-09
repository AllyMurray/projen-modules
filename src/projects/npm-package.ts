import {
  TypeScriptProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript';
import { Eslint } from '../config/eslint';
import { NpmBuild } from '../config/npm-build';
import { NpmConfig } from '../config/npm-config';
import { Prettier } from '../config/prettier';
import { Projen } from '../config/projen';
import { TsConfig } from '../config/tsconfig';
import { Vitest } from '../config/vitest';
import { mergeDeep } from '../utils/merge';

export interface TypeScriptNpmPackageOptions extends TypeScriptProjectOptions {}

/**
 *
 * @pjid typescript-npm-package
 */
export class TypeScriptNpmPackage extends TypeScriptProject {
  private static defaultOptions(name: string): TypeScriptNpmPackageOptions {
    return {
      name,
      ...NpmBuild.defaultOptions,
      ...Prettier.defaultOptions,
      ...Projen.defaultOptions,
      ...Vitest.defaultOptions,
      tsconfig: TsConfig.defaultOptions,
      releaseToNpm: true,
      authorName: 'Ally Murray',
      authorEmail: 'allymurray88@gmail.com',
      gitignore: ['.DS_Store', '*yalc*', 'test-reports'],
    };
  }

  constructor(options: TypeScriptNpmPackageOptions) {
    super(
      mergeDeep(TypeScriptNpmPackage.defaultOptions(options.name), options)
    );
    new Eslint(this);
    new NpmBuild(this);
    new NpmConfig(this);
    new Vitest(this);
  }

  postSynthesize(): void {
    super.postSynthesize();
    TsConfig.injectTsNodeConfig();
  }
}
