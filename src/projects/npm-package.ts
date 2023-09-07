import {
  TypeScriptProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript';
import merge from 'ts-deepmerge';
import { NpmBuild } from '../config/npm-build';
import { Prettier } from '../config/prettier';
import { Projen } from '../config/projen';
import { TsConfig } from '../config/tsconfig';

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
      tsconfig: TsConfig.defaultOptions,
      releaseToNpm: true,
      authorName: 'Ally Murray',
      authorEmail: 'allymurray88@gmail.com',
      gitignore: ['.DS_Store', '*yalc*', 'test-reports'],
    };
  }

  constructor(options: TypeScriptNpmPackageOptions) {
    super(merge(TypeScriptNpmPackage.defaultOptions(options.name), options));
    new NpmBuild(this);
  }

  postSynthesize(): void {
    super.postSynthesize();
    TsConfig.injectTsNodeConfig();
  }
}
