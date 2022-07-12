const json = (data) => {
  const iter = (value) => {
    const obj = {};
    value.forEach((el) => {
      switch (el.type) {
        case 'added':
        case 'removed':
        case 'unchanged':
          obj[el.name] = {
            type: el.type,
            value: el.value,
          };
          break;
        case 'nested':
          obj[el.name] = {
            type: el.type,
            value: el.value,
            children: iter(el.children),
          };
          break;
        case 'changed':
          obj[el.name] = {
            type: el.type,
            firstValue: el.firstValue,
            secondValue: el.secondValue,
          };
          break;
        default:
          break;
      }
    });

    return obj;
  };

  return JSON.stringify(iter(data));
};

export default json;
