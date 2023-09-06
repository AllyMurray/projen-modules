import { SourceCode } from 'projen';
import {
  TypescriptConfig,
  TypescriptConfigExtends,
} from 'projen/lib/javascript';
import { TypeScriptProject } from 'projen/lib/typescript';

export class NpmBuild {
  static defaultOptions = {
    entrypoint: 'lib/cjs/index.js',
    entrypointTypes: 'lib/types/index.d.ts',
  };

  constructor(project: TypeScriptProject) {
    this.generateCreatePackageJsonScript(project);
    project.addDevDeps('commander');
    project.package.addField('module', 'lib/esm/index.js');
    project.package.addField('exports', {
      '.': {
        // TS Definitions
        // This condition should always be included first.
        types: './lib/types/index.d.ts',
        // Entrypoint for ES Modules
        import: './lib/esm/index.js',
        // Entrypoint for CommonJS
        require: './lib/cjs/index.js',
      },
    });

    const compileTask = project.tasks.tryFind('compile');
    if (compileTask) {
      // Remove the default compile task
      compileTask.reset();

      // Add a compile task to generate the TS Typings
      compileTask.exec(`tsc --project tsconfig.build.types.json`);

      // Add a compile task for both CommonJS and ES Modules
      const buildDetails = [
        {
          moduleType: 'esm',
          packageJsonType: 'module',
        },
        {
          moduleType: 'cjs',
          packageJsonType: 'commonjs',
        },
      ];
      for (const { moduleType, packageJsonType } of buildDetails) {
        compileTask.exec(`tsc --project tsconfig.build.${moduleType}.json`);
        compileTask.exec(
          `ts-node ./scripts/create-package-json.ts --moduleType="${moduleType}" --packageJsonType=${packageJsonType}`
        );
      }
    }

    const tsExtends = TypescriptConfigExtends.fromPaths(['./tsconfig.json']);
    const includeSrcFiles = ['src/**/*.ts'];
    const excludedBuildFiles = [
      '.projenrc.ts',
      'test',
      'src/**/*.spec.ts',
      'src/**/*.test.ts',
    ];

    // Create a TS Config for an ES Module build
    new TypescriptConfig(project, {
      fileName: 'tsconfig.build.esm.json',
      compilerOptions: { outDir: 'lib/esm' },
      extends: tsExtends,
      include: includeSrcFiles,
      exclude: excludedBuildFiles,
    });

    // Create a TS Config for a CommonJS build
    new TypescriptConfig(project, {
      fileName: 'tsconfig.build.cjs.json',
      compilerOptions: {
        outDir: 'lib/cjs',
        module: 'commonjs',
        target: 'es2015',
      },
      extends: tsExtends,
      include: includeSrcFiles,
      exclude: excludedBuildFiles,
    });

    // Create a TS Config for generating Typings
    new TypescriptConfig(project, {
      fileName: 'tsconfig.build.types.json',
      compilerOptions: {
        outDir: 'lib/types',
        declaration: true,
        emitDeclarationOnly: true,
      },
      extends: tsExtends,
      include: includeSrcFiles,
      exclude: excludedBuildFiles,
    });
  }

  private generateCreatePackageJsonScript(project: TypeScriptProject) {
    const scriptPath = 'scripts/create-package-json.ts';
    project.eslint?.addIgnorePattern(scriptPath);

    const source = new SourceCode(project, scriptPath);
    source.line(`// ${source.marker}`);
    source.line('/**');
    source.line(' * Creates a package.json for the given build type');
    source.line(' */');

    source.line(`import fs from 'fs';`);
    source.line(`import path from 'path';`);
    source.line(`import { program } from 'commander';`);
    source.line('');

    source.open('program');
    source.line(
      `.option('--moduleType <string>', 'The module type, cjs or esm')`
    );
    source.open(`.option(`);
    source.line(`'--packageJsonType <string>',`);
    source.line(`'The package.json type, either commonjs or module'`);
    source.close(');');
    source.close('');

    source.line('program.parse();');
    source.line('');

    source.line('const options = program.opts();');
    source.line('');

    source.line('const type = options.packageJsonType;');
    source.line('');

    source.open('fs.writeFileSync(');
    source.line(`path.resolve('lib', options.moduleType, 'package.json'),`);
    source.open(`JSON.stringify(`);
    source.open('{');
    source.line('type,');
    source.close('},');
    source.line('null,');
    source.line('2');
    source.close(')');
    source.close(');');
  }
}
