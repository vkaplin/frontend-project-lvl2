#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });

program.parse(process.argv);
