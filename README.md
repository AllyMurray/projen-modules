# projen-modules

External modules for the Projen project generator

## TypeScript NPM Package

Extends the default Projen TypeScript project with the following changes:

- prettier = true
- projenrcTs = true
- package manager = NPM
- license = 'MIT',
- build configured for commonjs and es module consumption

**Create a new TypeScript NPM Package:**

```bash
npx projen new --from @ally-murray/projen-modules typescript-npm-package
```
