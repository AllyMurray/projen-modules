/**
 * Removes leading and trailing whitespace from a code block string.
 * @param code - The code block string to process.
 * @returns The processed code block string.
 */
export function codeBlock(code: string): string {
  if (!code) {
    throw new Error('Input string cannot be empty');
  }

  // Remove the new line at the start of the code
  const newCode = code.replace(/^\n/, '');

  // Get the whitespace from the first line
  const match = newCode.match(/^(\s+)/);
  const whitespace = match ? match[1] : '';

  // Decrease code indentation by the length of the whitespace from the first line
  const lines = newCode.split('\n').map((s) => s.replace(whitespace, ''));

  // Remove all whitespace from the last line
  const lastLine = lines.at(-1)?.replaceAll(/\s/g, '');
  if (lastLine?.length === 0) {
    lines[lines.length - 1] = '';
  } else {
    lines.push('');
  }

  return lines.join('\n');
}
