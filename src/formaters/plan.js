import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plan = (data) => {
  const iter = (value, sourcePath) => {
    const lines = value.map((el) => {
      const newPath = [...sourcePath, el.name];
      const path = newPath.join('.');
      switch (el.type) {
        case 'added':
          return `Property '${path}' was added with value: ${getValue(el.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'nested':
          return iter(el.children, newPath);
        case 'changed':
          return `Property '${path}' was updated. From ${getValue(el.firstValue)} to ${getValue(el.secondValue)}`;
        default:
          return null;
      }
    });

    return _.compact(lines).join('\n');
  };

  return iter(data, []);
};

export default plan;
