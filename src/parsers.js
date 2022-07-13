import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

function getFileData(filepath) {
  if (!filepath) {
    return null;
  }
  const file = readFile(filepath);
  if (/\.json$/.test(filepath)) {
    return JSON.parse(file);
  }
  if (/\.yml/.test(filepath) || /\.yaml/.test(filepath)) {
    return yaml.load(file);
  }
  return null;
}

export default getFileData;
