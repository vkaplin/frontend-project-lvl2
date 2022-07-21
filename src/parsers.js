import yaml from 'js-yaml';

function parsers(fileType, file) {
  switch (fileType) {
    case 'yaml': return yaml.load(file);
    case 'yml': return yaml.load(file);
    case 'json': return JSON.parse(file);
    default: throw new Error(`fileType - ${fileType} не известен.`);
  }
}

export default parsers;
