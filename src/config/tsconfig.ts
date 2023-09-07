import { chmodSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { TypescriptConfigOptions } from 'projen/lib/javascript/typescript-config';

export class TsConfig {
  static defaultOptions: TypescriptConfigOptions = {
    compilerOptions: {
      module: 'Node16',
      skipLibCheck: true,
      target: 'ES2020',
    },
  };

  static injectTsNodeConfig() {
    const tsConfigNames = ['tsconfig.json', 'tsconfig.dev.json'];

    for (const tsConfigName of tsConfigNames) {
      const tsConfigPath = resolve(tsConfigName);

      // Se the file writable
      chmodSync(tsConfigPath, '644');

      const tsconfig = readFileSync(tsConfigPath, { encoding: 'utf8' });

      let tsConfigLines = tsconfig.split('\n');

      // Remove the last closing bracket; we will add it back below
      tsConfigLines = tsConfigLines.slice(0, tsConfigLines.length - 2);

      // Add a comma to the final line of code so we can then add the ts-node config
      const finalLineNumber = tsConfigLines.length - 1;
      tsConfigLines[finalLineNumber] = `${tsConfigLines[finalLineNumber]},`;

      // Add the ts-node config; this also adds the closing bracket that was removed above
      const newTsConfig = [
        ...tsConfigLines,
        '  "ts-node": {',
        '    "esm": true',
        '  }',
        '}',
      ].join('\n');

      // Overwrite the original file
      writeFileSync(tsConfigPath, newTsConfig);

      // Set the file back to read only
      chmodSync(tsConfigPath, '444');
    }
  }
}
