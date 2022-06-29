import gendiff from '../bin/gendiff.js';

test('gendiff', () => {
  expect(gendiff( __dirname/__fixtures__/file1.json, __dirname/__fixtures__/file2.json))
  .toBe(`- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`);
});