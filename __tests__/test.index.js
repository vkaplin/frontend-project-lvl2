import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff file1.json, file2.json', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(readFile('comparison.plan.text.txt'));
});

test('gendiff filepath1.yml, filepath2.yml', () => {
  expect(gendiff('filepath1.yml', 'filepath2.yml')).toBe(readFile('comparison.plan.text.txt'));
});
