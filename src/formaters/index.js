import { when } from 'pattern-matching-js';
import stylish from './stylish.js';
import plan from './plan.js';
import json from './json.js';

const formater = (data, format) => {
  const result = when(format)
    .case('stylish', () => stylish(data))
    .case('plan', () => plan(data))
    .case('json', () => json(data))
    .end();
  return result;
};

export default formater;
