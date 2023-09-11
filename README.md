# projen-modules

External modules for the Projen project generator

## TypeScript NPM Package

Extends the default Projen TypeScript project with the following changes:

- prettier = true
- projenrcTs = true
- package manager = NPM
- license = 'MIT',
- build configured for commonjs and es module consumption

## Local Development

JSII does not use the tsconfig.json file, instead, it uses the tsconfig.dev.json file. tsconfig.json is in the gitignore file, we can't point vscode at the dev file so there is a script that copies it from the dev file to the tsconfig.json file.

```bash
pnpm create-tsconfig
```

**Create a new TypeScript NPM Package:**

```bash
npx projen new --from @ally-murray/projen-modules typescript-npm-package
```
