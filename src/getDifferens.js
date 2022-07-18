import _ from 'lodash';

const getKeys = (obj1, obj2) => _.uniq(_.flatten([_.keys(obj1), _.keys(obj2)]));
const getSortedKey = (obj1, obj2) => _.sortBy(getKeys(obj1, obj2));

const getDifferens = (obj1, obj2) => {
  const keys = getSortedKey(obj1, obj2);
  const resultObj = keys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (typeof (value1) === 'object' && typeof (value2) === 'object') {
        return { name: key, type: 'nested', children: getDifferens(value1, value2) };
      }
      if (value1 === value2) {
        return { name: key, type: 'unchanged', value: value1 };
      }
      return {
        name: key,
        type: 'changed',
        firstValue: value1,
        secondValue: value2,
      };
    }
    if (_.has(obj1, key)) {
      return { name: key, type: 'removed', value: obj1[key] };
    }
    return { name: key, type: 'added', value: obj2[key] };
  });
  return resultObj;
};

export default getDifferens;
