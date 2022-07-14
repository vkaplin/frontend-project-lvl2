import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yaml from 'js-yaml';
import { when } from 'pattern-matching-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getFileType = (filename) => path.extname(filename).slice(1);

function getFileData(filepath) {
  if (!filepath) {
    return null;
  }

  const fileType = getFileType(filepath);
  const file = readFile(filepath);

  return when(fileType)
    .case('json', () => JSON.parse(file))
    .case('yml', () => yaml.load(file))
    .case('yaml', () => yaml.load(file))
    .end();
}

export default getFileData;
