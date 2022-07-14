import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff file1.json, file2.json', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(readFile('comparison.stylish.txt'));
});

test('gendiff file1.yml, file2.yml', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toBe(readFile('comparison.stylish.txt'));
});

test('empty path', () => {
  expect(gendiff()).toBe(null);
});

test('gendiff file1.json, file2.json, plain', () => {
  expect(gendiff('file1.json', 'file2.json', 'plain')).toBe(readFile('comparison.plain.txt'));
});

test('gendiff file1.json, file2.json, json', () => {
  expect(gendiff('file1.json', 'file2.json', 'json')).toBe(readFile('comparison.json.txt'));
});

test('gendiff file1.json, file2.yml, " "', () => {
  expect(gendiff('file1.json', 'file2.yml', ' ')).toBeUndefined();
});
