import { codeBlock } from './code-block.js';

describe('codeBlock', () => {
  it('should normalise indentation', () => {
    const input = `
    function foo() {
      logger.info('Hello, world!');
    }
  `;

    expect(codeBlock(input)).toMatchInlineSnapshot(`
      "function foo() {
        logger.info('Hello, world!');
      }
      "
    `);
  });

  it('should not change indentation if there is no whitespace at the start of line one', () => {
    const input = [
      'function foo() {',
      `  logger.info('Hello, world!');`,
      '}',
    ].join('\n');

    expect(codeBlock(input)).toMatchInlineSnapshot(`
      "function foo() {
        logger.info('Hello, world!');
      }
      "
    `);
  });

  it('should remove whitespace on the last line', () => {
    const input = [
      'function foo() {',
      `  logger.info('Hello, world!');`,
      '}',
      '  ',
    ].join('\n');

    expect(codeBlock(input)).toMatchInlineSnapshot(`
      "function foo() {
        logger.info('Hello, world!');
      }
      "
    `);
  });

  it('should throw an error if the input is empty', () => {
    expect(() => codeBlock('')).toThrowErrorMatchingInlineSnapshot(
      `"Input string cannot be empty"`,
    );
  });
});
