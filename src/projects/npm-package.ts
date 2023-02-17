import {
  TypeScriptProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript';
import { NpmBuild } from '../config/npm-build';
import { Prettier } from '../config/prettier';
import { Projen } from '../config/projen';

export interface TypeScriptNpmPackageOptions extends TypeScriptProjectOptions {}

/**
 *
 * @pjid typescript-npm-package
 */
export class TypeScriptNpmPackage extends TypeScriptProject {
  constructor(options: TypeScriptNpmPackageOptions) {
    super({
      ...NpmBuild.defaultOptions,
      ...Prettier.defaultOptions,
      ...Projen.defaultOptions,
      ...options,
    });
    new NpmBuild(this);
  }
}
