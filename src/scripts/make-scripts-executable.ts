import { readFile, writeFile } from 'fs/promises';

const executableScripts = ['create', 'upgrade'];
const fileExtensions = ['js', 'cjs'];

try {
  const promises = executableScripts.map(async (script) => {
    return fileExtensions.map(async (extension) => {
      const fileContent = await readFile(
        `dist/cli/${script}.${extension}`,
        'utf8'
      );
      const newContent = [
        '#!/usr/bin/env node',
        ...fileContent.split('\n'),
      ].join('\n');
      await writeFile(`dist/cli/${script}.${extension}`, newContent);
    });
  });

  await Promise.all(promises);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
