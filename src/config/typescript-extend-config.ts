import { JsonFile } from 'projen';
import type {
  TypeScriptCompilerOptions,
  TypescriptConfigOptions,
} from 'projen/lib/javascript';
import type { TypeScriptProject } from 'projen/lib/typescript';

interface TypescriptExtendConfigOptions extends TypescriptConfigOptions {
  extends?: string;
}

export class TypescriptExtendConfig {
  public readonly compilerOptions: TypeScriptCompilerOptions;
  public readonly include?: string[];
  public readonly exclude: string[];
  public readonly fileName: string;
  public readonly file: JsonFile;
  public readonly extends: string;

  constructor(
    project: TypeScriptProject,
    options: TypescriptExtendConfigOptions
  ) {
    const fileName = options.fileName ?? 'tsconfig.json';

    this.include = options.include;
    this.exclude = options.exclude ?? ['node_modules'];
    this.fileName = fileName;
    this.extends =
      options.extends ?? project.tsconfig?.fileName ?? 'tsconfig.json';

    this.compilerOptions = options.compilerOptions;

    this.file = new JsonFile(project, fileName, {
      obj: {
        extends: `./${this.extends}`,
        compilerOptions: this.compilerOptions,
        include: () => this.include,
        exclude: () => this.exclude,
      },
    });

    project.npmignore?.exclude(`/${fileName}`);
  }

  public addInclude(pattern: string) {
    this.include?.push(pattern);
  }

  public addExclude(pattern: string) {
    this.exclude.push(pattern);
  }
}
