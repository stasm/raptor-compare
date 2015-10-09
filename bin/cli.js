#!/usr/bin/env node

'use strict';

require('babel/register');

const print = require('../src/index').print;
const argv = require('minimist')(process.argv.slice(2));

if (argv._.length === 0) {
  console.log('Usage:   raptor-compare FILE');
  process.exit(1);
}

print(argv._[0]);
