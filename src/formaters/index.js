import stylish from './stylish.js';
import plan from './plan.js';
import json from './json.js';

const formater = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plan':
      return plan(data);
    case 'json':
      return json(data);
    default:
      return '';
  }
};

export default formater;
