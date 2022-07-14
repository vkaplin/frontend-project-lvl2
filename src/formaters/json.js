const json = (data) => {
  const iter = (value) => {
    const result = value.reduce((acc, el) => {
      switch (el.type) {
        case 'added':
        case 'removed':
        case 'unchanged':
          acc[el.name] = { type: el.type, value: el.value };
          break;
        case 'nested':
          acc[el.name] = { type: el.type, value: el.value, children: iter(el.children) };
          break;
        case 'changed':
          acc[el.name] = {
            type: el.type,
            firstValue: el.firstValue,
            secondValue: el.secondValue,
          };
          break;
        default:
          break;
      }
      return acc;
    }, {});
    return result;
  };

  return JSON.stringify(iter(data));
};

export default json;
