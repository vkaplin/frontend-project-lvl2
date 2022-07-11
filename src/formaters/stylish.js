import _ from 'lodash';

const getIdent = (countRepeat) => ('  '.repeat(countRepeat));

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const lines = _.keys(value).sort().map((node) => `${getIdent(depth + 2)}  ${node}: ${getValue(value[node], depth + 2)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${getIdent(depth + 1)}}`;
};

const makeLine = (depth, symbol, key, value) => `${getIdent(depth)}${symbol} ${key}: ${getValue(value, depth)}`;

const stylish = (data) => {
  const iter = (value, depth) => {
    const lines = value.map((el) => {
      switch (el.type) {
        case 'added':
          return makeLine(depth, '+', el.name, el.value);
        case 'removed':
          return makeLine(depth, '-', el.name, el.value);
        case 'unchanged':
          return makeLine(depth, ' ', el.name, el.value);
        case 'nested':
          return makeLine(depth, ' ', el.name, `${iter(el.children, depth + 2)}`);
        case 'changed':
          return `${makeLine(depth, '-', el.name, el.firstValue)}\n${makeLine(depth, '+', el.name, el.secondValue)}`;
        default:
          return '';
      }
    });

    return [
      '{',
      ...lines,
      `${getIdent(depth - 1)}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
