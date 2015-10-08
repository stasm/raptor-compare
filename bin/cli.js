#!/usr/bin/env node

'use strict';

var util = require('util');
var tps = require('../src/tps.js');
var argv = require('minimist')(process.argv.slice(2));

switch(argv._.length) {
  case 0:
    util.puts('Usage:   raptor-compare FILE1 FILE2');
    process.exit(1);
    break;
  case 2:
    break;
  default:
    util.error(Error('Pass two files to compare.'));
    process.exit(1);
}

tps.print(argv);
