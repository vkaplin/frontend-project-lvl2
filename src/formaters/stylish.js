import _ from 'lodash';

const getIdent = (countRepeat) => ('  '.repeat(countRepeat));

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const getSortedValue = (obj) => _.sortBy(_.keys(obj));
  const lines = getSortedValue(value).map((node) => `${getIdent(depth + 2)}  ${node}: ${getValue(value[node], depth + 2)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${getIdent(depth + 1)}}`;
};

const makeLine = (depth, symbol, key, value) => `${getIdent(depth)}${symbol} ${key}: ${getValue(value, depth)}`;

const types = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const stylish = (data) => {
  const iter = (value, depth) => {
    const lines = value.map((el) => {
      if (el.type === 'nested') {
        return makeLine(depth, ' ', el.name, `${iter(el.children, depth + 2)}`);
      }
      if (el.type === 'changed') {
        return `${makeLine(depth, '-', el.name, el.firstValue)}\n${makeLine(depth, '+', el.name, el.secondValue)}`;
      }
      return makeLine(depth, types[el.type], el.name, el.value);
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
