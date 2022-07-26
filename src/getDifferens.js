import _ from 'lodash';

const getSortedKey = (obj1, obj2) => _.sortBy(_.uniq(_.flatten([_.keys(obj1), _.keys(obj2)])));

const getDifferens = (obj1, obj2) => {
  const keys = getSortedKey(obj1, obj2);
  const resultObj = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, type: 'removed', value: obj1[key] };
    }
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { name: key, type: 'nested', children: getDifferens(oldValue, newValue) };
    }
    if (oldValue === newValue) {
      return { name: key, type: 'unchanged', value: oldValue };
    }
    return {
      name: key,
      type: 'changed',
      firstValue: oldValue,
      secondValue: newValue,
    };
  });
  return resultObj;
};

export default getDifferens;
