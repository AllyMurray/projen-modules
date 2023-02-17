import * as path from 'path';
import { SourceCode } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';
import { TypescriptExtendConfig } from './typescript-extend-config';

export class NpmBuild {
  static defaultOptions = {
    entrypoint: 'lib/commonjs/index.js',
    entrypointTypes: 'lib/commonjs/index.d.ts',
  };

  constructor(project: TypeScriptProject) {
    this.generateCreatePackageJsonScript(project);
    project.addDevDeps('commander');
    project.package.addField('module', 'lib/module/index.js');
    project.package.addField('exports', {
      '.': {
        types: './lib/module/index.d.ts',
        import: './lib/module/index.js',
        require: './lib/commonjs/index.js',
      },
    });

    const compileTask = project.tasks.tryFind('compile');
    if (compileTask) {
      // Remove the default compile task
      compileTask.reset();

      // Add a compile task for both CommonJS and ES Modules
      const libDirectory = path.join(project.outdir, 'lib');
      for (const type of ['commonjs', 'module']) {
        compileTask.exec(`tsc --project tsconfig.build.${type}.json`);
        compileTask.exec(
          `ts-node ./scripts/create-package-json.ts --outDir="${libDirectory}" --type=${type}`
        );
      }
    }

    // ".projenrc.js",
    // "src/**/*.ts",
    // "test/**/*.ts",
    // ".projenrc.ts",
    // "projenrc/**/*.ts"

    const excludeTestFiles = [
      '.projenrc.ts',
      'test',
      'src/**/*.spec.ts',
      'src/**/*.test.ts',
    ];

    // Create a TS Config for an ES Module build
    new TypescriptExtendConfig(project, {
      fileName: 'tsconfig.build.module.json',
      compilerOptions: { outDir: 'lib/module' },
      exclude: excludeTestFiles,
    });

    // Create a TS Config for a CommonJS build
    new TypescriptExtendConfig(project, {
      fileName: 'tsconfig.build.commonjs.json',
      compilerOptions: {
        outDir: 'lib/commonjs',
        module: 'commonjs',
        target: 'es2015',
      },
      exclude: excludeTestFiles,
    });
  }

  private generateCreatePackageJsonScript(project: TypeScriptProject) {
    const scriptPath = 'scripts/create-package-json.ts';
    project.eslint?.addIgnorePattern(scriptPath);

    const source = new SourceCode(project, scriptPath);
    source.line(`// ${source.marker}`);
    source.line('/**');
    source.line(' * Crates a package.json for the given build type');
    source.line(' */');

    source.line(`import fs from 'fs';`);
    source.line(`import path from 'path';`);
    source.line(`import { program } from 'commander';`);
    source.line('');

    source.open('program');
    source.line(
      `.option('--outDir <string>', 'The directory the file will be written to')`
    );
    source.open(`.option(`);
    source.line(`'--type <string>',`);
    source.line(`'The package.json type, either commonjs or module'`);
    source.close(');');
    source.close('');

    source.line('program.parse();');
    source.line('');

    source.line('const options = program.opts();');
    source.line('');

    source.line('const type = options.type;');
    source.line('');

    source.open('fs.writeFileSync(');
    source.line(`path.join(options.outDir, type, 'package.json'),`);
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
