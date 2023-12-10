import { FileBase, FileBaseOptions, Project } from 'projen';
import { codeBlock } from '../utils/code-block.js';

export interface SourceCodeOptions extends FileBaseOptions {
  codeBlock: string;
}

export class SourceCode extends FileBase {
  private startComment = '//';

  constructor(
    project: Project,
    filePath: string,
    private options: SourceCodeOptions,
  ) {
    super(project, filePath, options);
  }

  protected synthesizeContent(): string | undefined {
    const marker =
      this.readonly && this.marker ? `${this.startComment} ${this.marker}` : '';

    return `${marker}\n${codeBlock(this.options.codeBlock)}`;
  }
}
