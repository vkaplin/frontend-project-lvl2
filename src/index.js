import _ from 'lodash';
import parsers from './parsers.js';
import formater from './formater.js';

const getSortedKey = (obj1, obj2) => _.uniq(_.flatten([_.keys(obj1), _.keys(obj2)])).sort();

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);

  const getDifferens = (obj1, obj2) => {
    const keys = getSortedKey(obj1, obj2);
    const resultObj = keys.map((key) => {
      const keyIsExistObj1 = _.has(obj1, key);
      const keyIsExistObj2 = _.has(obj2, key);
      let newLine;
      if (keyIsExistObj1 && keyIsExistObj2) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (typeof (value1) === 'object' && typeof (value2) === 'object') {
          newLine = { name: key, type: 'nested', children: getDifferens(value1, value2) };
        } else if (value1 === value2) {
          newLine = { name: key, type: 'unchanged', value: value1 };
        } else {
          newLine = {
            name: key,
            type: 'changed',
            firstValue: value1,
            secondValue: value2,
          };
        }
      } else if (keyIsExistObj1) {
        newLine = { name: key, type: 'removed', value: obj1[key] };
      } else if (keyIsExistObj2) {
        newLine = { name: key, type: 'added', value: obj2[key] };
      }
      return newLine;
    });
    return resultObj;
  };

  const differenceData = getDifferens(file1, file2);
  const result = formater(differenceData, format);
  return result;
};

export default genDiff;
