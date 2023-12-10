import { writeFileSync } from 'fs';
import path from 'path';
import { parse } from 'ts-command-line-args';

type Args = {
  name: string;
  outDir: string;
};

export const args = parse<Args>({
  name: String,
  outDir: { type: String },
});

writeFileSync(
  path.join(args.outDir, '.projenrc.ts'),
  [
    `import { TypeScriptNpmPackage } from '@ally-murray/projen-modules;`,
    ``,
    `const project = createTypeScriptNpmPackage({ name: ${args.name} });`,
    ``,
    `project.synth();`,
  ]
    .toString()
    .replace(/,/g, '\n'),
);
