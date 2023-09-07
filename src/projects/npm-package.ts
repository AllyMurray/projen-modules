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

// export interface TypeScriptNpmPackageOptions extends TypeScriptProjectOptions {}

/**
 *
 * @pjid typescript-npm-package
 */
export class TypeScriptNpmPackage extends TypeScriptProject {
  private static defaultOptions(
    name: string,
    repository?: string
  ): TypeScriptProjectOptions {
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
      repository: repository ? `${repository}.git` : undefined,
      bugsUrl: repository ? `${repository}/issues` : undefined,
      homepage: repository ? `${repository}#readme` : undefined,
    };
  }

  constructor(options: TypeScriptProjectOptions) {
    const { repository, ...opts } = options;
    super(
      mergeDeep(
        TypeScriptNpmPackage.defaultOptions(options.name, options.repository),
        opts
      )
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

export interface TypeScriptNpmPackageOptions {
  name: string;
  authorName: string;
  defaultReleaseBranch?: string;
}

export function createTypeScriptNpmPackage(
  options: TypeScriptNpmPackageOptions
) {
  return new TypeScriptNpmPackage({
    ...options,
    defaultReleaseBranch: options.defaultReleaseBranch ?? 'main',
  });
}
