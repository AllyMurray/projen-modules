import { SourceCode } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';

export class Vitest {
  static defaultOptions = {
    jest: false,
  };

  constructor(private project: TypeScriptProject) {
    this.project.addDevDeps('vitest');
    this.config();
    this.setTestTask();
  }

  private setTestTask() {
    this.project.testTask.prependExec('vitest --dir=src', {
      receiveArgs: true,
    });
  }

  private config() {
    const config = new SourceCode(this.project, 'vitest.config.js');
    config.line(`import { defineConfig } from 'vitest/config';`);
    config.open(`export default defineConfig({`);
    config.open(`test: {`);
    config.line(`silent: true,`);
    config.line(`globals: true,`);
    config.close(`},`);
    config.close(`});`);
  }
}
