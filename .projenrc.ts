import { cdk, javascript } from 'projen';
const project = new cdk.JsiiProject({
  author: 'Ally Murray',
  authorAddress: 'allymurray88@gmail.com',
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'git@github.com:AllyMurray/projen-modules.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();