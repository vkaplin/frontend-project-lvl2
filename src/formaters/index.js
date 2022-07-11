import stylish from './stylish.js';
import plan from './plan.js';

const formater = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plan':
      return plan(data);
    default:
      return '';
  }
};

export default formater;
