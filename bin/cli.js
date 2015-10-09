#!/usr/bin/env node

'use strict';

require('babel/register');

const main = require('../src').main;
const argv = require('minimist')(process.argv.slice(2));

if (argv._.length === 0) {
  console.log('Usage:   raptor-compare FILE');
  process.exit(1);
}

main(argv._[0]);
