import _ from 'lodash';
import parsers from './parsers.js';

const getSortedKey = (obj) => _.keys(obj).sort();

const genDiff = (filepath1, filepath2) => {
  let result = '{\n';
  const jsonFile1 = parsers(filepath1);
  const jsonFile2 = parsers(filepath2);

  const sortedKeys1 = getSortedKey(jsonFile1);
  const sortedKeys2 = getSortedKey(jsonFile2);

  for (let i = 0; i < sortedKeys1.length; i += 1) {
    for (let k = 0; k < sortedKeys2.length; k += 1) {
      const key1 = sortedKeys1[i];
      const key2 = sortedKeys2[k];
      if (key1 === key2) {
        if (jsonFile1[key1] === jsonFile2[key2]) {
          result += `    ${key1}: ${jsonFile1[key1]}\n`;
        } else {
          result += `  - ${key1}: ${jsonFile1[key1]}\n`;
          result += `  + ${key2}: ${jsonFile2[key2]}\n`;
        }
        i += 1;
      } else if (key1 < key2) {
        result += `  - ${key1}: ${jsonFile1[key1]}\n`;
        i += 1;
        k -= 1;
      } else {
        result += `  + ${key2}: ${jsonFile2[key2]}\n`;
      }
    }
  }
  result += '}';
  return result;
};

export default genDiff;
