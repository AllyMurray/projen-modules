import { TypeScriptProject } from 'projen/lib/typescript';

export class Vitest {
  static defaultOptions = {
    jest: false,
  };

  constructor(private project: TypeScriptProject) {
    this.project.addDevDeps('vitest');
    this.setTestTask();
  }

  private setTestTask() {
    this.project.testTask.prependExec('vitest --dir=src', {
      receiveArgs: true,
    });
  }
}
