import { Component as ProjenComponent } from 'projen';
import type { TypeScriptNpmPackage } from '../projects/npm-package.js';

export class Component extends ProjenComponent {
  project: TypeScriptNpmPackage;

  constructor(project: TypeScriptNpmPackage) {
    super(project);
    this.project = project;
  }
}
