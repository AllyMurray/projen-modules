import { javascript, typescript } from 'projen';
import { Eslint } from '../components/eslint.js';
import { NpmConfig } from '../components/npm.js';
import { Nvm } from '../components/nvmrc.js';
import { Prettier } from '../components/prettier.js';
import { Projen } from '../components/projen.js';
import { defaultTsConfig, useTsNodeEsm } from '../components/tsconfig.js';
import { TsUp, TsUpOptions, legacyEntryPoints } from '../components/tsup.js';
import { Vitest, defaultVitestOptions } from '../components/vitest.js';
import { merge } from '../utils/merge.js';

export interface TypeScriptNpmPackageOptions
  extends typescript.TypeScriptProjectOptions {
  tsUpOptions?: TsUpOptions;
}

export class TypeScriptNpmPackage extends typescript.TypeScriptProject {
  private static defaultOptions(
    name: string,
    repository?: string,
  ): typescript.TypeScriptProjectOptions {
    return {
      name,
      ...Prettier.defaultOptions,
      ...Projen.defaultOptions,
      ...defaultVitestOptions(),
      ...legacyEntryPoints(),
      tsconfig: defaultTsConfig(),
      releaseToNpm: true,
      authorName: 'Ally Murray',
      authorEmail: 'allymurray88@gmail.com',
      npmAccess: javascript.NpmAccess.PUBLIC,
      gitignore: ['.DS_Store', '*yalc*', 'test-reports'],
      repository: repository ? `${repository}.git` : undefined,
      bugsUrl: repository ? `${repository}/issues` : undefined,
      homepage: repository ? `${repository}#readme` : undefined,
      jest: false, // Use vitest instead
    };
  }

  constructor(options: TypeScriptNpmPackageOptions) {
    const { repository, ...opts } = options;
    super(
      merge(
        TypeScriptNpmPackage.defaultOptions(options.name, options.repository),
        opts,
      ),
    );
    new Eslint(this);
    new TsUp(this, options.tsUpOptions ?? {});
    new NpmConfig(this);
    new Nvm(this);
    new Vitest(this);
    useTsNodeEsm(this);
    this.npmignore?.addPatterns('.projenrc.ts');
  }

  postSynthesize(): void {
    super.postSynthesize();
  }
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function createTypeScriptNpmPackage(
  options: Optional<TypeScriptNpmPackageOptions, 'defaultReleaseBranch'>,
) {
  return new TypeScriptNpmPackage({
    ...options,
    defaultReleaseBranch: options.defaultReleaseBranch ?? 'main',
  });
}
