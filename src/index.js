import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parsers from './parsers.js';
import formater from './formaters/index.js';
import getDifferens from './getDifferens.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.resolve(process.cwd(), __dirname, filename);

const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

const getFileType = (filename) => path.extname(filename).slice(1);

const getFileData = (filePath) => {
  const fileType = getFileType(filePath);
  const file = readFile(filePath);
  return parsers(fileType, file);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getFileData(filepath1);
  const file2 = getFileData(filepath2);
  const differenceData = getDifferens(file1, file2);
  const result = formater(differenceData, format);
  return result;
};

export default genDiff;
