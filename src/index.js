import parsers from './parsers.js';
import formater from './formaters/index.js';
import getDifferens from './getDifferens.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  if (!file1 || !file2) {
    return null;
  }

  const differenceData = getDifferens(file1, file2);
  const result = formater(differenceData, format);
  return result;
};

export default genDiff;
