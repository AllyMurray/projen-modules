import { javascript, typescript } from 'projen';

export function defaultTsConfig(): javascript.TypescriptConfigOptions {
  return {
    compilerOptions: {
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      lib: ['ES2023'],
      module: 'NodeNext',
      moduleResolution: javascript.TypeScriptModuleResolution.NODE_NEXT,
      skipLibCheck: true,
      strict: true,
      target: 'ES2022',
      // TODO: Update this to allow injecting types
      types: ['vitest/globals'],
    },
  };
}

export function createTsNodeCmd(tsFilePath: string) {
  return `TS_NODE_PROJECT=tsconfig.dev.json node --no-warnings --loader ts-node/esm ${tsFilePath}`;
}

export function useTsNodeEsm(project: typescript.TypeScriptProject) {
  const defaultTask = project.tasks.tryFind('default');
  if (defaultTask) {
    const { steps } = defaultTask;
    defaultTask.reset();
    for (const step of steps) {
      if (step.exec) {
        const hasTsNode = step.exec.includes('ts-node');
        defaultTask.exec(
          hasTsNode ? createTsNodeCmd('.projenrc.ts') : step.exec,
        );
      } else if (step.spawn) {
        const subTask = project.tasks.tryFind(step.spawn);
        if (subTask) {
          defaultTask.spawn(subTask);
        }
      }
    }
  }
}
