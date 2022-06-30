import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { jest } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(readFile('comparison.json.txt'));
});
