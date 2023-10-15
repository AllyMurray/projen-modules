import { typescript } from 'projen';

export class Eslint {
  constructor(private project: typescript.TypeScriptProject) {
    this.configureTestFiles();
  }

  private configureTestFiles() {
    this.project.eslint?.addOverride({
      files: ['*.test.ts'],
      rules: {
        'dot-notation': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    });
  }
}
