import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const program = new Command();

const getSortedKey = (obj) => _.keys(obj).sort();

function getFileData(filepath) {
  let fileData;
  const resolvePath = path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(resolvePath);
  if(/\.json$/.test(filepath)) {
    fileData = JSON.parse(file);
  }
  return fileData;
}

const getDifference = (filepath1, filepath2) => {
  let result = '';
  const jsonFile1 = getFileData(filepath1);
  const jsonFile2 = getFileData(filepath2);
  
  const sortedKeys1 = getSortedKey(jsonFile1);
  const sortedKeys2 = getSortedKey(jsonFile2);

  for (let i = 0; i < sortedKeys1.length; i += 1) {
    for (let k = 0; k < sortedKeys2.length; k += 1) {
      const key1 = sortedKeys1[i];
      const key2 = sortedKeys2[k];
      if (key1 === key2) {
        if (jsonFile1[key1] === jsonFile2[key2]) {
          result += `  ${key1}: ${jsonFile1[key1]}\n`;
        } else {
          result += `- ${key1}: ${jsonFile1[key1]}\n`;
          result += `+ ${key2}: ${jsonFile2[key2]}\n`;
        }
        i += 1;
      } else if (key1 < key2) {
        result += `- ${key1}: ${jsonFile1[key1]}\n`;
        i += 1;
        k -= 1;
      } else {
        result += `+ ${key2}: ${jsonFile2[key2]}\n`;
      }
    }
  }
  return result;
};

const core = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
      const result = getDifference(filepath1, filepath2);
      console.log(result);
    });

  program.parse(process.argv);
};

export default core;
