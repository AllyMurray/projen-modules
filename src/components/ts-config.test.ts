import { TaskStep, typescript } from 'projen';
import { useTsNodeEsm } from './tsconfig.js';
import { synthSnapshot } from '../utils/test/synth.js';

describe('useTsNodeEsm', () => {
  it('should replace ts-node command with node and esm loader', () => {
    const project = new typescript.TypeScriptProject({
      name: 'test',
      defaultReleaseBranch: 'main',
      projenrcTs: true,
    });
    useTsNodeEsm(project);

    const output = synthSnapshot(project)['.projen/tasks.json'];

    const isUsingEsm = output.tasks.default.steps.some(
      (step: TaskStep) =>
        step.exec ===
        'TS_NODE_PROJECT=tsconfig.dev.json node --no-warnings --loader ts-node/esm .projenrc.ts',
    );

    expect(isUsingEsm).toBe(true);
  });

  it('should copy spawn task', () => {
    const project = new typescript.TypeScriptProject({
      name: 'test',
      defaultReleaseBranch: 'main',
      projenrcTs: true,
    });
    const spawnTask = project.tasks.addTask('spawn-task', {
      exec: 'echo hello',
    });
    project.tasks.tryFind('default')?.spawn(spawnTask);
    useTsNodeEsm(project);

    const output = synthSnapshot(project)['.projen/tasks.json'];

    const hasSpawnTask = output.tasks.default.steps.some(
      (step: TaskStep) => step.spawn === 'spawn-task',
    );

    expect(hasSpawnTask).toBe(true);
  });
});
