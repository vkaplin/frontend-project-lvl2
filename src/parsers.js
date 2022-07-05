import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

function getFileData(filepath) {
  let fileData;
  //  const resolvePath = path.resolve(process.cwd(), filepath);
  const file = readFile(filepath);
  if (/\.json$/.test(filepath)) {
    fileData = JSON.parse(file);
  } else if (/\.yml/.test(filepath) || /\.yaml/.test(filepath)) {
    fileData = yaml.load(file);
  }
  return fileData;
}

export default getFileData;
