#! /usr/bin/env node

import { parse } from 'ts-command-line-args';
import {
  TypeScriptNpmPackageOptions,
  createTypeScriptNpmPackage,
} from '../projects/npm-package';

type Args = { projectType: string } & TypeScriptNpmPackageOptions;

export const args = parse<Args>({
  projectType: String,
  name: String,
  authorName: String,
  defaultReleaseBranch: { type: String, optional: true },
});

if (args.projectType === 'typescript-npm-package') {
  createTypeScriptNpmPackage({
    ...args,
  });
}
