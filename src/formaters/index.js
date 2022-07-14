import { when } from 'pattern-matching-js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formater = (data, format) => {
  const result = when(format)
    .case('stylish', () => stylish(data))
    .case('plain', () => plian(data))
    .case('json', () => json(data))
    .end();
  return result;
};

export default formater;
