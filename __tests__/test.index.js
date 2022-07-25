import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(process.cwd(), __dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const extensions = ['yml', 'json', 'yaml'];
const resultStylish = readFile('comparison.stylish.txt');
const resultPlain = readFile('comparison.plain.txt');
const resultJson = readFile('comparison.json.txt');

test.each(extensions)('.add(%s)', (extension) => {
  const fileAfter = getFixturePath(`file1.${extension}`);
  const fileBefore = getFixturePath(`file2.${extension}`);

  expect(gendiff(fileAfter, fileBefore)).toBe(resultStylish);
  expect(gendiff(fileAfter, fileBefore, 'stylish')).toBe(resultStylish);
  expect(gendiff(fileAfter, fileBefore, 'plain')).toBe(resultPlain);
  expect(gendiff(fileAfter, fileBefore, 'json')).toBe(resultJson);
});


test('gendiff file1.json, file2.yml, " "', () => {
  expect(() => gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), ' ')).toThrowError();
});
test('gendiff txt file', () => {
  expect(() => gendiff(getFixturePath('file1.txt'), getFixturePath('file2.txt'))).toThrowError();
});
test('empty path', () => {
  expect(() => gendiff()).toThrowError('filePath empty');
});
